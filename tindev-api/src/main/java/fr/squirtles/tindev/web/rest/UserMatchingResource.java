package fr.squirtles.tindev.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.squirtles.tindev.domain.UserMatching;
import fr.squirtles.tindev.service.UserMatchingService;
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
 * REST controller for managing UserMatching.
 */
@RestController
@RequestMapping("/api")
public class UserMatchingResource {

    private final Logger log = LoggerFactory.getLogger(UserMatchingResource.class);

    private static final String ENTITY_NAME = "userMatching";

    private final UserMatchingService userMatchingService;

    public UserMatchingResource(UserMatchingService userMatchingService) {
        this.userMatchingService = userMatchingService;
    }

    /**
     * POST  /user-matchings : Create a new userMatching.
     *
     * @param userMatching the userMatching to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userMatching, or with status 400 (Bad Request) if the userMatching has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-matchings")
    @Timed
    public ResponseEntity<UserMatching> createUserMatching(@RequestBody UserMatching userMatching) throws URISyntaxException {
        log.debug("REST request to save UserMatching : {}", userMatching);
        if (userMatching.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userMatching cannot already have an ID")).body(null);
        }
        UserMatching result = userMatchingService.save(userMatching);
        return ResponseEntity.created(new URI("/api/user-matchings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-matchings : Updates an existing userMatching.
     *
     * @param userMatching the userMatching to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userMatching,
     * or with status 400 (Bad Request) if the userMatching is not valid,
     * or with status 500 (Internal Server Error) if the userMatching couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-matchings")
    @Timed
    public ResponseEntity<UserMatching> updateUserMatching(@RequestBody UserMatching userMatching) throws URISyntaxException {
        log.debug("REST request to update UserMatching : {}", userMatching);
        if (userMatching.getId() == null) {
            return createUserMatching(userMatching);
        }
        UserMatching result = userMatchingService.save(userMatching);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userMatching.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-matchings : get all the userMatchings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userMatchings in body
     */
    @GetMapping("/user-matchings")
    @Timed
    public ResponseEntity<List<UserMatching>> getAllUserMatchings(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of UserMatchings");
        Page<UserMatching> page = userMatchingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-matchings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-matchings/:id : get the "id" userMatching.
     *
     * @param id the id of the userMatching to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userMatching, or with status 404 (Not Found)
     */
    @GetMapping("/user-matchings/{id}")
    @Timed
    public ResponseEntity<UserMatching> getUserMatching(@PathVariable Long id) {
        log.debug("REST request to get UserMatching : {}", id);
        UserMatching userMatching = userMatchingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userMatching));
    }

    /**
     * DELETE  /user-matchings/:id : delete the "id" userMatching.
     *
     * @param id the id of the userMatching to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-matchings/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserMatching(@PathVariable Long id) {
        log.debug("REST request to delete UserMatching : {}", id);
        userMatchingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
