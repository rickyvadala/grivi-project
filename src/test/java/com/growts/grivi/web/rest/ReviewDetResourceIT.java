package com.growts.grivi.web.rest;

import com.growts.grivi.GriviApp;
import com.growts.grivi.domain.ReviewDet;
import com.growts.grivi.repository.ReviewDetRepository;

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
 * Integration tests for the {@link ReviewDetResource} REST controller.
 */
@SpringBootTest(classes = GriviApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReviewDetResourceIT {

    private static final Long DEFAULT_RATE = 1L;
    private static final Long UPDATED_RATE = 2L;

    @Autowired
    private ReviewDetRepository reviewDetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReviewDetMockMvc;

    private ReviewDet reviewDet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReviewDet createEntity(EntityManager em) {
        ReviewDet reviewDet = new ReviewDet()
            .rate(DEFAULT_RATE);
        return reviewDet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReviewDet createUpdatedEntity(EntityManager em) {
        ReviewDet reviewDet = new ReviewDet()
            .rate(UPDATED_RATE);
        return reviewDet;
    }

    @BeforeEach
    public void initTest() {
        reviewDet = createEntity(em);
    }

    @Test
    @Transactional
    public void createReviewDet() throws Exception {
        int databaseSizeBeforeCreate = reviewDetRepository.findAll().size();
        // Create the ReviewDet
        restReviewDetMockMvc.perform(post("/api/review-dets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reviewDet)))
            .andExpect(status().isCreated());

        // Validate the ReviewDet in the database
        List<ReviewDet> reviewDetList = reviewDetRepository.findAll();
        assertThat(reviewDetList).hasSize(databaseSizeBeforeCreate + 1);
        ReviewDet testReviewDet = reviewDetList.get(reviewDetList.size() - 1);
        assertThat(testReviewDet.getRate()).isEqualTo(DEFAULT_RATE);
    }

    @Test
    @Transactional
    public void createReviewDetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reviewDetRepository.findAll().size();

        // Create the ReviewDet with an existing ID
        reviewDet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReviewDetMockMvc.perform(post("/api/review-dets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reviewDet)))
            .andExpect(status().isBadRequest());

        // Validate the ReviewDet in the database
        List<ReviewDet> reviewDetList = reviewDetRepository.findAll();
        assertThat(reviewDetList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReviewDets() throws Exception {
        // Initialize the database
        reviewDetRepository.saveAndFlush(reviewDet);

        // Get all the reviewDetList
        restReviewDetMockMvc.perform(get("/api/review-dets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reviewDet.getId().intValue())))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE.intValue())));
    }
    
    @Test
    @Transactional
    public void getReviewDet() throws Exception {
        // Initialize the database
        reviewDetRepository.saveAndFlush(reviewDet);

        // Get the reviewDet
        restReviewDetMockMvc.perform(get("/api/review-dets/{id}", reviewDet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reviewDet.getId().intValue()))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingReviewDet() throws Exception {
        // Get the reviewDet
        restReviewDetMockMvc.perform(get("/api/review-dets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReviewDet() throws Exception {
        // Initialize the database
        reviewDetRepository.saveAndFlush(reviewDet);

        int databaseSizeBeforeUpdate = reviewDetRepository.findAll().size();

        // Update the reviewDet
        ReviewDet updatedReviewDet = reviewDetRepository.findById(reviewDet.getId()).get();
        // Disconnect from session so that the updates on updatedReviewDet are not directly saved in db
        em.detach(updatedReviewDet);
        updatedReviewDet
            .rate(UPDATED_RATE);

        restReviewDetMockMvc.perform(put("/api/review-dets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReviewDet)))
            .andExpect(status().isOk());

        // Validate the ReviewDet in the database
        List<ReviewDet> reviewDetList = reviewDetRepository.findAll();
        assertThat(reviewDetList).hasSize(databaseSizeBeforeUpdate);
        ReviewDet testReviewDet = reviewDetList.get(reviewDetList.size() - 1);
        assertThat(testReviewDet.getRate()).isEqualTo(UPDATED_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingReviewDet() throws Exception {
        int databaseSizeBeforeUpdate = reviewDetRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReviewDetMockMvc.perform(put("/api/review-dets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reviewDet)))
            .andExpect(status().isBadRequest());

        // Validate the ReviewDet in the database
        List<ReviewDet> reviewDetList = reviewDetRepository.findAll();
        assertThat(reviewDetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReviewDet() throws Exception {
        // Initialize the database
        reviewDetRepository.saveAndFlush(reviewDet);

        int databaseSizeBeforeDelete = reviewDetRepository.findAll().size();

        // Delete the reviewDet
        restReviewDetMockMvc.perform(delete("/api/review-dets/{id}", reviewDet.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReviewDet> reviewDetList = reviewDetRepository.findAll();
        assertThat(reviewDetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
