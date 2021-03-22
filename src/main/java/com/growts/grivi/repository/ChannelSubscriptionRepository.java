package com.growts.grivi.repository;

import com.growts.grivi.domain.ChannelSubscription;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ChannelSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChannelSubscriptionRepository extends JpaRepository<ChannelSubscription, Long> {
}
