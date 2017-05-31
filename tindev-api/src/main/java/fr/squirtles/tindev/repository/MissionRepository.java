package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Mission;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MissionRepository extends JpaRepository<Mission,Long> {

}
