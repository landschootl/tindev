package fr.squirtles.tindev.service.matching;

import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.domain.Matching;
import fr.squirtles.tindev.domain.Mission;
import fr.squirtles.tindev.service.dto.MatchingDTO;

import java.util.Comparator;

/**
 * Created by Maws on 22/06/2017.
 */
public class AlgoMatching implements Comparator<MatchingDTO>{

    public static void calculateScore(Matching matching) {
        Freelance f = matching.getFreelance();
        Mission m = matching.getMission();

        int score = 0;
        if((matching.isRecruiterVoted() != null && matching.isRecruiterVoted() && matching.isRecruiterLiked()) || (matching.isFreelanceVoted() != null && matching.isFreelanceVoted() && matching.isFreelanceLiked())) {
            score += 100;
        }
//        else if ((matching.isRecruiterVoted() != null && matching.isRecruiterVoted() && !matching.isRecruiterLiked()) || (matching.isFreelanceVoted() != null && matching.isFreelanceVoted() && !matching.isFreelanceLiked())){
//
//        }

        if(f.getDomain().equals(m.getDomain())) {
            score += 100;
        }

        if(f.getSpecialty().equals(m.getSpecialty())) {
            score += 100;
        }
        matching.setScore(score);
    }

    @Override
    public int compare(MatchingDTO o1, MatchingDTO o2) {
        return o1.getScore().compareTo(o2.getScore());
    }
}
