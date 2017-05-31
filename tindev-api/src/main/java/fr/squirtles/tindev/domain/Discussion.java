package fr.squirtles.tindev.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente une discussion entre un recruteur et un freelance.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente une discussion entre un recruteur et un freelance.</p>")
@Entity
@Table(name = "discussion")
public class Discussion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Freelance freelance;

    @ManyToOne
    private Mission mission;

    @OneToMany(mappedBy = "discussion")
    @JsonIgnore
    private Set<Message> messages = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Freelance getFreelance() {
        return freelance;
    }

    public Discussion freelance(Freelance freelance) {
        this.freelance = freelance;
        return this;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
    }

    public Mission getMission() {
        return mission;
    }

    public Discussion mission(Mission mission) {
        this.mission = mission;
        return this;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Discussion messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Discussion addMessages(Message message) {
        this.messages.add(message);
        message.setDiscussion(this);
        return this;
    }

    public Discussion removeMessages(Message message) {
        this.messages.remove(message);
        message.setDiscussion(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Discussion discussion = (Discussion) o;
        if (discussion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), discussion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Discussion{" +
            "id=" + getId() +
            "}";
    }
}
