package fr.squirtles.tindev.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Matching.
 */
@Entity
@Table(name = "matching")
public class Matching implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Matching matching = (Matching) o;
        if (matching.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), matching.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Matching{" +
            "id=" + getId() +
            "}";
    }
}
