package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.Recruiter;
import fr.squirtles.tindev.repository.RecruiterRepository;
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
 * Test class for the RecruiterResource REST controller.
 *
 * @see RecruiterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class RecruiterResourceIntTest {

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final Long DEFAULT_ID_USER = 1L;
    private static final Long UPDATED_ID_USER = 2L;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRecruiterMockMvc;

    private Recruiter recruiter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RecruiterResource recruiterResource = new RecruiterResource(recruiterRepository);
        this.restRecruiterMockMvc = MockMvcBuilders.standaloneSetup(recruiterResource)
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
    public static Recruiter createEntity(EntityManager em) {
        Recruiter recruiter = new Recruiter()
            .company(DEFAULT_COMPANY)
            .idUser(DEFAULT_ID_USER);
        return recruiter;
    }

    @Before
    public void initTest() {
        recruiter = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecruiter() throws Exception {
        int databaseSizeBeforeCreate = recruiterRepository.findAll().size();

        // Create the Recruiter
        restRecruiterMockMvc.perform(post("/api/recruiters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recruiter)))
            .andExpect(status().isCreated());

        // Validate the Recruiter in the database
        List<Recruiter> recruiterList = recruiterRepository.findAll();
        assertThat(recruiterList).hasSize(databaseSizeBeforeCreate + 1);
        Recruiter testRecruiter = recruiterList.get(recruiterList.size() - 1);
        assertThat(testRecruiter.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testRecruiter.getIdUser()).isEqualTo(DEFAULT_ID_USER);
    }

    @Test
    @Transactional
    public void createRecruiterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recruiterRepository.findAll().size();

        // Create the Recruiter with an existing ID
        recruiter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecruiterMockMvc.perform(post("/api/recruiters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recruiter)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Recruiter> recruiterList = recruiterRepository.findAll();
        assertThat(recruiterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = recruiterRepository.findAll().size();
        // set the field null
        recruiter.setIdUser(null);

        // Create the Recruiter, which fails.

        restRecruiterMockMvc.perform(post("/api/recruiters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recruiter)))
            .andExpect(status().isBadRequest());

        List<Recruiter> recruiterList = recruiterRepository.findAll();
        assertThat(recruiterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecruiters() throws Exception {
        // Initialize the database
        recruiterRepository.saveAndFlush(recruiter);

        // Get all the recruiterList
        restRecruiterMockMvc.perform(get("/api/recruiters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recruiter.getId().intValue())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].idUser").value(hasItem(DEFAULT_ID_USER.intValue())));
    }

    @Test
    @Transactional
    public void getRecruiter() throws Exception {
        // Initialize the database
        recruiterRepository.saveAndFlush(recruiter);

        // Get the recruiter
        restRecruiterMockMvc.perform(get("/api/recruiters/{id}", recruiter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recruiter.getId().intValue()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.idUser").value(DEFAULT_ID_USER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecruiter() throws Exception {
        // Get the recruiter
        restRecruiterMockMvc.perform(get("/api/recruiters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecruiter() throws Exception {
        // Initialize the database
        recruiterRepository.saveAndFlush(recruiter);
        int databaseSizeBeforeUpdate = recruiterRepository.findAll().size();

        // Update the recruiter
        Recruiter updatedRecruiter = recruiterRepository.findOne(recruiter.getId());
        updatedRecruiter
            .company(UPDATED_COMPANY)
            .idUser(UPDATED_ID_USER);

        restRecruiterMockMvc.perform(put("/api/recruiters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecruiter)))
            .andExpect(status().isOk());

        // Validate the Recruiter in the database
        List<Recruiter> recruiterList = recruiterRepository.findAll();
        assertThat(recruiterList).hasSize(databaseSizeBeforeUpdate);
        Recruiter testRecruiter = recruiterList.get(recruiterList.size() - 1);
        assertThat(testRecruiter.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testRecruiter.getIdUser()).isEqualTo(UPDATED_ID_USER);
    }

    @Test
    @Transactional
    public void updateNonExistingRecruiter() throws Exception {
        int databaseSizeBeforeUpdate = recruiterRepository.findAll().size();

        // Create the Recruiter

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRecruiterMockMvc.perform(put("/api/recruiters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recruiter)))
            .andExpect(status().isCreated());

        // Validate the Recruiter in the database
        List<Recruiter> recruiterList = recruiterRepository.findAll();
        assertThat(recruiterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRecruiter() throws Exception {
        // Initialize the database
        recruiterRepository.saveAndFlush(recruiter);
        int databaseSizeBeforeDelete = recruiterRepository.findAll().size();

        // Get the recruiter
        restRecruiterMockMvc.perform(delete("/api/recruiters/{id}", recruiter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Recruiter> recruiterList = recruiterRepository.findAll();
        assertThat(recruiterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recruiter.class);
    }
}
