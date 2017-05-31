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
 * <p>Cette classe repr&eacute;sente une mission cr&eacute;&eacute;e par un recruteur.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente une mission cr&eacute;&eacute;e par un recruteur.</p>")
@Entity
@Table(name = "mission")
public class Mission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "min_salary")
    private Integer minSalary;

    @Column(name = "max_salary")
    private Integer maxSalary;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "mission")
    @JsonIgnore
    private Set<Discussion> discussions = new HashSet<>();

    @ManyToOne
    private Recruiter recruiter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Mission title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Mission description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMinSalary() {
        return minSalary;
    }

    public Mission minSalary(Integer minSalary) {
        this.minSalary = minSalary;
        return this;
    }

    public void setMinSalary(Integer minSalary) {
        this.minSalary = minSalary;
    }

    public Integer getMaxSalary() {
        return maxSalary;
    }

    public Mission maxSalary(Integer maxSalary) {
        this.maxSalary = maxSalary;
        return this;
    }

    public void setMaxSalary(Integer maxSalary) {
        this.maxSalary = maxSalary;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Mission startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Mission endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<Discussion> getDiscussions() {
        return discussions;
    }

    public Mission discussions(Set<Discussion> discussions) {
        this.discussions = discussions;
        return this;
    }

    public Mission addDiscussions(Discussion discussion) {
        this.discussions.add(discussion);
        discussion.setMission(this);
        return this;
    }

    public Mission removeDiscussions(Discussion discussion) {
        this.discussions.remove(discussion);
        discussion.setMission(null);
        return this;
    }

    public void setDiscussions(Set<Discussion> discussions) {
        this.discussions = discussions;
    }

    public Recruiter getRecruiter() {
        return recruiter;
    }

    public Mission recruiter(Recruiter recruiter) {
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
        Mission mission = (Mission) o;
        if (mission.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mission.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mission{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", minSalary='" + getMinSalary() + "'" +
            ", maxSalary='" + getMaxSalary() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
