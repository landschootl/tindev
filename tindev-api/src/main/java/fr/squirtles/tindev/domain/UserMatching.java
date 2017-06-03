package fr.squirtles.tindev.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserMatching.
 */
@Entity
@Table(name = "user_matching")
public class UserMatching implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "score")
    private Integer score;

    @ManyToOne
    private Freelance freelance;

    @ManyToOne
    private Recruiter recruiter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public UserMatching score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Freelance getFreelance() {
        return freelance;
    }

    public UserMatching freelance(Freelance freelance) {
        this.freelance = freelance;
        return this;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
    }

    public Recruiter getRecruiter() {
        return recruiter;
    }

    public UserMatching recruiter(Recruiter recruiter) {
        this.recruiter = recruiter;
        return this;
    }

    public void setRecruiter(Recruiter recruiter) {
        this.recruiter = recruiter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserMatching userMatching = (UserMatching) o;
        if (userMatching.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userMatching.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserMatching{" +
            "id=" + getId() +
            ", score='" + getScore() + "'" +
            "}";
    }
}
