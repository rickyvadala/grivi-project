package com.growts.grivi.web.rest;

import com.growts.grivi.domain.ChannelSubscription;
import com.growts.grivi.repository.ChannelSubscriptionRepository;
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
 * REST controller for managing {@link com.growts.grivi.domain.ChannelSubscription}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChannelSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(ChannelSubscriptionResource.class);

    private static final String ENTITY_NAME = "channelSubscription";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChannelSubscriptionRepository channelSubscriptionRepository;

    public ChannelSubscriptionResource(ChannelSubscriptionRepository channelSubscriptionRepository) {
        this.channelSubscriptionRepository = channelSubscriptionRepository;
    }

    /**
     * {@code POST  /channel-subscriptions} : Create a new channelSubscription.
     *
     * @param channelSubscription the channelSubscription to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new channelSubscription, or with status {@code 400 (Bad Request)} if the channelSubscription has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/channel-subscriptions")
    public ResponseEntity<ChannelSubscription> createChannelSubscription(@RequestBody ChannelSubscription channelSubscription) throws URISyntaxException {
        log.debug("REST request to save ChannelSubscription : {}", channelSubscription);
        if (channelSubscription.getId() != null) {
            throw new BadRequestAlertException("A new channelSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChannelSubscription result = channelSubscriptionRepository.save(channelSubscription);
        return ResponseEntity.created(new URI("/api/channel-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /channel-subscriptions} : Updates an existing channelSubscription.
     *
     * @param channelSubscription the channelSubscription to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated channelSubscription,
     * or with status {@code 400 (Bad Request)} if the channelSubscription is not valid,
     * or with status {@code 500 (Internal Server Error)} if the channelSubscription couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/channel-subscriptions")
    public ResponseEntity<ChannelSubscription> updateChannelSubscription(@RequestBody ChannelSubscription channelSubscription) throws URISyntaxException {
        log.debug("REST request to update ChannelSubscription : {}", channelSubscription);
        if (channelSubscription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChannelSubscription result = channelSubscriptionRepository.save(channelSubscription);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, channelSubscription.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /channel-subscriptions} : get all the channelSubscriptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of channelSubscriptions in body.
     */
    @GetMapping("/channel-subscriptions")
    public List<ChannelSubscription> getAllChannelSubscriptions() {
        log.debug("REST request to get all ChannelSubscriptions");
        return channelSubscriptionRepository.findAll();
    }

    /**
     * {@code GET  /channel-subscriptions/:id} : get the "id" channelSubscription.
     *
     * @param id the id of the channelSubscription to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the channelSubscription, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/channel-subscriptions/{id}")
    public ResponseEntity<ChannelSubscription> getChannelSubscription(@PathVariable Long id) {
        log.debug("REST request to get ChannelSubscription : {}", id);
        Optional<ChannelSubscription> channelSubscription = channelSubscriptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(channelSubscription);
    }

    /**
     * {@code DELETE  /channel-subscriptions/:id} : delete the "id" channelSubscription.
     *
     * @param id the id of the channelSubscription to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/channel-subscriptions/{id}")
    public ResponseEntity<Void> deleteChannelSubscription(@PathVariable Long id) {
        log.debug("REST request to delete ChannelSubscription : {}", id);
        channelSubscriptionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
