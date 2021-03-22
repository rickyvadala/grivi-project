package com.growts.grivi.web.rest;

import com.growts.grivi.domain.ReviewQuestion;
import com.growts.grivi.repository.ReviewQuestionRepository;
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
 * REST controller for managing {@link com.growts.grivi.domain.ReviewQuestion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReviewQuestionResource {

    private final Logger log = LoggerFactory.getLogger(ReviewQuestionResource.class);

    private static final String ENTITY_NAME = "reviewQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReviewQuestionRepository reviewQuestionRepository;

    public ReviewQuestionResource(ReviewQuestionRepository reviewQuestionRepository) {
        this.reviewQuestionRepository = reviewQuestionRepository;
    }

    /**
     * {@code POST  /review-questions} : Create a new reviewQuestion.
     *
     * @param reviewQuestion the reviewQuestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reviewQuestion, or with status {@code 400 (Bad Request)} if the reviewQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/review-questions")
    public ResponseEntity<ReviewQuestion> createReviewQuestion(@RequestBody ReviewQuestion reviewQuestion) throws URISyntaxException {
        log.debug("REST request to save ReviewQuestion : {}", reviewQuestion);
        if (reviewQuestion.getId() != null) {
            throw new BadRequestAlertException("A new reviewQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReviewQuestion result = reviewQuestionRepository.save(reviewQuestion);
        return ResponseEntity.created(new URI("/api/review-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /review-questions} : Updates an existing reviewQuestion.
     *
     * @param reviewQuestion the reviewQuestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reviewQuestion,
     * or with status {@code 400 (Bad Request)} if the reviewQuestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reviewQuestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/review-questions")
    public ResponseEntity<ReviewQuestion> updateReviewQuestion(@RequestBody ReviewQuestion reviewQuestion) throws URISyntaxException {
        log.debug("REST request to update ReviewQuestion : {}", reviewQuestion);
        if (reviewQuestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReviewQuestion result = reviewQuestionRepository.save(reviewQuestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reviewQuestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /review-questions} : get all the reviewQuestions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reviewQuestions in body.
     */
    @GetMapping("/review-questions")
    public List<ReviewQuestion> getAllReviewQuestions() {
        log.debug("REST request to get all ReviewQuestions");
        return reviewQuestionRepository.findAll();
    }

    /**
     * {@code GET  /review-questions/:id} : get the "id" reviewQuestion.
     *
     * @param id the id of the reviewQuestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reviewQuestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/review-questions/{id}")
    public ResponseEntity<ReviewQuestion> getReviewQuestion(@PathVariable Long id) {
        log.debug("REST request to get ReviewQuestion : {}", id);
        Optional<ReviewQuestion> reviewQuestion = reviewQuestionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reviewQuestion);
    }

    /**
     * {@code DELETE  /review-questions/:id} : delete the "id" reviewQuestion.
     *
     * @param id the id of the reviewQuestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/review-questions/{id}")
    public ResponseEntity<Void> deleteReviewQuestion(@PathVariable Long id) {
        log.debug("REST request to delete ReviewQuestion : {}", id);
        reviewQuestionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
