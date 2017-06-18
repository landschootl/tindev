package fr.squirtles.tindev.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.squirtles.tindev.domain.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by maws on 18/06/2017.
 */
public class DiscussionDTO {
    private Long id;

    private Freelance freelance;

    private Mission mission;

    private Set<Message> messages = new HashSet<>();

    private UserProfile freelanceProfile;

    private UserProfile missionProfile;

    private User freelanceUser;

    private User missionUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Freelance getFreelance() {
        return freelance;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public UserProfile getFreelanceProfile() {
        return freelanceProfile;
    }

    public void setFreelanceProfile(UserProfile freelanceProfile) {
        this.freelanceProfile = freelanceProfile;
    }

    public UserProfile getMissionProfile() {
        return missionProfile;
    }

    public void setMissionProfile(UserProfile missionProfile) {
        this.missionProfile = missionProfile;
    }

    public User getFreelanceUser() {
        return freelanceUser;
    }

    public void setFreelanceUser(User freelanceUser) {
        this.freelanceUser = freelanceUser;
    }

    public User getMissionUser() {
        return missionUser;
    }

    public void setMissionUser(User missionUser) {
        this.missionUser = missionUser;
    }
}
