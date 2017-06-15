package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Matching;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Matching entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatchingRepository extends JpaRepository<Matching,Long> {
    public List<Matching> findByFreelance(Freelance freelance);
}