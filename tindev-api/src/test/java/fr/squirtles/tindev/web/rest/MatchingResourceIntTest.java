package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.Matching;
import fr.squirtles.tindev.repository.FreelanceRepository;
import fr.squirtles.tindev.repository.MatchingRepository;
import fr.squirtles.tindev.repository.MissionRepository;
import fr.squirtles.tindev.repository.UserRepository;
import fr.squirtles.tindev.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MatchingResource REST controller.
 *
 * @see MatchingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class MatchingResourceIntTest {

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final LocalDate DEFAULT_F_LIKED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_F_LIKED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_R_LIKED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_R_LIKED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_FREELANCE_LIKED = false;
    private static final Boolean UPDATED_FREELANCE_LIKED = true;

    private static final Boolean DEFAULT_RECRUITER_LIKED = false;
    private static final Boolean UPDATED_RECRUITER_LIKED = true;

    @Autowired
    private MatchingRepository matchingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FreelanceRepository freelanceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMatchingMockMvc;

    private Matching matching;

    @Autowired
    private MissionRepository missionRepository;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MatchingResource matchingResource = new MatchingResource(matchingRepository, userRepository, freelanceRepository, missionRepository);
        this.restMatchingMockMvc = MockMvcBuilders.standaloneSetup(matchingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matching createEntity(EntityManager em) {
        Matching matching = new Matching()
            .score(DEFAULT_SCORE)
            .fLikedDate(DEFAULT_F_LIKED_DATE)
            .rLikedDate(DEFAULT_R_LIKED_DATE)
            .freelanceLiked(DEFAULT_FREELANCE_LIKED)
            .recruiterLiked(DEFAULT_RECRUITER_LIKED);
        return matching;
    }

    @Before
    public void initTest() {
        matching = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatching() throws Exception {
        int databaseSizeBeforeCreate = matchingRepository.findAll().size();

        // Create the Matching
        restMatchingMockMvc.perform(post("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matching)))
            .andExpect(status().isCreated());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeCreate + 1);
        Matching testMatching = matchingList.get(matchingList.size() - 1);
        assertThat(testMatching.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testMatching.getfLikedDate()).isEqualTo(DEFAULT_F_LIKED_DATE);
        assertThat(testMatching.getrLikedDate()).isEqualTo(DEFAULT_R_LIKED_DATE);
        assertThat(testMatching.isFreelanceLiked()).isEqualTo(DEFAULT_FREELANCE_LIKED);
        assertThat(testMatching.isRecruiterLiked()).isEqualTo(DEFAULT_RECRUITER_LIKED);
    }

    @Test
    @Transactional
    public void createMatchingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matchingRepository.findAll().size();

        // Create the Matching with an existing ID
        matching.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatchingMockMvc.perform(post("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matching)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMatchings() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);

        // Get all the matchingList
        restMatchingMockMvc.perform(get("/api/matchings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matching.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].fLikedDate").value(hasItem(DEFAULT_F_LIKED_DATE.toString())))
            .andExpect(jsonPath("$.[*].rLikedDate").value(hasItem(DEFAULT_R_LIKED_DATE.toString())))
            .andExpect(jsonPath("$.[*].freelanceLiked").value(hasItem(DEFAULT_FREELANCE_LIKED.booleanValue())))
            .andExpect(jsonPath("$.[*].recruiterLiked").value(hasItem(DEFAULT_RECRUITER_LIKED.booleanValue())));
    }

    @Test
    @Transactional
    public void getMatching() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);

        // Get the matching
        restMatchingMockMvc.perform(get("/api/matchings/{id}", matching.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(matching.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.fLikedDate").value(DEFAULT_F_LIKED_DATE.toString()))
            .andExpect(jsonPath("$.rLikedDate").value(DEFAULT_R_LIKED_DATE.toString()))
            .andExpect(jsonPath("$.freelanceLiked").value(DEFAULT_FREELANCE_LIKED.booleanValue()))
            .andExpect(jsonPath("$.recruiterLiked").value(DEFAULT_RECRUITER_LIKED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMatching() throws Exception {
        // Get the matching
        restMatchingMockMvc.perform(get("/api/matchings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatching() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);
        int databaseSizeBeforeUpdate = matchingRepository.findAll().size();

        // Update the matching
        Matching updatedMatching = matchingRepository.findOne(matching.getId());
        updatedMatching
            .score(UPDATED_SCORE)
            .fLikedDate(UPDATED_F_LIKED_DATE)
            .rLikedDate(UPDATED_R_LIKED_DATE)
            .freelanceLiked(UPDATED_FREELANCE_LIKED)
            .recruiterLiked(UPDATED_RECRUITER_LIKED);

        restMatchingMockMvc.perform(put("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatching)))
            .andExpect(status().isOk());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeUpdate);
        Matching testMatching = matchingList.get(matchingList.size() - 1);
        assertThat(testMatching.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testMatching.getfLikedDate()).isEqualTo(UPDATED_F_LIKED_DATE);
        assertThat(testMatching.getrLikedDate()).isEqualTo(UPDATED_R_LIKED_DATE);
        assertThat(testMatching.isFreelanceLiked()).isEqualTo(UPDATED_FREELANCE_LIKED);
        assertThat(testMatching.isRecruiterLiked()).isEqualTo(UPDATED_RECRUITER_LIKED);
    }

    @Test
    @Transactional
    public void updateNonExistingMatching() throws Exception {
        int databaseSizeBeforeUpdate = matchingRepository.findAll().size();

        // Create the Matching

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMatchingMockMvc.perform(put("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matching)))
            .andExpect(status().isCreated());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMatching() throws Exception {
        // Initialize the database
        matchingRepository.saveAndFlush(matching);
        int databaseSizeBeforeDelete = matchingRepository.findAll().size();

        // Get the matching
        restMatchingMockMvc.perform(delete("/api/matchings/{id}", matching.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Matching.class);
    }
}
