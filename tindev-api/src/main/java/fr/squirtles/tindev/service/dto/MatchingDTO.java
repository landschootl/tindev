package fr.squirtles.tindev.service.dto;

import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Mission;
import fr.squirtles.tindev.domain.User;
import fr.squirtles.tindev.domain.UserProfile;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Created by maws on 18/06/2017.
 */
public class MatchingDTO {
    private Long id;

    private Integer score;

    private LocalDate fLikedDate;

    private LocalDate rLikedDate;

    private Boolean freelanceLiked;

    private Boolean recruiterLiked;

    private Boolean freelanceVoted;

    private Boolean recruiterVoted;

    private Mission mission;

    private Freelance freelance;

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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDate getfLikedDate() {
        return fLikedDate;
    }

    public void setfLikedDate(LocalDate fLikedDate) {
        this.fLikedDate = fLikedDate;
    }

    public LocalDate getrLikedDate() {
        return rLikedDate;
    }

    public void setrLikedDate(LocalDate rLikedDate) {
        this.rLikedDate = rLikedDate;
    }

    public Boolean getFreelanceLiked() {
        return freelanceLiked;
    }

    public void setFreelanceLiked(Boolean freelanceLiked) {
        this.freelanceLiked = freelanceLiked;
    }

    public Boolean getRecruiterLiked() {
        return recruiterLiked;
    }

    public void setRecruiterLiked(Boolean recruiterLiked) {
        this.recruiterLiked = recruiterLiked;
    }

    public Boolean getFreelanceVoted() {
        return freelanceVoted;
    }

    public void setFreelanceVoted(Boolean freelanceVoted) {
        this.freelanceVoted = freelanceVoted;
    }

    public Boolean getRecruiterVoted() {
        return recruiterVoted;
    }

    public void setRecruiterVoted(Boolean recruiterVoted) {
        this.recruiterVoted = recruiterVoted;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Freelance getFreelance() {
        return freelance;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
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

    public void setFreelanceUser(User freelanceUser) {
        this.freelanceUser = freelanceUser;
    }

    public User getFreelanceUser() {
        return freelanceUser;
    }

    public void setMissionUser(User missionUser) {
        this.missionUser = missionUser;
    }

    public User getMissionUser() {
        return missionUser;
    }
}
