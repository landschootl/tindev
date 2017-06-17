package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
public interface UserProfileRepository extends JpaRepository<UserProfile,Long> {

}
