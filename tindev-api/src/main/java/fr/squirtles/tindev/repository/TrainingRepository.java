package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Training;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Training entity.
 */
@SuppressWarnings("unused")
public interface TrainingRepository extends JpaRepository<Training, Long> {

}
