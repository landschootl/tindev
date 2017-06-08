package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.Matching;
import fr.squirtles.tindev.repository.MatchingRepository;
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
 * Test class for the MatchingResource REST controller.
 *
 * @see MatchingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class MatchingResourceIntTest {

    @Autowired
    private MatchingRepository matchingRepository;

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

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        MatchingResource matchingResource = new MatchingResource(matchingRepository);
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
        Matching matching = new Matching();
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
            .andExpect(jsonPath("$.[*].id").value(hasItem(matching.getId().intValue())));
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
            .andExpect(jsonPath("$.id").value(matching.getId().intValue()));
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

        restMatchingMockMvc.perform(put("/api/matchings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatching)))
            .andExpect(status().isOk());

        // Validate the Matching in the database
        List<Matching> matchingList = matchingRepository.findAll();
        assertThat(matchingList).hasSize(databaseSizeBeforeUpdate);
        Matching testMatching = matchingList.get(matchingList.size() - 1);
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
        Matching matching1 = new Matching();
        matching1.setId(1L);
        Matching matching2 = new Matching();
        matching2.setId(matching1.getId());
        assertThat(matching1).isEqualTo(matching2);
        matching2.setId(2L);
        assertThat(matching1).isNotEqualTo(matching2);
        matching1.setId(null);
        assertThat(matching1).isNotEqualTo(matching2);
    }
}
