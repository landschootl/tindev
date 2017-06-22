package fr.squirtles.tindev.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente une sp&eacute;cialit&eacute; d&#39;un freelance.</p><p>Exemple&nbsp;: front (d&eacute;veloppeur front)</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente une sp&eacute;cialit&eacute; d&#39;un freelance.</p><p>Exemple&nbsp;: front (d&eacute;veloppeur front)</p>")
@Entity
@Table(name = "specialty")
public class Specialty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private Integer code;

    @OneToMany(mappedBy = "specialty")
    @JsonIgnore
    private Set<Freelance> freelances = new HashSet<>();

    @OneToMany(mappedBy = "specialty")
    @JsonIgnore
    private Set<Mission> missions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Specialty name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public Specialty code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Set<Freelance> getFreelances() {
        return freelances;
    }

    public Specialty freelances(Set<Freelance> freelances) {
        this.freelances = freelances;
        return this;
    }

    public Specialty addFreelances(Freelance freelance) {
        this.freelances.add(freelance);
        freelance.setSpecialty(this);
        return this;
    }

    public Specialty removeFreelances(Freelance freelance) {
        this.freelances.remove(freelance);
        freelance.setSpecialty(null);
        return this;
    }

    public void setFreelances(Set<Freelance> freelances) {
        this.freelances = freelances;
    }

    public Set<Mission> getMissions() {
        return missions;
    }

    public Specialty missions(Set<Mission> missions) {
        this.missions = missions;
        return this;
    }

    public Specialty addMissions(Mission mission) {
        this.missions.add(mission);
        mission.setSpecialty(this);
        return this;
    }

    public Specialty removeMissions(Mission mission) {
        this.missions.remove(mission);
        mission.setSpecialty(null);
        return this;
    }

    public void setMissions(Set<Mission> missions) {
        this.missions = missions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Specialty specialty = (Specialty) o;
        if (specialty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), specialty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Specialty{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
