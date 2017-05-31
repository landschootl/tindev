package fr.squirtles.tindev.web.rest;

import fr.squirtles.tindev.TindevApp;

import fr.squirtles.tindev.domain.Discussion;
import fr.squirtles.tindev.repository.DiscussionRepository;
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
 * Test class for the DiscussionResource REST controller.
 *
 * @see DiscussionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TindevApp.class)
public class DiscussionResourceIntTest {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiscussionMockMvc;

    private Discussion discussion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DiscussionResource discussionResource = new DiscussionResource(discussionRepository);
        this.restDiscussionMockMvc = MockMvcBuilders.standaloneSetup(discussionResource)
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
    public static Discussion createEntity(EntityManager em) {
        Discussion discussion = new Discussion();
        return discussion;
    }

    @Before
    public void initTest() {
        discussion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiscussion() throws Exception {
        int databaseSizeBeforeCreate = discussionRepository.findAll().size();

        // Create the Discussion
        restDiscussionMockMvc.perform(post("/api/discussions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discussion)))
            .andExpect(status().isCreated());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeCreate + 1);
        Discussion testDiscussion = discussionList.get(discussionList.size() - 1);
    }

    @Test
    @Transactional
    public void createDiscussionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = discussionRepository.findAll().size();

        // Create the Discussion with an existing ID
        discussion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiscussionMockMvc.perform(post("/api/discussions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discussion)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDiscussions() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);

        // Get all the discussionList
        restDiscussionMockMvc.perform(get("/api/discussions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(discussion.getId().intValue())));
    }

    @Test
    @Transactional
    public void getDiscussion() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);

        // Get the discussion
        restDiscussionMockMvc.perform(get("/api/discussions/{id}", discussion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(discussion.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDiscussion() throws Exception {
        // Get the discussion
        restDiscussionMockMvc.perform(get("/api/discussions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiscussion() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);
        int databaseSizeBeforeUpdate = discussionRepository.findAll().size();

        // Update the discussion
        Discussion updatedDiscussion = discussionRepository.findOne(discussion.getId());

        restDiscussionMockMvc.perform(put("/api/discussions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiscussion)))
            .andExpect(status().isOk());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeUpdate);
        Discussion testDiscussion = discussionList.get(discussionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDiscussion() throws Exception {
        int databaseSizeBeforeUpdate = discussionRepository.findAll().size();

        // Create the Discussion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDiscussionMockMvc.perform(put("/api/discussions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discussion)))
            .andExpect(status().isCreated());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDiscussion() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);
        int databaseSizeBeforeDelete = discussionRepository.findAll().size();

        // Get the discussion
        restDiscussionMockMvc.perform(delete("/api/discussions/{id}", discussion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Discussion.class);
        Discussion discussion1 = new Discussion();
        discussion1.setId(1L);
        Discussion discussion2 = new Discussion();
        discussion2.setId(discussion1.getId());
        assertThat(discussion1).isEqualTo(discussion2);
        discussion2.setId(2L);
        assertThat(discussion1).isNotEqualTo(discussion2);
        discussion1.setId(null);
        assertThat(discussion1).isNotEqualTo(discussion2);
    }
}
