package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Experience;
import fr.squirtles.tindev.domain.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Experience entity.
 */
@SuppressWarnings("unused")
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    @Query("FROM Experience WHERE freelance.id=:idFreelance")
    List<Experience> findByFreelance(@Param("idFreelance") Long idFreelance);
}
