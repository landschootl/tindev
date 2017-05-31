package fr.squirtles.tindev.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * <p>Cette classe repr&eacute;sente un message post&eacute; par un utilisateur.</p>
 */
@ApiModel(description = "<p>Cette classe repr&eacute;sente un message post&eacute; par un utilisateur.</p>")
@Entity
@Table(name = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text_message")
    private String textMessage;

    @Column(name = "posting_date")
    private LocalDate postingDate;

    @ManyToOne
    private Discussion discussion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTextMessage() {
        return textMessage;
    }

    public Message textMessage(String textMessage) {
        this.textMessage = textMessage;
        return this;
    }

    public void setTextMessage(String textMessage) {
        this.textMessage = textMessage;
    }

    public LocalDate getPostingDate() {
        return postingDate;
    }

    public Message postingDate(LocalDate postingDate) {
        this.postingDate = postingDate;
        return this;
    }

    public void setPostingDate(LocalDate postingDate) {
        this.postingDate = postingDate;
    }

    public Discussion getDiscussion() {
        return discussion;
    }

    public Message discussion(Discussion discussion) {
        this.discussion = discussion;
        return this;
    }

    public void setDiscussion(Discussion discussion) {
        this.discussion = discussion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", textMessage='" + getTextMessage() + "'" +
            ", postingDate='" + getPostingDate() + "'" +
            "}";
    }
}
