package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Recruiter;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Recruiter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter,Long> {

}
