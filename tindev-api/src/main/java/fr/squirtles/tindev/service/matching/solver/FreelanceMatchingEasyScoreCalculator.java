package fr.squirtles.tindev.service.matching.solver;

import fr.squirtles.tindev.service.matching.FreelanceMatchingSolution;
import org.optaplanner.core.api.score.Score;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator;

/**
 * Created by Maws on 15/06/2017.
 */
public class FreelanceMatchingEasyScoreCalculator implements EasyScoreCalculator<FreelanceMatchingSolution> {
    @Override
    public Score calculateScore(FreelanceMatchingSolution freelanceMatchingSolution) {
        return HardSoftScore.valueOf(1, 1);
    }
}
