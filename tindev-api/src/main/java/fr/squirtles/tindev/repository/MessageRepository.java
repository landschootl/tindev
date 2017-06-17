package fr.squirtles.tindev.repository;

import fr.squirtles.tindev.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Message entity.
 */
@SuppressWarnings("unused")
public interface MessageRepository extends JpaRepository<Message, Long> {

}
