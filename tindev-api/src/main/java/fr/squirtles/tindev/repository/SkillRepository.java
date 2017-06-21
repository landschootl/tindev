package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Spring Data JPA repository for the Skill entity.
 */
@SuppressWarnings("unused")
public interface SkillRepository extends JpaRepository<Skill, Long> {

    @Query("FROM Skill WHERE freelance.id=:idFreelance")
    List<Skill> findByFreelance(Long idFreelance);
}
