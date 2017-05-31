package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Discussion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Discussion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiscussionRepository extends JpaRepository<Discussion,Long> {

}
