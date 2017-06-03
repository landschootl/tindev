package fr.squirtles.tindev.service;

import fr.squirtles.tindev.domain.UserMatching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing UserMatching.
 */
public interface UserMatchingService {

    /**
     * Save a userMatching.
     *
     * @param userMatching the entity to save
     * @return the persisted entity
     */
    UserMatching save(UserMatching userMatching);

    /**
     *  Get all the userMatchings.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<UserMatching> findAll(Pageable pageable);

    /**
     *  Get the "id" userMatching.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    UserMatching findOne(Long id);

    /**
     *  Delete the "id" userMatching.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
