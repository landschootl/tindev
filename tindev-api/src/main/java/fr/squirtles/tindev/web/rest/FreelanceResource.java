package fr.squirtles.tindev.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.squirtles.tindev.domain.Freelance;

import fr.squirtles.tindev.repository.FreelanceRepository;
import fr.squirtles.tindev.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Freelance.
 */
@RestController
@RequestMapping("/api")
public class FreelanceResource {

    private final Logger log = LoggerFactory.getLogger(FreelanceResource.class);

    private static final String ENTITY_NAME = "freelance";

    private final FreelanceRepository freelanceRepository;

    public FreelanceResource(FreelanceRepository freelanceRepository) {
        this.freelanceRepository = freelanceRepository;
    }

    /**
     * POST  /freelances : Create a new freelance.
     *
     * @param freelance the freelance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new freelance, or with status 400 (Bad Request) if the freelance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/freelances")
    @Timed
    public ResponseEntity<Freelance> createFreelance(@Valid @RequestBody Freelance freelance) throws URISyntaxException {
        log.debug("REST request to save Freelance : {}", freelance);
        if (freelance.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new freelance cannot already have an ID")).body(null);
        }
        Freelance result = freelanceRepository.save(freelance);
        return ResponseEntity.created(new URI("/api/freelances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /freelances : Updates an existing freelance.
     *
     * @param freelance the freelance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated freelance,
     * or with status 400 (Bad Request) if the freelance is not valid,
     * or with status 500 (Internal Server Error) if the freelance couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/freelances")
    @Timed
    public ResponseEntity<Freelance> updateFreelance(@Valid @RequestBody Freelance freelance) throws URISyntaxException {
        log.debug("REST request to update Freelance : {}", freelance);
        if (freelance.getId() == null) {
            return createFreelance(freelance);
        }
        Freelance result = freelanceRepository.save(freelance);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, freelance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /freelances : get all the freelances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of freelances in body
     */
    @GetMapping("/freelances")
    @Timed
    public List<Freelance> getAllFreelances() {
        log.debug("REST request to get all Freelances");
        List<Freelance> freelances = freelanceRepository.findAll();
        return freelances;
    }

    /**
     * GET  /freelances/:id : get the "id" freelance.
     *
     * @param id the id of the freelance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the freelance, or with status 404 (Not Found)
     */
    @GetMapping("/freelances/{id}")
    @Timed
    public ResponseEntity<Freelance> getFreelance(@PathVariable Long id) {
        log.debug("REST request to get Freelance : {}", id);
        Freelance freelance = freelanceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(freelance));
    }

    /**
     * GET  /freelances/:iduser : get the "{idUser}" freelance.
     *
     * @param idUser the id of the freelance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the freelance, or with status 404 (Not Found)
     */
    @GetMapping("/users/{idUser}/freelances")
    @Timed
    public ResponseEntity<Freelance> getFreelanceByIdUser(@PathVariable Long idUser) {
        log.debug("REST request to get Freelance : {}", idUser);
        Freelance freelance = freelanceRepository.findByIdUser(idUser);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(freelance));
    }

    /**
     * DELETE  /freelances/:id : delete the "id" freelance.
     *
     * @param id the id of the freelance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/freelances/{id}")
    @Timed
    public ResponseEntity<Void> deleteFreelance(@PathVariable Long id) {
        log.debug("REST request to delete Freelance : {}", id);
        freelanceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
