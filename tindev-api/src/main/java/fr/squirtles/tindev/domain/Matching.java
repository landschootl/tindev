package fr.squirtles.tindev.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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

    @Column(name = "score")
    private Integer score;

    @Column(name = "f_liked_date")
    private LocalDate fLikedDate;

    @Column(name = "r_liked_date")
    private LocalDate rLikedDate;

    @Column(name = "freelance_liked")
    private Boolean freelanceLiked;

    @Column(name = "recruiter_liked")
    private Boolean recruiterLiked;

    @Column(name = "freelance_voted")
    private Boolean freelanceVoted;

    @Column(name = "recruiter_voted")
    private Boolean recruiterVoted;

    @ManyToOne
    private Mission mission;

    @ManyToOne
    private Freelance freelance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public Matching score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDate getfLikedDate() {
        return fLikedDate;
    }

    public Matching fLikedDate(LocalDate fLikedDate) {
        this.fLikedDate = fLikedDate;
        return this;
    }

    public void setfLikedDate(LocalDate fLikedDate) {
        this.fLikedDate = fLikedDate;
    }

    public LocalDate getrLikedDate() {
        return rLikedDate;
    }

    public Matching rLikedDate(LocalDate rLikedDate) {
        this.rLikedDate = rLikedDate;
        return this;
    }

    public void setrLikedDate(LocalDate rLikedDate) {
        this.rLikedDate = rLikedDate;
    }

    public Boolean isFreelanceLiked() {
        return freelanceLiked;
    }

    public Matching freelanceLiked(Boolean freelanceLiked) {
        this.freelanceLiked = freelanceLiked;
        return this;
    }

    public void setFreelanceLiked(Boolean freelanceLiked) {
        this.freelanceLiked = freelanceLiked;
    }

    public Boolean isRecruiterLiked() {
        return recruiterLiked;
    }

    public Matching recruiterLiked(Boolean recruiterLiked) {
        this.recruiterLiked = recruiterLiked;
        return this;
    }

    public void setRecruiterLiked(Boolean recruiterLiked) {
        this.recruiterLiked = recruiterLiked;
    }

    public Boolean isFreelanceVoted() {
        return freelanceVoted;
    }

    public Matching freelanceVoted(Boolean freelanceVoted) {
        this.freelanceVoted = freelanceVoted;
        return this;
    }

    public void setFreelanceVoted(Boolean freelanceVoted) {
        this.freelanceVoted = freelanceVoted;
    }

    public Boolean isRecruiterVoted() {
        return recruiterVoted;
    }

    public Matching recruiterVoted(Boolean recruiterVoted) {
        this.recruiterVoted = recruiterVoted;
        return this;
    }

    public void setRecruiterVoted(Boolean recruiterVoted) {
        this.recruiterVoted = recruiterVoted;
    }

    public Mission getMission() {
        return mission;
    }

    public Matching mission(Mission mission) {
        this.mission = mission;
        return this;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Freelance getFreelance() {
        return freelance;
    }

    public Matching freelance(Freelance freelance) {
        this.freelance = freelance;
        return this;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
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
            ", score='" + getScore() + "'" +
            ", fLikedDate='" + getfLikedDate() + "'" +
            ", rLikedDate='" + getrLikedDate() + "'" +
            ", freelanceLiked='" + isFreelanceLiked() + "'" +
            ", recruiterLiked='" + isRecruiterLiked() + "'" +
            ", freelanceVoted='" + isFreelanceVoted() + "'" +
            ", recruiterVoted='" + isRecruiterVoted() + "'" +
            "}";
    }
}
