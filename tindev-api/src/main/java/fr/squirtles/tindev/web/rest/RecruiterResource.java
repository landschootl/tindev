package fr.squirtles.tindev.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Mission;
import fr.squirtles.tindev.domain.Recruiter;

import fr.squirtles.tindev.repository.MissionRepository;
import fr.squirtles.tindev.repository.RecruiterRepository;
import fr.squirtles.tindev.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Recruiter.
 */
@RestController
@RequestMapping("/api")
public class RecruiterResource {

    private final Logger log = LoggerFactory.getLogger(RecruiterResource.class);

    private static final String ENTITY_NAME = "recruiter";

    private final RecruiterRepository recruiterRepository;

    public RecruiterResource(RecruiterRepository recruiterRepository) {
        this.recruiterRepository = recruiterRepository;
    }

    /**
     * POST  /recruiters : Create a new recruiter.
     *
     * @param recruiter the recruiter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recruiter, or with status 400 (Bad Request) if the recruiter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recruiters")
    @Timed
    public ResponseEntity<Recruiter> createRecruiter(@Valid @RequestBody Recruiter recruiter) throws URISyntaxException {
        log.debug("REST request to save Recruiter : {}", recruiter);
        if (recruiter.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new recruiter cannot already have an ID")).body(null);
        }
        Recruiter result = recruiterRepository.save(recruiter);
        return ResponseEntity.created(new URI("/api/recruiters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recruiters : Updates an existing recruiter.
     *
     * @param recruiter the recruiter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recruiter,
     * or with status 400 (Bad Request) if the recruiter is not valid,
     * or with status 500 (Internal Server Error) if the recruiter couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recruiters")
    @Timed
    public ResponseEntity<Recruiter> updateRecruiter(@Valid @RequestBody Recruiter recruiter) throws URISyntaxException {
        log.debug("REST request to update Recruiter : {}", recruiter);
        if (recruiter.getId() == null) {
            return createRecruiter(recruiter);
        }
        Recruiter result = recruiterRepository.save(recruiter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recruiter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recruiters : get all the recruiters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recruiters in body
     */
    @GetMapping("/recruiters")
    @Timed
    public List<Recruiter> getAllRecruiters() {
        log.debug("REST request to get all Recruiters");
        List<Recruiter> recruiters = recruiterRepository.findAll();
        return recruiters;
    }

    /**
     * GET  /recruiters/:id : get the "id" recruiter.
     *
     * @param id the id of the recruiter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recruiter, or with status 404 (Not Found)
     */
    @GetMapping("/recruiters/{id}")
    @Timed
    public ResponseEntity<Recruiter> getRecruiter(@PathVariable Long id) {
        log.debug("REST request to get Recruiter : {}", id);
        Recruiter recruiter = recruiterRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(recruiter));
    }

    /**
     * GET  /recruiters/:iduser : get the "{idUser}" recruiters.
     *
     * @param idUser the id of the recruiters to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the freelance, or with status 404 (Not Found)
     */
    @GetMapping("/users/{idUser}/recruiters")
    @Timed
    public ResponseEntity<Recruiter> getFreelanceByIdUser(@PathVariable Long idUser) {
        log.debug("REST request to get Recruiter : {}", idUser);
        Recruiter recruiter = recruiterRepository.findByIdUser(idUser);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(recruiter));
    }

    /**
     * DELETE  /recruiters/:id : delete the "id" recruiter.
     *
     * @param id the id of the recruiter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recruiters/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecruiter(@PathVariable Long id) {
        log.debug("REST request to delete Recruiter : {}", id);
        recruiterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
