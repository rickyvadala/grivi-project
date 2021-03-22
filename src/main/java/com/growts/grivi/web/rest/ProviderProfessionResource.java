package com.growts.grivi.web.rest;

import com.growts.grivi.domain.ProviderProfession;
import com.growts.grivi.repository.ProviderProfessionRepository;
import com.growts.grivi.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.growts.grivi.domain.ProviderProfession}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProviderProfessionResource {

    private final Logger log = LoggerFactory.getLogger(ProviderProfessionResource.class);

    private static final String ENTITY_NAME = "providerProfession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProviderProfessionRepository providerProfessionRepository;

    public ProviderProfessionResource(ProviderProfessionRepository providerProfessionRepository) {
        this.providerProfessionRepository = providerProfessionRepository;
    }

    /**
     * {@code POST  /provider-professions} : Create a new providerProfession.
     *
     * @param providerProfession the providerProfession to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new providerProfession, or with status {@code 400 (Bad Request)} if the providerProfession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/provider-professions")
    public ResponseEntity<ProviderProfession> createProviderProfession(@RequestBody ProviderProfession providerProfession) throws URISyntaxException {
        log.debug("REST request to save ProviderProfession : {}", providerProfession);
        if (providerProfession.getId() != null) {
            throw new BadRequestAlertException("A new providerProfession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProviderProfession result = providerProfessionRepository.save(providerProfession);
        return ResponseEntity.created(new URI("/api/provider-professions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /provider-professions} : Updates an existing providerProfession.
     *
     * @param providerProfession the providerProfession to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated providerProfession,
     * or with status {@code 400 (Bad Request)} if the providerProfession is not valid,
     * or with status {@code 500 (Internal Server Error)} if the providerProfession couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/provider-professions")
    public ResponseEntity<ProviderProfession> updateProviderProfession(@RequestBody ProviderProfession providerProfession) throws URISyntaxException {
        log.debug("REST request to update ProviderProfession : {}", providerProfession);
        if (providerProfession.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProviderProfession result = providerProfessionRepository.save(providerProfession);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, providerProfession.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /provider-professions} : get all the providerProfessions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of providerProfessions in body.
     */
    @GetMapping("/provider-professions")
    public List<ProviderProfession> getAllProviderProfessions() {
        log.debug("REST request to get all ProviderProfessions");
        return providerProfessionRepository.findAll();
    }

    /**
     * {@code GET  /provider-professions/:id} : get the "id" providerProfession.
     *
     * @param id the id of the providerProfession to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the providerProfession, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/provider-professions/{id}")
    public ResponseEntity<ProviderProfession> getProviderProfession(@PathVariable Long id) {
        log.debug("REST request to get ProviderProfession : {}", id);
        Optional<ProviderProfession> providerProfession = providerProfessionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(providerProfession);
    }

    /**
     * {@code DELETE  /provider-professions/:id} : delete the "id" providerProfession.
     *
     * @param id the id of the providerProfession to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/provider-professions/{id}")
    public ResponseEntity<Void> deleteProviderProfession(@PathVariable Long id) {
        log.debug("REST request to delete ProviderProfession : {}", id);
        providerProfessionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
