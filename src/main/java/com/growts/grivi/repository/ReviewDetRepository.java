package com.growts.grivi.repository;

import com.growts.grivi.domain.ReviewDet;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ReviewDet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewDetRepository extends JpaRepository<ReviewDet, Long> {
}
