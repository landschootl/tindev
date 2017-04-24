package fr.squirtles.tindev.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente une discussion entre un recruteur et un freelance.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente une discussion entre un recruteur et un freelance.</p>")
@Entity
@Table(name = "discussion")
public class Discussion implements Serializable {

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
        Discussion discussion = (Discussion) o;
        if (discussion.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, discussion.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Discussion{" +
            "id=" + id +
            '}';
    }
}
