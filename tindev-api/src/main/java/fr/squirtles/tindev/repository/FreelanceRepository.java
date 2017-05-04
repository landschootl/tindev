package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Freelance;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Freelance entity.
 */
@SuppressWarnings("unused")
public interface FreelanceRepository extends JpaRepository<Freelance,Long> {

}