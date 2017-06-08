package fr.squirtles.tindev.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.squirtles.tindev.domain.Matching;

import fr.squirtles.tindev.repository.MatchingRepository;
import fr.squirtles.tindev.web.rest.util.HeaderUtil;
import fr.squirtles.tindev.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Matching.
 */
@RestController
@RequestMapping("/api")
public class MatchingResource {

    private final Logger log = LoggerFactory.getLogger(MatchingResource.class);

    private static final String ENTITY_NAME = "matching";

    private final MatchingRepository matchingRepository;

    public MatchingResource(MatchingRepository matchingRepository) {
        this.matchingRepository = matchingRepository;
    }

    /**
     * POST  /matchings : Create a new matching.
     *
     * @param matching the matching to create
     * @return the ResponseEntity with status 201 (Created) and with body the new matching, or with status 400 (Bad Request) if the matching has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/matchings")
    @Timed
    public ResponseEntity<Matching> createMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to save Matching : {}", matching);
        if (matching.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new matching cannot already have an ID")).body(null);
        }
        Matching result = matchingRepository.save(matching);
        return ResponseEntity.created(new URI("/api/matchings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /matchings : Updates an existing matching.
     *
     * @param matching the matching to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated matching,
     * or with status 400 (Bad Request) if the matching is not valid,
     * or with status 500 (Internal Server Error) if the matching couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/matchings")
    @Timed
    public ResponseEntity<Matching> updateMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to update Matching : {}", matching);
        if (matching.getId() == null) {
            return createMatching(matching);
        }
        Matching result = matchingRepository.save(matching);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, matching.getId().toString()))
            .body(result);
    }

    /**
     * GET  /matchings : get all the matchings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of matchings in body
     */
    @GetMapping("/matchings")
    @Timed
    public ResponseEntity<List<Matching>> getAllMatchings(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Matchings");
        Page<Matching> page = matchingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/matchings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /matchings/:id : get the "id" matching.
     *
     * @param id the id of the matching to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the matching, or with status 404 (Not Found)
     */
    @GetMapping("/matchings/{id}")
    @Timed
    public ResponseEntity<Matching> getMatching(@PathVariable Long id) {
        log.debug("REST request to get Matching : {}", id);
        Matching matching = matchingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(matching));
    }

    /**
     * DELETE  /matchings/:id : delete the "id" matching.
     *
     * @param id the id of the matching to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/matchings/{id}")
    @Timed
    public ResponseEntity<Void> deleteMatching(@PathVariable Long id) {
        log.debug("REST request to delete Matching : {}", id);
        matchingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
