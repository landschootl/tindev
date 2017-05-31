package fr.squirtles.tindev.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente une exp&eacute;rience d&#39;un freelance.</p><p>Exemple : D&eacute;veloppeur front du 01/01/2016 au 01/01/2017.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente une exp&eacute;rience d&#39;un freelance.</p><p>Exemple : D&eacute;veloppeur front du 01/01/2016 au 01/01/2017.</p>")
@Entity
@Table(name = "experience")
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_year")
    private LocalDate startYear;

    @Column(name = "end_year")
    private LocalDate endYear;

    @Column(name = "location")
    private String location;

    @ManyToOne
    private Freelance freelance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartYear() {
        return startYear;
    }

    public Experience startYear(LocalDate startYear) {
        this.startYear = startYear;
        return this;
    }

    public void setStartYear(LocalDate startYear) {
        this.startYear = startYear;
    }

    public LocalDate getEndYear() {
        return endYear;
    }

    public Experience endYear(LocalDate endYear) {
        this.endYear = endYear;
        return this;
    }

    public void setEndYear(LocalDate endYear) {
        this.endYear = endYear;
    }

    public String getLocation() {
        return location;
    }

    public Experience location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Freelance getFreelance() {
        return freelance;
    }

    public Experience freelance(Freelance freelance) {
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
        Experience experience = (Experience) o;
        if (experience.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), experience.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Experience{" +
            "id=" + getId() +
            ", startYear='" + getStartYear() + "'" +
            ", endYear='" + getEndYear() + "'" +
            ", location='" + getLocation() + "'" +
            "}";
    }
}
