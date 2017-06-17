package fr.squirtles.tindev.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * <p>Cette classe repr&eacute;sente le domaine d&#39;activit&eacute; d&#39;un freelance.</p><p>Exemple : D&eacute;veloppeur.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente le domaine d&#39;activit&eacute; d&#39;un freelance.</p><p>Exemple : D&eacute;veloppeur.</p>")
@Entity
@Table(name = "domain")
public class Domain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private Integer code;

    @OneToMany(mappedBy = "domain")
    @JsonIgnore
    private Set<Freelance> freelances = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Domain name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public Domain code(Integer code) {
        this.code = code;
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Set<Freelance> getFreelances() {
        return freelances;
    }

    public Domain freelances(Set<Freelance> freelances) {
        this.freelances = freelances;
        return this;
    }

    public Domain addFreelances(Freelance freelance) {
        this.freelances.add(freelance);
        freelance.setDomain(this);
        return this;
    }

    public Domain removeFreelances(Freelance freelance) {
        this.freelances.remove(freelance);
        freelance.setDomain(null);
        return this;
    }

    public void setFreelances(Set<Freelance> freelances) {
        this.freelances = freelances;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Domain domain = (Domain) o;
        if (domain.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, domain.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Domain{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", code='" + code + "'" +
            '}';
    }
}
