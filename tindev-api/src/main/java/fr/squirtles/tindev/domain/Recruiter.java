package fr.squirtles.tindev.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente un recruteur.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente un recruteur.</p>")
@Entity
@Table(name = "recruiter")
public class Recruiter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company")
    private String company;

    @NotNull
    @Column(name = "id_user", nullable = false)
    private Long idUser;

    @OneToMany(mappedBy = "recruiter")
    @JsonIgnore
    private Set<Mission> missions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public Recruiter company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Long getIdUser() {
        return idUser;
    }

    public Recruiter idUser(Long idUser) {
        this.idUser = idUser;
        return this;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Set<Mission> getMissions() {
        return missions;
    }

    public Recruiter missions(Set<Mission> missions) {
        this.missions = missions;
        return this;
    }

    public Recruiter addMissions(Mission mission) {
        this.missions.add(mission);
        mission.setRecruiter(this);
        return this;
    }

    public Recruiter removeMissions(Mission mission) {
        this.missions.remove(mission);
        mission.setRecruiter(null);
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
        Recruiter recruiter = (Recruiter) o;
        if (recruiter.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, recruiter.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Recruiter{" +
            "id=" + id +
            ", company='" + company + "'" +
            ", idUser='" + idUser + "'" +
            '}';
    }
}
