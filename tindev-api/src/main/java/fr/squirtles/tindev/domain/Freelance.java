package fr.squirtles.tindev.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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
