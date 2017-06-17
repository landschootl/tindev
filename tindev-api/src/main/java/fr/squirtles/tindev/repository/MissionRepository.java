package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Mission entity.
 */
@SuppressWarnings("unused")
public interface MissionRepository extends JpaRepository<Mission, Long> {
    //@Query("SELECT * from Mission m join Matching ma on m.id = ma.mission where ");

    @Query("FROM Mission WHERE recruiter.id=:idRecruiter")
    List<Mission> findByRecruiter(@Param("idRecruiter") Long idRecruiter);
}
