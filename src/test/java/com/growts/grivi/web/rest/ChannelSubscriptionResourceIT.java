package com.growts.grivi.web.rest;

import com.growts.grivi.GriviApp;
import com.growts.grivi.domain.ChannelSubscription;
import com.growts.grivi.repository.ChannelSubscriptionRepository;

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
 * Integration tests for the {@link ChannelSubscriptionResource} REST controller.
 */
@SpringBootTest(classes = GriviApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ChannelSubscriptionResourceIT {

    @Autowired
    private ChannelSubscriptionRepository channelSubscriptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChannelSubscriptionMockMvc;

    private ChannelSubscription channelSubscription;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChannelSubscription createEntity(EntityManager em) {
        ChannelSubscription channelSubscription = new ChannelSubscription();
        return channelSubscription;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChannelSubscription createUpdatedEntity(EntityManager em) {
        ChannelSubscription channelSubscription = new ChannelSubscription();
        return channelSubscription;
    }

    @BeforeEach
    public void initTest() {
        channelSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createChannelSubscription() throws Exception {
        int databaseSizeBeforeCreate = channelSubscriptionRepository.findAll().size();
        // Create the ChannelSubscription
        restChannelSubscriptionMockMvc.perform(post("/api/channel-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(channelSubscription)))
            .andExpect(status().isCreated());

        // Validate the ChannelSubscription in the database
        List<ChannelSubscription> channelSubscriptionList = channelSubscriptionRepository.findAll();
        assertThat(channelSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        ChannelSubscription testChannelSubscription = channelSubscriptionList.get(channelSubscriptionList.size() - 1);
    }

    @Test
    @Transactional
    public void createChannelSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = channelSubscriptionRepository.findAll().size();

        // Create the ChannelSubscription with an existing ID
        channelSubscription.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChannelSubscriptionMockMvc.perform(post("/api/channel-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(channelSubscription)))
            .andExpect(status().isBadRequest());

        // Validate the ChannelSubscription in the database
        List<ChannelSubscription> channelSubscriptionList = channelSubscriptionRepository.findAll();
        assertThat(channelSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChannelSubscriptions() throws Exception {
        // Initialize the database
        channelSubscriptionRepository.saveAndFlush(channelSubscription);

        // Get all the channelSubscriptionList
        restChannelSubscriptionMockMvc.perform(get("/api/channel-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(channelSubscription.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getChannelSubscription() throws Exception {
        // Initialize the database
        channelSubscriptionRepository.saveAndFlush(channelSubscription);

        // Get the channelSubscription
        restChannelSubscriptionMockMvc.perform(get("/api/channel-subscriptions/{id}", channelSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(channelSubscription.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingChannelSubscription() throws Exception {
        // Get the channelSubscription
        restChannelSubscriptionMockMvc.perform(get("/api/channel-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChannelSubscription() throws Exception {
        // Initialize the database
        channelSubscriptionRepository.saveAndFlush(channelSubscription);

        int databaseSizeBeforeUpdate = channelSubscriptionRepository.findAll().size();

        // Update the channelSubscription
        ChannelSubscription updatedChannelSubscription = channelSubscriptionRepository.findById(channelSubscription.getId()).get();
        // Disconnect from session so that the updates on updatedChannelSubscription are not directly saved in db
        em.detach(updatedChannelSubscription);

        restChannelSubscriptionMockMvc.perform(put("/api/channel-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedChannelSubscription)))
            .andExpect(status().isOk());

        // Validate the ChannelSubscription in the database
        List<ChannelSubscription> channelSubscriptionList = channelSubscriptionRepository.findAll();
        assertThat(channelSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        ChannelSubscription testChannelSubscription = channelSubscriptionList.get(channelSubscriptionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingChannelSubscription() throws Exception {
        int databaseSizeBeforeUpdate = channelSubscriptionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChannelSubscriptionMockMvc.perform(put("/api/channel-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(channelSubscription)))
            .andExpect(status().isBadRequest());

        // Validate the ChannelSubscription in the database
        List<ChannelSubscription> channelSubscriptionList = channelSubscriptionRepository.findAll();
        assertThat(channelSubscriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChannelSubscription() throws Exception {
        // Initialize the database
        channelSubscriptionRepository.saveAndFlush(channelSubscription);

        int databaseSizeBeforeDelete = channelSubscriptionRepository.findAll().size();

        // Delete the channelSubscription
        restChannelSubscriptionMockMvc.perform(delete("/api/channel-subscriptions/{id}", channelSubscription.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChannelSubscription> channelSubscriptionList = channelSubscriptionRepository.findAll();
        assertThat(channelSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
