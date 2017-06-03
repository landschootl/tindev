package fr.squirtles.tindev.service.impl;

import fr.squirtles.tindev.service.UserMatchingService;
import fr.squirtles.tindev.domain.UserMatching;
import fr.squirtles.tindev.repository.UserMatchingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing UserMatching.
 */
@Service
@Transactional
public class UserMatchingServiceImpl implements UserMatchingService{

    private final Logger log = LoggerFactory.getLogger(UserMatchingServiceImpl.class);

    private final UserMatchingRepository userMatchingRepository;

    public UserMatchingServiceImpl(UserMatchingRepository userMatchingRepository) {
        this.userMatchingRepository = userMatchingRepository;
    }

    /**
     * Save a userMatching.
     *
     * @param userMatching the entity to save
     * @return the persisted entity
     */
    @Override
    public UserMatching save(UserMatching userMatching) {
        log.debug("Request to save UserMatching : {}", userMatching);
        return userMatchingRepository.save(userMatching);
    }

    /**
     *  Get all the userMatchings.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserMatching> findAll(Pageable pageable) {
        log.debug("Request to get all UserMatchings");
        return userMatchingRepository.findAll(pageable);
    }

    /**
     *  Get one userMatching by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserMatching findOne(Long id) {
        log.debug("Request to get UserMatching : {}", id);
        return userMatchingRepository.findOne(id);
    }

    /**
     *  Delete the  userMatching by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserMatching : {}", id);
        userMatchingRepository.delete(id);
    }
}
