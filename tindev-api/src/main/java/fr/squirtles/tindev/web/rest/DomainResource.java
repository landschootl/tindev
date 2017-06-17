package fr.squirtles.tindev.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.squirtles.tindev.domain.Domain;
import fr.squirtles.tindev.repository.DomainRepository;
import fr.squirtles.tindev.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Domain.
 */
@RestController
@RequestMapping("/api")
public class DomainResource {

    private final Logger log = LoggerFactory.getLogger(DomainResource.class);

    private static final String ENTITY_NAME = "domain";

    private final DomainRepository domainRepository;

    public DomainResource(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    /**
     * POST  /domains : Create a new domain.
     *
     * @param domain the domain to create
     * @return the ResponseEntity with status 201 (Created) and with body the new domain, or with status 400 (Bad Request) if the domain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/domains")
    @Timed
    public ResponseEntity<Domain> createDomain(@RequestBody Domain domain) throws URISyntaxException {
        log.debug("REST request to save Domain : {}", domain);
        if (domain.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new domain cannot already have an ID")).body(null);
        }
        Domain result = domainRepository.save(domain);
        return ResponseEntity.created(new URI("/api/domains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /domains : Updates an existing domain.
     *
     * @param domain the domain to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated domain,
     * or with status 400 (Bad Request) if the domain is not valid,
     * or with status 500 (Internal Server Error) if the domain couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/domains")
    @Timed
    public ResponseEntity<Domain> updateDomain(@RequestBody Domain domain) throws URISyntaxException {
        log.debug("REST request to update Domain : {}", domain);
        if (domain.getId() == null) {
            return createDomain(domain);
        }
        Domain result = domainRepository.save(domain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, domain.getId().toString()))
            .body(result);
    }

    /**
     * GET  /domains : get all the domains.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of domains in body
     */
    @GetMapping("/domains")
    @Timed
    public List<Domain> getAllDomains() {
        log.debug("REST request to get all Domains");
        List<Domain> domains = domainRepository.findAll();
        return domains;
    }

    /**
     * GET  /domains/:id : get the "id" domain.
     *
     * @param id the id of the domain to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the domain, or with status 404 (Not Found)
     */
    @GetMapping("/domains/{id}")
    @Timed
    public ResponseEntity<Domain> getDomain(@PathVariable Long id) {
        log.debug("REST request to get Domain : {}", id);
        Domain domain = domainRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(domain));
    }

    /**
     * DELETE  /domains/:id : delete the "id" domain.
     *
     * @param id the id of the domain to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/domains/{id}")
    @Timed
    public ResponseEntity<Void> deleteDomain(@PathVariable Long id) {
        log.debug("REST request to delete Domain : {}", id);
        domainRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
