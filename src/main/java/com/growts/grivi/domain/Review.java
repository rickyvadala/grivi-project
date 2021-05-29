package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Review.
 */
@Entity
@Table(name = "review")
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "avg_rate")
    private Double avgRate;

    @Column(name = "date")
    private Instant date;

    @OneToMany(mappedBy = "review")
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "review")
    private Set<ReviewDet> reviewDets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "asClientReviews", allowSetters = true)
    private Person client;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviews", allowSetters = true)
    private ProviderProfession provider;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAvgRate() {
        return avgRate;
    }

    public Review avgRate(Double avgRate) {
        this.avgRate = avgRate;
        return this;
    }

    public void setAvgRate(Double avgRate) {
        this.avgRate = avgRate;
    }

    public Instant getDate() {
        return date;
    }

    public Review date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public Review notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public Review addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setReview(this);
        return this;
    }

    public Review removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setReview(null);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<ReviewDet> getReviewDets() {
        return reviewDets;
    }

    public Review reviewDets(Set<ReviewDet> reviewDets) {
        this.reviewDets = reviewDets;
        return this;
    }

    public Review addReviewDet(ReviewDet reviewDet) {
        this.reviewDets.add(reviewDet);
        reviewDet.setReview(this);
        return this;
    }

    public Review removeReviewDet(ReviewDet reviewDet) {
        this.reviewDets.remove(reviewDet);
        reviewDet.setReview(null);
        return this;
    }

    public void setReviewDets(Set<ReviewDet> reviewDets) {
        this.reviewDets = reviewDets;
    }

    public Person getClient() {
        return client;
    }

    public Review client(Person person) {
        this.client = person;
        return this;
    }

    public void setClient(Person person) {
        this.client = person;
    }

    public ProviderProfession getProvider() {
        return provider;
    }

    public Review provider(ProviderProfession providerProfession) {
        this.provider = providerProfession;
        return this;
    }

    public void setProvider(ProviderProfession providerProfession) {
        this.provider = providerProfession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Review)) {
            return false;
        }
        return id != null && id.equals(((Review) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Review{" +
            "id=" + getId() +
            ", avgRate=" + getAvgRate() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
