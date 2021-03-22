package com.growts.grivi.web.rest;

import com.growts.grivi.GriviApp;
import com.growts.grivi.domain.ProviderProfession;
import com.growts.grivi.repository.ProviderProfessionRepository;

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
 * Integration tests for the {@link ProviderProfessionResource} REST controller.
 */
@SpringBootTest(classes = GriviApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProviderProfessionResourceIT {

    @Autowired
    private ProviderProfessionRepository providerProfessionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProviderProfessionMockMvc;

    private ProviderProfession providerProfession;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProviderProfession createEntity(EntityManager em) {
        ProviderProfession providerProfession = new ProviderProfession();
        return providerProfession;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProviderProfession createUpdatedEntity(EntityManager em) {
        ProviderProfession providerProfession = new ProviderProfession();
        return providerProfession;
    }

    @BeforeEach
    public void initTest() {
        providerProfession = createEntity(em);
    }

    @Test
    @Transactional
    public void createProviderProfession() throws Exception {
        int databaseSizeBeforeCreate = providerProfessionRepository.findAll().size();
        // Create the ProviderProfession
        restProviderProfessionMockMvc.perform(post("/api/provider-professions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(providerProfession)))
            .andExpect(status().isCreated());

        // Validate the ProviderProfession in the database
        List<ProviderProfession> providerProfessionList = providerProfessionRepository.findAll();
        assertThat(providerProfessionList).hasSize(databaseSizeBeforeCreate + 1);
        ProviderProfession testProviderProfession = providerProfessionList.get(providerProfessionList.size() - 1);
    }

    @Test
    @Transactional
    public void createProviderProfessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = providerProfessionRepository.findAll().size();

        // Create the ProviderProfession with an existing ID
        providerProfession.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProviderProfessionMockMvc.perform(post("/api/provider-professions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(providerProfession)))
            .andExpect(status().isBadRequest());

        // Validate the ProviderProfession in the database
        List<ProviderProfession> providerProfessionList = providerProfessionRepository.findAll();
        assertThat(providerProfessionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProviderProfessions() throws Exception {
        // Initialize the database
        providerProfessionRepository.saveAndFlush(providerProfession);

        // Get all the providerProfessionList
        restProviderProfessionMockMvc.perform(get("/api/provider-professions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(providerProfession.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProviderProfession() throws Exception {
        // Initialize the database
        providerProfessionRepository.saveAndFlush(providerProfession);

        // Get the providerProfession
        restProviderProfessionMockMvc.perform(get("/api/provider-professions/{id}", providerProfession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(providerProfession.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProviderProfession() throws Exception {
        // Get the providerProfession
        restProviderProfessionMockMvc.perform(get("/api/provider-professions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProviderProfession() throws Exception {
        // Initialize the database
        providerProfessionRepository.saveAndFlush(providerProfession);

        int databaseSizeBeforeUpdate = providerProfessionRepository.findAll().size();

        // Update the providerProfession
        ProviderProfession updatedProviderProfession = providerProfessionRepository.findById(providerProfession.getId()).get();
        // Disconnect from session so that the updates on updatedProviderProfession are not directly saved in db
        em.detach(updatedProviderProfession);

        restProviderProfessionMockMvc.perform(put("/api/provider-professions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProviderProfession)))
            .andExpect(status().isOk());

        // Validate the ProviderProfession in the database
        List<ProviderProfession> providerProfessionList = providerProfessionRepository.findAll();
        assertThat(providerProfessionList).hasSize(databaseSizeBeforeUpdate);
        ProviderProfession testProviderProfession = providerProfessionList.get(providerProfessionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProviderProfession() throws Exception {
        int databaseSizeBeforeUpdate = providerProfessionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProviderProfessionMockMvc.perform(put("/api/provider-professions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(providerProfession)))
            .andExpect(status().isBadRequest());

        // Validate the ProviderProfession in the database
        List<ProviderProfession> providerProfessionList = providerProfessionRepository.findAll();
        assertThat(providerProfessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProviderProfession() throws Exception {
        // Initialize the database
        providerProfessionRepository.saveAndFlush(providerProfession);

        int databaseSizeBeforeDelete = providerProfessionRepository.findAll().size();

        // Delete the providerProfession
        restProviderProfessionMockMvc.perform(delete("/api/provider-professions/{id}", providerProfession.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProviderProfession> providerProfessionList = providerProfessionRepository.findAll();
        assertThat(providerProfessionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
