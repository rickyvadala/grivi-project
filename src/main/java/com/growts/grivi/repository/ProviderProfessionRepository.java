package com.growts.grivi.repository;

import com.growts.grivi.domain.ProviderProfession;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProviderProfession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderProfessionRepository extends JpaRepository<ProviderProfession, Long> {
}
