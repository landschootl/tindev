package fr.squirtles.tindev.service.matching;

import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Matching;
import fr.squirtles.tindev.domain.Mission;
import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;

import java.util.List;

/**
 * Created by Maws on 15/06/2017.
 */
@PlanningSolution
public class FreelanceMatchingSolution {
    private List<Mission> missionList;

    private List<FreelanceMatching> matchings;

    private List<FreelanceMatching> existingMatchings;

    private Freelance freelance;

    private HardSoftScore score;

    @ValueRangeProvider(id = "missionRange")
    @ProblemFactCollectionProperty
    public List<Mission> getMissionList() {
        return missionList;
    }

    @ProblemFactProperty
    public Freelance getFreelance() {
        return freelance;
    }

    @ProblemFactCollectionProperty
    public List<FreelanceMatching> getMatchings() {
        return matchings;
    }

    @ProblemFactCollectionProperty
    public List<FreelanceMatching> getExistingMatchings() {
        return existingMatchings;
    }

    @PlanningScore
    public HardSoftScore getScore() {
        return score;
    }

    public void setScore(HardSoftScore score) {
        this.score = score;
    }

    public void setMissionList(List<Mission> missionList) {
        this.missionList = missionList;
    }

    public void setExistingMatchings(List<FreelanceMatching> existingMatchings) {
        this.existingMatchings = existingMatchings;
    }

    public void setMatchings(List<FreelanceMatching> matchings) {
        this.matchings = matchings;
    }

    public void setFreelance(Freelance freelance) {
        this.freelance = freelance;
    }
}
