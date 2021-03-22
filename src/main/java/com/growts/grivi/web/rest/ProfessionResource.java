package com.growts.grivi.web.rest;

import com.growts.grivi.domain.Profession;
import com.growts.grivi.repository.ProfessionRepository;
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
 * REST controller for managing {@link com.growts.grivi.domain.Profession}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfessionResource {

    private final Logger log = LoggerFactory.getLogger(ProfessionResource.class);

    private static final String ENTITY_NAME = "profession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfessionRepository professionRepository;

    public ProfessionResource(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    /**
     * {@code POST  /professions} : Create a new profession.
     *
     * @param profession the profession to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profession, or with status {@code 400 (Bad Request)} if the profession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/professions")
    public ResponseEntity<Profession> createProfession(@RequestBody Profession profession) throws URISyntaxException {
        log.debug("REST request to save Profession : {}", profession);
        if (profession.getId() != null) {
            throw new BadRequestAlertException("A new profession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profession result = professionRepository.save(profession);
        return ResponseEntity.created(new URI("/api/professions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /professions} : Updates an existing profession.
     *
     * @param profession the profession to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profession,
     * or with status {@code 400 (Bad Request)} if the profession is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profession couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/professions")
    public ResponseEntity<Profession> updateProfession(@RequestBody Profession profession) throws URISyntaxException {
        log.debug("REST request to update Profession : {}", profession);
        if (profession.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profession result = professionRepository.save(profession);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profession.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /professions} : get all the professions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of professions in body.
     */
    @GetMapping("/professions")
    public List<Profession> getAllProfessions() {
        log.debug("REST request to get all Professions");
        return professionRepository.findAll();
    }

    /**
     * {@code GET  /professions/:id} : get the "id" profession.
     *
     * @param id the id of the profession to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profession, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/professions/{id}")
    public ResponseEntity<Profession> getProfession(@PathVariable Long id) {
        log.debug("REST request to get Profession : {}", id);
        Optional<Profession> profession = professionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profession);
    }

    /**
     * {@code DELETE  /professions/:id} : delete the "id" profession.
     *
     * @param id the id of the profession to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/professions/{id}")
    public ResponseEntity<Void> deleteProfession(@PathVariable Long id) {
        log.debug("REST request to delete Profession : {}", id);
        professionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
