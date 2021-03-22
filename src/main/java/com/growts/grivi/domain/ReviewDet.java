package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ReviewDet.
 */
@Entity
@Table(name = "review_det")
public class ReviewDet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rate")
    private Long rate;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviewDets", allowSetters = true)
    private Review review;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviewDets", allowSetters = true)
    private Notification question;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRate() {
        return rate;
    }

    public ReviewDet rate(Long rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public Review getReview() {
        return review;
    }

    public ReviewDet review(Review review) {
        this.review = review;
        return this;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Notification getQuestion() {
        return question;
    }

    public ReviewDet question(Notification notification) {
        this.question = notification;
        return this;
    }

    public void setQuestion(Notification notification) {
        this.question = notification;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReviewDet)) {
            return false;
        }
        return id != null && id.equals(((ReviewDet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReviewDet{" +
            "id=" + getId() +
            ", rate=" + getRate() +
            "}";
    }
}
