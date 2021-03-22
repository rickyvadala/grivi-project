package com.growts.grivi.repository;

import com.growts.grivi.domain.ReviewQuestion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ReviewQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewQuestionRepository extends JpaRepository<ReviewQuestion, Long> {
}
