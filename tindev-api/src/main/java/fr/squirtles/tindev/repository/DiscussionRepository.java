package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Discussion;
import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Mission;
import fr.squirtles.tindev.domain.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Discussion entity.
 */
@SuppressWarnings("unused")
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    List<Discussion> findByMission(Mission mission);

    List<Discussion> findByFreelance(Freelance freelance);

    @Query("From Discussion where mission.recruiter = :recruiter")
    List<Discussion> findByRecruiter(@Param("recruiter") Recruiter recruiter);
}
