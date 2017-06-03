package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.UserMatching;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserMatching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserMatchingRepository extends JpaRepository<UserMatching,Long> {

}
