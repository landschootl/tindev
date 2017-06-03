package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.UserMatching;
import fr.squirtles.tindev.repository.UserMatchingRepository;
import fr.squirtles.tindev.service.UserMatchingService;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserMatchingResource REST controller.
 *
 * @see UserMatchingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class UserMatchingResourceIntTest {

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Autowired
    private UserMatchingRepository userMatchingRepository;

    @Autowired
    private UserMatchingService userMatchingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserMatchingMockMvc;

    private UserMatching userMatching;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserMatchingResource userMatchingResource = new UserMatchingResource(userMatchingService);
        this.restUserMatchingMockMvc = MockMvcBuilders.standaloneSetup(userMatchingResource)
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
    public static UserMatching createEntity(EntityManager em) {
        UserMatching userMatching = new UserMatching()
            .score(DEFAULT_SCORE);
        return userMatching;
    }

    @Before
    public void initTest() {
        userMatching = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserMatching() throws Exception {
        int databaseSizeBeforeCreate = userMatchingRepository.findAll().size();

        // Create the UserMatching
        restUserMatchingMockMvc.perform(post("/api/user-matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMatching)))
            .andExpect(status().isCreated());

        // Validate the UserMatching in the database
        List<UserMatching> userMatchingList = userMatchingRepository.findAll();
        assertThat(userMatchingList).hasSize(databaseSizeBeforeCreate + 1);
        UserMatching testUserMatching = userMatchingList.get(userMatchingList.size() - 1);
        assertThat(testUserMatching.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createUserMatchingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userMatchingRepository.findAll().size();

        // Create the UserMatching with an existing ID
        userMatching.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserMatchingMockMvc.perform(post("/api/user-matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMatching)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UserMatching> userMatchingList = userMatchingRepository.findAll();
        assertThat(userMatchingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserMatchings() throws Exception {
        // Initialize the database
        userMatchingRepository.saveAndFlush(userMatching);

        // Get all the userMatchingList
        restUserMatchingMockMvc.perform(get("/api/user-matchings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userMatching.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }

    @Test
    @Transactional
    public void getUserMatching() throws Exception {
        // Initialize the database
        userMatchingRepository.saveAndFlush(userMatching);

        // Get the userMatching
        restUserMatchingMockMvc.perform(get("/api/user-matchings/{id}", userMatching.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userMatching.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingUserMatching() throws Exception {
        // Get the userMatching
        restUserMatchingMockMvc.perform(get("/api/user-matchings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserMatching() throws Exception {
        // Initialize the database
        userMatchingService.save(userMatching);

        int databaseSizeBeforeUpdate = userMatchingRepository.findAll().size();

        // Update the userMatching
        UserMatching updatedUserMatching = userMatchingRepository.findOne(userMatching.getId());
        updatedUserMatching
            .score(UPDATED_SCORE);

        restUserMatchingMockMvc.perform(put("/api/user-matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserMatching)))
            .andExpect(status().isOk());

        // Validate the UserMatching in the database
        List<UserMatching> userMatchingList = userMatchingRepository.findAll();
        assertThat(userMatchingList).hasSize(databaseSizeBeforeUpdate);
        UserMatching testUserMatching = userMatchingList.get(userMatchingList.size() - 1);
        assertThat(testUserMatching.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserMatching() throws Exception {
        int databaseSizeBeforeUpdate = userMatchingRepository.findAll().size();

        // Create the UserMatching

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserMatchingMockMvc.perform(put("/api/user-matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userMatching)))
            .andExpect(status().isCreated());

        // Validate the UserMatching in the database
        List<UserMatching> userMatchingList = userMatchingRepository.findAll();
        assertThat(userMatchingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserMatching() throws Exception {
        // Initialize the database
        userMatchingService.save(userMatching);

        int databaseSizeBeforeDelete = userMatchingRepository.findAll().size();

        // Get the userMatching
        restUserMatchingMockMvc.perform(delete("/api/user-matchings/{id}", userMatching.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserMatching> userMatchingList = userMatchingRepository.findAll();
        assertThat(userMatchingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserMatching.class);
        UserMatching userMatching1 = new UserMatching();
        userMatching1.setId(1L);
        UserMatching userMatching2 = new UserMatching();
        userMatching2.setId(userMatching1.getId());
        assertThat(userMatching1).isEqualTo(userMatching2);
        userMatching2.setId(2L);
        assertThat(userMatching1).isNotEqualTo(userMatching2);
        userMatching1.setId(null);
        assertThat(userMatching1).isNotEqualTo(userMatching2);
    }
}
