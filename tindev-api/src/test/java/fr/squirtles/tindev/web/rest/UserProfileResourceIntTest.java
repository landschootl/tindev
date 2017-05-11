package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.Userprofile;
import fr.squirtles.tindev.repository.UserprofileRepository;
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
 * Test class for the UserprofileResource REST controller.
 *
 * @see UserprofileResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class UserprofileResourceIntTest {

    private static final String DEFAULT_FIRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PHOTO_URL = "AAAAAAAAAA";
    private static final String UPDATED_PHOTO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    @Autowired
    private UserprofileRepository userprofileRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserprofileMockMvc;

    private Userprofile userprofile;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserprofileResource userprofileResource = new UserprofileResource(userprofileRepository);
        this.restUserprofileMockMvc = MockMvcBuilders.standaloneSetup(userprofileResource)
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
    public static Userprofile createEntity(EntityManager em) {
        Userprofile userprofile = new Userprofile()
            .firstname(DEFAULT_FIRSTNAME)
            .lastname(DEFAULT_LASTNAME)
            .description(DEFAULT_DESCRIPTION)
            .photoUrl(DEFAULT_PHOTO_URL)
            .city(DEFAULT_CITY);
        return userprofile;
    }

    @Before
    public void initTest() {
        userprofile = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserprofile() throws Exception {
        int databaseSizeBeforeCreate = userprofileRepository.findAll().size();

        // Create the Userprofile
        restUserprofileMockMvc.perform(post("/api/userprofiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userprofile)))
            .andExpect(status().isCreated());

        // Validate the Userprofile in the database
        List<Userprofile> userprofileList = userprofileRepository.findAll();
        assertThat(userprofileList).hasSize(databaseSizeBeforeCreate + 1);
        Userprofile testUserprofile = userprofileList.get(userprofileList.size() - 1);
        assertThat(testUserprofile.getFirstname()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testUserprofile.getLastname()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testUserprofile.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUserprofile.getPhotoUrl()).isEqualTo(DEFAULT_PHOTO_URL);
        assertThat(testUserprofile.getCity()).isEqualTo(DEFAULT_CITY);
    }

    @Test
    @Transactional
    public void createUserprofileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userprofileRepository.findAll().size();

        // Create the Userprofile with an existing ID
        userprofile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserprofileMockMvc.perform(post("/api/userprofiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userprofile)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Userprofile> userprofileList = userprofileRepository.findAll();
        assertThat(userprofileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserprofiles() throws Exception {
        // Initialize the database
        userprofileRepository.saveAndFlush(userprofile);

        // Get all the userprofileList
        restUserprofileMockMvc.perform(get("/api/userprofiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userprofile.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstname").value(hasItem(DEFAULT_FIRSTNAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].photoUrl").value(hasItem(DEFAULT_PHOTO_URL.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())));
    }

    @Test
    @Transactional
    public void getUserprofile() throws Exception {
        // Initialize the database
        userprofileRepository.saveAndFlush(userprofile);

        // Get the userprofile
        restUserprofileMockMvc.perform(get("/api/userprofiles/{id}", userprofile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userprofile.getId().intValue()))
            .andExpect(jsonPath("$.firstname").value(DEFAULT_FIRSTNAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.photoUrl").value(DEFAULT_PHOTO_URL.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserprofile() throws Exception {
        // Get the userprofile
        restUserprofileMockMvc.perform(get("/api/userprofiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserprofile() throws Exception {
        // Initialize the database
        userprofileRepository.saveAndFlush(userprofile);
        int databaseSizeBeforeUpdate = userprofileRepository.findAll().size();

        // Update the userprofile
        Userprofile updatedUserprofile = userprofileRepository.findOne(userprofile.getId());
        updatedUserprofile
            .firstname(UPDATED_FIRSTNAME)
            .lastname(UPDATED_LASTNAME)
            .description(UPDATED_DESCRIPTION)
            .photoUrl(UPDATED_PHOTO_URL)
            .city(UPDATED_CITY);

        restUserprofileMockMvc.perform(put("/api/userprofiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserprofile)))
            .andExpect(status().isOk());

        // Validate the Userprofile in the database
        List<Userprofile> userprofileList = userprofileRepository.findAll();
        assertThat(userprofileList).hasSize(databaseSizeBeforeUpdate);
        Userprofile testUserprofile = userprofileList.get(userprofileList.size() - 1);
        assertThat(testUserprofile.getFirstname()).isEqualTo(UPDATED_FIRSTNAME);
        assertThat(testUserprofile.getLastname()).isEqualTo(UPDATED_LASTNAME);
        assertThat(testUserprofile.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUserprofile.getPhotoUrl()).isEqualTo(UPDATED_PHOTO_URL);
        assertThat(testUserprofile.getCity()).isEqualTo(UPDATED_CITY);
    }

    @Test
    @Transactional
    public void updateNonExistingUserprofile() throws Exception {
        int databaseSizeBeforeUpdate = userprofileRepository.findAll().size();

        // Create the Userprofile

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserprofileMockMvc.perform(put("/api/userprofiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userprofile)))
            .andExpect(status().isCreated());

        // Validate the Userprofile in the database
        List<Userprofile> userprofileList = userprofileRepository.findAll();
        assertThat(userprofileList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserprofile() throws Exception {
        // Initialize the database
        userprofileRepository.saveAndFlush(userprofile);
        int databaseSizeBeforeDelete = userprofileRepository.findAll().size();

        // Get the userprofile
        restUserprofileMockMvc.perform(delete("/api/userprofiles/{id}", userprofile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Userprofile> userprofileList = userprofileRepository.findAll();
        assertThat(userprofileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Userprofile.class);
    }
}
