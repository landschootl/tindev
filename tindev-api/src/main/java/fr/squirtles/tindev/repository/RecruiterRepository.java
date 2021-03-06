package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Recruiter entity.
 */
@SuppressWarnings("unused")
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {

    Recruiter findByIdUser(Long id);
}
