package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Freelance;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Freelance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FreelanceRepository extends JpaRepository<Freelance,Long> {

}
