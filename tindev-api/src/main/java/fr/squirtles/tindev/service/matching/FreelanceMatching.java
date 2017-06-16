package fr.squirtles.tindev.service.matching;

import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Mission;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

import java.util.List;

/**
 * Created by Maws on 15/06/2017.
 */
@PlanningEntity
public class FreelanceMatching {

    private Freelance freelance;

    private Mission mission;

    public Freelance getFreelance() {
        return freelance;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
    }

    @PlanningVariable(valueRangeProviderRefs = {"missionRange"})
    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }
}
