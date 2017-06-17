package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Discussion entity.
 */
@SuppressWarnings("unused")
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

}
