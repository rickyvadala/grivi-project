package com.growts.grivi.web.rest;

import com.growts.grivi.GriviApp;
import com.growts.grivi.domain.ReviewQuestion;
import com.growts.grivi.repository.ReviewQuestionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReviewQuestionResource} REST controller.
 */
@SpringBootTest(classes = GriviApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReviewQuestionResourceIT {

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private ReviewQuestionRepository reviewQuestionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReviewQuestionMockMvc;

    private ReviewQuestion reviewQuestion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReviewQuestion createEntity(EntityManager em) {
        ReviewQuestion reviewQuestion = new ReviewQuestion()
            .enabled(DEFAULT_ENABLED);
        return reviewQuestion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReviewQuestion createUpdatedEntity(EntityManager em) {
        ReviewQuestion reviewQuestion = new ReviewQuestion()
            .enabled(UPDATED_ENABLED);
        return reviewQuestion;
    }

    @BeforeEach
    public void initTest() {
        reviewQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createReviewQuestion() throws Exception {
        int databaseSizeBeforeCreate = reviewQuestionRepository.findAll().size();
        // Create the ReviewQuestion
        restReviewQuestionMockMvc.perform(post("/api/review-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reviewQuestion)))
            .andExpect(status().isCreated());

        // Validate the ReviewQuestion in the database
        List<ReviewQuestion> reviewQuestionList = reviewQuestionRepository.findAll();
        assertThat(reviewQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        ReviewQuestion testReviewQuestion = reviewQuestionList.get(reviewQuestionList.size() - 1);
        assertThat(testReviewQuestion.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createReviewQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reviewQuestionRepository.findAll().size();

        // Create the ReviewQuestion with an existing ID
        reviewQuestion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReviewQuestionMockMvc.perform(post("/api/review-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reviewQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the ReviewQuestion in the database
        List<ReviewQuestion> reviewQuestionList = reviewQuestionRepository.findAll();
        assertThat(reviewQuestionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReviewQuestions() throws Exception {
        // Initialize the database
        reviewQuestionRepository.saveAndFlush(reviewQuestion);

        // Get all the reviewQuestionList
        restReviewQuestionMockMvc.perform(get("/api/review-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reviewQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getReviewQuestion() throws Exception {
        // Initialize the database
        reviewQuestionRepository.saveAndFlush(reviewQuestion);

        // Get the reviewQuestion
        restReviewQuestionMockMvc.perform(get("/api/review-questions/{id}", reviewQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reviewQuestion.getId().intValue()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingReviewQuestion() throws Exception {
        // Get the reviewQuestion
        restReviewQuestionMockMvc.perform(get("/api/review-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReviewQuestion() throws Exception {
        // Initialize the database
        reviewQuestionRepository.saveAndFlush(reviewQuestion);

        int databaseSizeBeforeUpdate = reviewQuestionRepository.findAll().size();

        // Update the reviewQuestion
        ReviewQuestion updatedReviewQuestion = reviewQuestionRepository.findById(reviewQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedReviewQuestion are not directly saved in db
        em.detach(updatedReviewQuestion);
        updatedReviewQuestion
            .enabled(UPDATED_ENABLED);

        restReviewQuestionMockMvc.perform(put("/api/review-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReviewQuestion)))
            .andExpect(status().isOk());

        // Validate the ReviewQuestion in the database
        List<ReviewQuestion> reviewQuestionList = reviewQuestionRepository.findAll();
        assertThat(reviewQuestionList).hasSize(databaseSizeBeforeUpdate);
        ReviewQuestion testReviewQuestion = reviewQuestionList.get(reviewQuestionList.size() - 1);
        assertThat(testReviewQuestion.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingReviewQuestion() throws Exception {
        int databaseSizeBeforeUpdate = reviewQuestionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReviewQuestionMockMvc.perform(put("/api/review-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reviewQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the ReviewQuestion in the database
        List<ReviewQuestion> reviewQuestionList = reviewQuestionRepository.findAll();
        assertThat(reviewQuestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReviewQuestion() throws Exception {
        // Initialize the database
        reviewQuestionRepository.saveAndFlush(reviewQuestion);

        int databaseSizeBeforeDelete = reviewQuestionRepository.findAll().size();

        // Delete the reviewQuestion
        restReviewQuestionMockMvc.perform(delete("/api/review-questions/{id}", reviewQuestion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReviewQuestion> reviewQuestionList = reviewQuestionRepository.findAll();
        assertThat(reviewQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
