package com.growts.grivi.web.rest;

import com.growts.grivi.domain.Friendship;
import com.growts.grivi.repository.FriendshipRepository;
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
 * REST controller for managing {@link com.growts.grivi.domain.Friendship}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FriendshipResource {

    private final Logger log = LoggerFactory.getLogger(FriendshipResource.class);

    private static final String ENTITY_NAME = "friendship";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FriendshipRepository friendshipRepository;

    public FriendshipResource(FriendshipRepository friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    }

    /**
     * {@code POST  /friendships} : Create a new friendship.
     *
     * @param friendship the friendship to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new friendship, or with status {@code 400 (Bad Request)} if the friendship has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/friendships")
    public ResponseEntity<Friendship> createFriendship(@RequestBody Friendship friendship) throws URISyntaxException {
        log.debug("REST request to save Friendship : {}", friendship);
        if (friendship.getId() != null) {
            throw new BadRequestAlertException("A new friendship cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Friendship result = friendshipRepository.save(friendship);
        return ResponseEntity.created(new URI("/api/friendships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /friendships} : Updates an existing friendship.
     *
     * @param friendship the friendship to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated friendship,
     * or with status {@code 400 (Bad Request)} if the friendship is not valid,
     * or with status {@code 500 (Internal Server Error)} if the friendship couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/friendships")
    public ResponseEntity<Friendship> updateFriendship(@RequestBody Friendship friendship) throws URISyntaxException {
        log.debug("REST request to update Friendship : {}", friendship);
        if (friendship.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Friendship result = friendshipRepository.save(friendship);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, friendship.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /friendships} : get all the friendships.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of friendships in body.
     */
    @GetMapping("/friendships")
    public List<Friendship> getAllFriendships() {
        log.debug("REST request to get all Friendships");
        return friendshipRepository.findAll();
    }

    /**
     * {@code GET  /friendships/:id} : get the "id" friendship.
     *
     * @param id the id of the friendship to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the friendship, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/friendships/{id}")
    public ResponseEntity<Friendship> getFriendship(@PathVariable Long id) {
        log.debug("REST request to get Friendship : {}", id);
        Optional<Friendship> friendship = friendshipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(friendship);
    }

    /**
     * {@code DELETE  /friendships/:id} : delete the "id" friendship.
     *
     * @param id the id of the friendship to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/friendships/{id}")
    public ResponseEntity<Void> deleteFriendship(@PathVariable Long id) {
        log.debug("REST request to delete Friendship : {}", id);
        friendshipRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
