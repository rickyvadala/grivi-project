package com.growts.grivi.web.rest;

import com.growts.grivi.domain.ReviewDet;
import com.growts.grivi.repository.ReviewDetRepository;
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
 * REST controller for managing {@link com.growts.grivi.domain.ReviewDet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReviewDetResource {

    private final Logger log = LoggerFactory.getLogger(ReviewDetResource.class);

    private static final String ENTITY_NAME = "reviewDet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReviewDetRepository reviewDetRepository;

    public ReviewDetResource(ReviewDetRepository reviewDetRepository) {
        this.reviewDetRepository = reviewDetRepository;
    }

    /**
     * {@code POST  /review-dets} : Create a new reviewDet.
     *
     * @param reviewDet the reviewDet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reviewDet, or with status {@code 400 (Bad Request)} if the reviewDet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/review-dets")
    public ResponseEntity<ReviewDet> createReviewDet(@RequestBody ReviewDet reviewDet) throws URISyntaxException {
        log.debug("REST request to save ReviewDet : {}", reviewDet);
        if (reviewDet.getId() != null) {
            throw new BadRequestAlertException("A new reviewDet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReviewDet result = reviewDetRepository.save(reviewDet);
        return ResponseEntity.created(new URI("/api/review-dets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /review-dets} : Updates an existing reviewDet.
     *
     * @param reviewDet the reviewDet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reviewDet,
     * or with status {@code 400 (Bad Request)} if the reviewDet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reviewDet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/review-dets")
    public ResponseEntity<ReviewDet> updateReviewDet(@RequestBody ReviewDet reviewDet) throws URISyntaxException {
        log.debug("REST request to update ReviewDet : {}", reviewDet);
        if (reviewDet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReviewDet result = reviewDetRepository.save(reviewDet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reviewDet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /review-dets} : get all the reviewDets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reviewDets in body.
     */
    @GetMapping("/review-dets")
    public List<ReviewDet> getAllReviewDets() {
        log.debug("REST request to get all ReviewDets");
        return reviewDetRepository.findAll();
    }

    /**
     * {@code GET  /review-dets/:id} : get the "id" reviewDet.
     *
     * @param id the id of the reviewDet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reviewDet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/review-dets/{id}")
    public ResponseEntity<ReviewDet> getReviewDet(@PathVariable Long id) {
        log.debug("REST request to get ReviewDet : {}", id);
        Optional<ReviewDet> reviewDet = reviewDetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reviewDet);
    }

    /**
     * {@code DELETE  /review-dets/:id} : delete the "id" reviewDet.
     *
     * @param id the id of the reviewDet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/review-dets/{id}")
    public ResponseEntity<Void> deleteReviewDet(@PathVariable Long id) {
        log.debug("REST request to delete ReviewDet : {}", id);
        reviewDetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
