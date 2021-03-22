package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "question")
    private Set<ReviewDet> reviewDets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "notifications", allowSetters = true)
    private Post post;

    @ManyToOne
    @JsonIgnoreProperties(value = "notifications", allowSetters = true)
    private Reaction reaction;

    @ManyToOne
    @JsonIgnoreProperties(value = "notifications", allowSetters = true)
    private Review review;

    @ManyToOne
    @JsonIgnoreProperties(value = "notifications", allowSetters = true)
    private Channel channel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<ReviewDet> getReviewDets() {
        return reviewDets;
    }

    public Notification reviewDets(Set<ReviewDet> reviewDets) {
        this.reviewDets = reviewDets;
        return this;
    }

    public Notification addReviewDet(ReviewDet reviewDet) {
        this.reviewDets.add(reviewDet);
        reviewDet.setQuestion(this);
        return this;
    }

    public Notification removeReviewDet(ReviewDet reviewDet) {
        this.reviewDets.remove(reviewDet);
        reviewDet.setQuestion(null);
        return this;
    }

    public void setReviewDets(Set<ReviewDet> reviewDets) {
        this.reviewDets = reviewDets;
    }

    public Post getPost() {
        return post;
    }

    public Notification post(Post post) {
        this.post = post;
        return this;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Reaction getReaction() {
        return reaction;
    }

    public Notification reaction(Reaction reaction) {
        this.reaction = reaction;
        return this;
    }

    public void setReaction(Reaction reaction) {
        this.reaction = reaction;
    }

    public Review getReview() {
        return review;
    }

    public Notification review(Review review) {
        this.review = review;
        return this;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Channel getChannel() {
        return channel;
    }

    public Notification channel(Channel channel) {
        this.channel = channel;
        return this;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            "}";
    }
}
