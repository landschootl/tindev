package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.User;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the User entity.
 */
@SuppressWarnings("unused")
public interface UserRepository extends JpaRepository<User,Long> {

}
