package fr.squirtles.tindev.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.squirtles.tindev.domain.*;
import fr.squirtles.tindev.repository.*;
import fr.squirtles.tindev.security.AuthoritiesConstants;
import fr.squirtles.tindev.security.SecurityUtils;
import fr.squirtles.tindev.service.dto.MatchingDTO;
import fr.squirtles.tindev.service.matching.AlgoMatching;
import fr.squirtles.tindev.service.matching.FreelanceMatching;
import fr.squirtles.tindev.service.matching.FreelanceMatchingSolution;
import fr.squirtles.tindev.web.rest.util.HeaderUtil;
import fr.squirtles.tindev.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Matching.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MatchingResource {

    private final Logger log = LoggerFactory.getLogger(MatchingResource.class);

    private static final String ENTITY_NAME = "matching";

    private final MatchingRepository matchingRepository;
    private final UserRepository userRepository;
    private final FreelanceRepository freelanceRepository;
    private MissionRepository missionRepository;
    private UserProfileRepository userProfileRepository;

    public MatchingResource(MatchingRepository matchingRepository, UserRepository userRepository, FreelanceRepository freelanceRepository, MissionRepository missionRepository, UserProfileRepository userProfileRepository) {
        this.matchingRepository = matchingRepository;
        this.userRepository = userRepository;
        this.freelanceRepository = freelanceRepository;
        this.missionRepository = missionRepository;
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * POST  /matchings : Create a new matching.
     *
     * @param matching the matching to create
     * @return the ResponseEntity with status 201 (Created) and with body the new matching, or with status 400 (Bad Request) if the matching has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/matchings")
    @Timed
    public ResponseEntity<Matching> createMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to save Matching : {}", matching);
        if (matching.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new matching cannot already have an ID")).body(null);
        }
        Matching result = matchingRepository.save(matching);
        return ResponseEntity.created(new URI("/api/matchings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /matchings : Updates an existing matching.
     *
     * @param matching the matching to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated matching,
     * or with status 400 (Bad Request) if the matching is not valid,
     * or with status 500 (Internal Server Error) if the matching couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/matchings")
    @Timed
    public ResponseEntity<Matching> updateMatching(@RequestBody Matching matching) throws URISyntaxException {
        log.debug("REST request to update Matching : {}", matching);
        if (matching.getId() == null) {
            return createMatching(matching);
        }
        Matching result = matchingRepository.save(matching);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, matching.getId().toString()))
            .body(result);
    }

    /**
     * GET  /matchings : get all the matchings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of matchings in body
     */
    @GetMapping("/matchings")
    @Timed
    public ResponseEntity<List<Matching>> getAllMatchings(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Matchings");
        Page<Matching> page = matchingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/matchings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /matchings/:id : get the "id" matching.
     *
     * @param id the id of the matching to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the matching, or with status 404 (Not Found)
     */
    @GetMapping("/matchings/{id}")
    @Timed
    public ResponseEntity<Matching> getMatching(@PathVariable Long id) {
        log.debug("REST request to get Matching : {}", id);
        Matching matching = matchingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(matching));
    }

    /**
     * DELETE  /matchings/:id : delete the "id" matching.
     *
     * @param id the id of the matching to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/matchings/{id}")
    @Timed
    public ResponseEntity<Void> deleteMatching(@PathVariable Long id) {
        log.debug("REST request to delete Matching : {}", id);
        matchingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /*
      FREELANCE
     *//*
    @GetMapping("/matchings/best")
    @Timed
    public List<Matching> getBestMatching() {
        log.debug("tindddeeeeeeevvvvv");
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.FREELANCE)) {
            // J'ai besoin des matching existant et des matching en cours (mission qui aurait deja matché)
            // Build the Solver
            SolverFactory<FreelanceMatchingSolution> solverFactory = SolverFactory.createFromXmlResource(
                "solver/freelanceMatchingSolverConfig.xml");
            Solver<FreelanceMatchingSolution> solver = solverFactory.buildSolver();

            FreelanceMatchingSolution unsolvedMatching = new FreelanceMatchingSolution();

            initFreelanceProblem(unsolvedMatching);

            // Solve the problem
            FreelanceMatchingSolution foundMatching = solver.solve(unsolvedMatching);

            return convertMatchingSolutionToMatchings(foundMatching);
        } else if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.FREELANCE)) {

        }

        return null;
    }*/

    @GetMapping("/matchings/best")
    @Timed
    public List<MatchingDTO> getMatchings(@RequestParam("id") Long id) {
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.FREELANCE)) {
            Freelance freelance = freelanceRepository.findByIdUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get().getId());
            List<Mission> missions = missionRepository.findAll();
            List<MatchingDTO> matchings = new ArrayList<>();

            this.matchingRepository.findByFreelance(freelance).forEach(matching -> {
                if (matching.isFreelanceVoted() == null || !matching.isFreelanceVoted()) {
                    matchings.add(toDTO(matching));
                }
                missions.remove(matching.getMission());
            });

            missions.stream().forEach(mission -> {
                Matching matching = new Matching();
                matching.setFreelance(freelance);
                matching.setMission(mission);
                AlgoMatching.calculateScore(matching);
                matchings.add(toDTO(matching));
            });

            Collections.sort(matchings, new AlgoMatching());
            return truncate(matchings);
        } else if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.RECRUITER)) {
            Mission mission = missionRepository.findOne(id);
            List<Freelance> freelances = freelanceRepository.findAll();
            List<MatchingDTO> matchings = new ArrayList<>();

            this.matchingRepository.findByMission(mission).forEach(matching -> {
                if (matching.isRecruiterVoted() == null || !matching.isRecruiterVoted()) {
                    matchings.add(toDTO(matching));
                }
                freelances.remove(matching.getFreelance());
            });

            freelances.stream().forEach(freelance-> {
                Matching matching = new Matching();
                matching.setFreelance(freelance);
                matching.setMission(mission);
                AlgoMatching.calculateScore(matching);
                matchings.add(toDTO(matching));
            });
            Collections.sort(matchings, new AlgoMatching());
            return truncate(matchings);
        }

        return null;
    }

    private List<MatchingDTO> truncate(List<MatchingDTO> matchings) {
    return  matchings.stream()
            .limit(5)
            .collect(Collectors.toList());
    }

    private MatchingDTO toDTO(Matching matching) {
        MatchingDTO dto = new MatchingDTO();
        dto.setId(matching.getId());
        dto.setScore(matching.getScore());
        dto.setfLikedDate(matching.getfLikedDate());
        dto.setFreelanceLiked(matching.isFreelanceLiked());
        dto.setrLikedDate(matching.getrLikedDate());
        dto.setFreelanceVoted(matching.isFreelanceVoted());
        dto.setRecruiterLiked(matching.isRecruiterLiked());
        dto.setRecruiterVoted(matching.isRecruiterVoted());
        dto.setMission(matching.getMission());
        dto.setFreelance(matching.getFreelance());
        User freelanceUser = userRepository.findOne(matching.getFreelance().getIdUser());
        User recruiterUser = userRepository.getOne(matching.getMission().getRecruiter().getIdUser());
        UserProfile freelanceUserProfile = userProfileRepository.getOne(matching.getFreelance().getIdUser());
        UserProfile recruiterUserProfile = userProfileRepository.getOne(matching.getMission().getRecruiter().getIdUser());
        //Freelance
        freelanceUserProfile.setFirstname(freelanceUser.getFirstName());
        freelanceUserProfile.setLastname(freelanceUser.getLastName());

        //Recruiter
        recruiterUserProfile.setFirstname(recruiterUser.getFirstName());
        recruiterUserProfile.setLastname(recruiterUser.getLastName());

        dto.setFreelanceProfile(freelanceUserProfile);
        dto.setMissionProfile(recruiterUserProfile);
        dto.setFreelanceUser(freelanceUser);
        dto.setMissionUser(recruiterUser);
        return dto;
    }

    private List<Matching> convertMatchingSolutionToMatchings(FreelanceMatchingSolution foundMatching) {
        return null;
    }

    private void initFreelanceProblem(FreelanceMatchingSolution unsolved) {
        Freelance freelance = freelanceRepository.findByIdUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get().getId());
        final List<Matching> matchings = findMatching(freelance);
        final List<Mission> missions = missionRepository.findAll();
        List<FreelanceMatching> existingMatchings = convertMatching(matchings, freelance);

        unsolved.setMissionList(missions);
        unsolved.setExistingMatchings(existingMatchings);
        unsolved.setFreelance(freelance);
        unsolved.setMatchings(new ArrayList<>());
    }

    private List<Matching> findMatching(Freelance freelance) {
        return matchingRepository.findByFreelance(freelance);
    }

    List<FreelanceMatching> convertMatching(List<Matching> matchings, Freelance freelance) {
        final List<FreelanceMatching> freelanceMatchings = new ArrayList<>();
        matchings.stream().forEach(m -> {
            final FreelanceMatching matching = new FreelanceMatching();
            matching.setFreelance(m.getFreelance());
            matching.setMission(m.getMission());
        });

        return freelanceMatchings;
    }
}
