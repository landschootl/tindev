package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.Freelance;
import fr.squirtles.tindev.repository.FreelanceRepository;
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
 * Test class for the FreelanceResource REST controller.
 *
 * @see FreelanceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class FreelanceResourceIntTest {

    private static final Integer DEFAULT_DAILY_PRICE = 1;
    private static final Integer UPDATED_DAILY_PRICE = 2;

    private static final LocalDate DEFAULT_BIRTHDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTHDATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_ID_USER = 1L;
    private static final Long UPDATED_ID_USER = 2L;

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

    private MockMvc restFreelanceMockMvc;

    private Freelance freelance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        FreelanceResource freelanceResource = new FreelanceResource(freelanceRepository);
        this.restFreelanceMockMvc = MockMvcBuilders.standaloneSetup(freelanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Freelance createEntity(EntityManager em) {
        Freelance freelance = new Freelance()
            .dailyPrice(DEFAULT_DAILY_PRICE)
            .birthdate(DEFAULT_BIRTHDATE)
            .idUser(DEFAULT_ID_USER);
        return freelance;
    }

    @Before
    public void initTest() {
        freelance = createEntity(em);
    }

    @Test
    @Transactional
    public void createFreelance() throws Exception {
        int databaseSizeBeforeCreate = freelanceRepository.findAll().size();

        // Create the Freelance
        restFreelanceMockMvc.perform(post("/api/freelances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelance)))
            .andExpect(status().isCreated());

        // Validate the Freelance in the database
        List<Freelance> freelanceList = freelanceRepository.findAll();
        assertThat(freelanceList).hasSize(databaseSizeBeforeCreate + 1);
        Freelance testFreelance = freelanceList.get(freelanceList.size() - 1);
        assertThat(testFreelance.getDailyPrice()).isEqualTo(DEFAULT_DAILY_PRICE);
        assertThat(testFreelance.getBirthdate()).isEqualTo(DEFAULT_BIRTHDATE);
        assertThat(testFreelance.getIdUser()).isEqualTo(DEFAULT_ID_USER);
    }

    @Test
    @Transactional
    public void createFreelanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = freelanceRepository.findAll().size();

        // Create the Freelance with an existing ID
        freelance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFreelanceMockMvc.perform(post("/api/freelances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelance)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Freelance> freelanceList = freelanceRepository.findAll();
        assertThat(freelanceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = freelanceRepository.findAll().size();
        // set the field null
        freelance.setIdUser(null);

        // Create the Freelance, which fails.

        restFreelanceMockMvc.perform(post("/api/freelances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelance)))
            .andExpect(status().isBadRequest());

        List<Freelance> freelanceList = freelanceRepository.findAll();
        assertThat(freelanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFreelances() throws Exception {
        // Initialize the database
        freelanceRepository.saveAndFlush(freelance);

        // Get all the freelanceList
        restFreelanceMockMvc.perform(get("/api/freelances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(freelance.getId().intValue())))
            .andExpect(jsonPath("$.[*].dailyPrice").value(hasItem(DEFAULT_DAILY_PRICE)))
            .andExpect(jsonPath("$.[*].birthdate").value(hasItem(DEFAULT_BIRTHDATE.toString())))
            .andExpect(jsonPath("$.[*].idUser").value(hasItem(DEFAULT_ID_USER.intValue())));
    }

    @Test
    @Transactional
    public void getFreelance() throws Exception {
        // Initialize the database
        freelanceRepository.saveAndFlush(freelance);

        // Get the freelance
        restFreelanceMockMvc.perform(get("/api/freelances/{id}", freelance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(freelance.getId().intValue()))
            .andExpect(jsonPath("$.dailyPrice").value(DEFAULT_DAILY_PRICE))
            .andExpect(jsonPath("$.birthdate").value(DEFAULT_BIRTHDATE.toString()))
            .andExpect(jsonPath("$.idUser").value(DEFAULT_ID_USER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFreelance() throws Exception {
        // Get the freelance
        restFreelanceMockMvc.perform(get("/api/freelances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFreelance() throws Exception {
        // Initialize the database
        freelanceRepository.saveAndFlush(freelance);
        int databaseSizeBeforeUpdate = freelanceRepository.findAll().size();

        // Update the freelance
        Freelance updatedFreelance = freelanceRepository.findOne(freelance.getId());
        updatedFreelance
            .dailyPrice(UPDATED_DAILY_PRICE)
            .birthdate(UPDATED_BIRTHDATE)
            .idUser(UPDATED_ID_USER);

        restFreelanceMockMvc.perform(put("/api/freelances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFreelance)))
            .andExpect(status().isOk());

        // Validate the Freelance in the database
        List<Freelance> freelanceList = freelanceRepository.findAll();
        assertThat(freelanceList).hasSize(databaseSizeBeforeUpdate);
        Freelance testFreelance = freelanceList.get(freelanceList.size() - 1);
        assertThat(testFreelance.getDailyPrice()).isEqualTo(UPDATED_DAILY_PRICE);
        assertThat(testFreelance.getBirthdate()).isEqualTo(UPDATED_BIRTHDATE);
        assertThat(testFreelance.getIdUser()).isEqualTo(UPDATED_ID_USER);
    }

    @Test
    @Transactional
    public void updateNonExistingFreelance() throws Exception {
        int databaseSizeBeforeUpdate = freelanceRepository.findAll().size();

        // Create the Freelance

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFreelanceMockMvc.perform(put("/api/freelances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(freelance)))
            .andExpect(status().isCreated());

        // Validate the Freelance in the database
        List<Freelance> freelanceList = freelanceRepository.findAll();
        assertThat(freelanceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFreelance() throws Exception {
        // Initialize the database
        freelanceRepository.saveAndFlush(freelance);
        int databaseSizeBeforeDelete = freelanceRepository.findAll().size();

        // Get the freelance
        restFreelanceMockMvc.perform(delete("/api/freelances/{id}", freelance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Freelance> freelanceList = freelanceRepository.findAll();
        assertThat(freelanceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Freelance.class);
    }
}
