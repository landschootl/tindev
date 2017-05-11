package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Userprofile;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Userprofile entity.
 */
@SuppressWarnings("unused")
public interface UserprofileRepository extends JpaRepository<Userprofile,Long> {

}
