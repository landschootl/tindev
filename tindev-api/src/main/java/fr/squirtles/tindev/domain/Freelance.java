package fr.squirtles.tindev.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente un freelance.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente un freelance.</p>")
@Entity
@Table(name = "freelance")
public class Freelance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "daily_price")
    private Integer dailyPrice;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @ManyToOne
    private Specialty specialty;

    @ManyToOne
    private Domain domain;

    @OneToMany(mappedBy = "freelance")
    @JsonIgnore
    private Set<Training> trainings = new HashSet<>();

    @OneToMany(mappedBy = "freelance")
    @JsonIgnore
    private Set<Skill> skills = new HashSet<>();

    @OneToMany(mappedBy = "freelance")
    @JsonIgnore
    private Set<Experience> experiences = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDailyPrice() {
        return dailyPrice;
    }

    public Freelance dailyPrice(Integer dailyPrice) {
        this.dailyPrice = dailyPrice;
        return this;
    }

    public void setDailyPrice(Integer dailyPrice) {
        this.dailyPrice = dailyPrice;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public Freelance birthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public Specialty getSpecialty() {
        return specialty;
    }

    public Freelance specialty(Specialty specialty) {
        this.specialty = specialty;
        return this;
    }

    public void setSpecialty(Specialty specialty) {
        this.specialty = specialty;
    }

    public Domain getDomain() {
        return domain;
    }

    public Freelance domain(Domain domain) {
        this.domain = domain;
        return this;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public Set<Training> getTrainings() {
        return trainings;
    }

    public Freelance trainings(Set<Training> trainings) {
        this.trainings = trainings;
        return this;
    }

    public Freelance addTrainings(Training training) {
        this.trainings.add(training);
        training.setFreelance(this);
        return this;
    }

    public Freelance removeTrainings(Training training) {
        this.trainings.remove(training);
        training.setFreelance(null);
        return this;
    }

    public void setTrainings(Set<Training> trainings) {
        this.trainings = trainings;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Freelance skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Freelance addSkills(Skill skill) {
        this.skills.add(skill);
        skill.setFreelance(this);
        return this;
    }

    public Freelance removeSkills(Skill skill) {
        this.skills.remove(skill);
        skill.setFreelance(null);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public Set<Experience> getExperiences() {
        return experiences;
    }

    public Freelance experiences(Set<Experience> experiences) {
        this.experiences = experiences;
        return this;
    }

    public Freelance addExperiences(Experience experience) {
        this.experiences.add(experience);
        experience.setFreelance(this);
        return this;
    }

    public Freelance removeExperiences(Experience experience) {
        this.experiences.remove(experience);
        experience.setFreelance(null);
        return this;
    }

    public void setExperiences(Set<Experience> experiences) {
        this.experiences = experiences;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Freelance freelance = (Freelance) o;
        if (freelance.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, freelance.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Freelance{" +
            "id=" + id +
            ", dailyPrice='" + dailyPrice + "'" +
            ", birthdate='" + birthdate + "'" +
            '}';
    }
}
