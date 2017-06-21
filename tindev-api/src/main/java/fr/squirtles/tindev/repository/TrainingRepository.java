package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Experience;
import fr.squirtles.tindev.domain.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Training entity.
 */
@SuppressWarnings("unused")
public interface TrainingRepository extends JpaRepository<Training, Long> {

    @Query("FROM Training WHERE freelance.id=:idFreelance")
    List<Training> findByFreelance(@Param("idFreelance") Long idFreelance);
}
