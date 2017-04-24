package fr.squirtles.tindev.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
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
            '}';
    }
}
