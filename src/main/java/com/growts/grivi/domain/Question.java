package com.growts.grivi.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "text")
    private String text;

    @OneToMany(mappedBy = "question")
    private Set<ReviewQuestion> reviewQuestions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Question name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public Question text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<ReviewQuestion> getReviewQuestions() {
        return reviewQuestions;
    }

    public Question reviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
        return this;
    }

    public Question addReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.add(reviewQuestion);
        reviewQuestion.setQuestion(this);
        return this;
    }

    public Question removeReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.remove(reviewQuestion);
        reviewQuestion.setQuestion(null);
        return this;
    }

    public void setReviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", text='" + getText() + "'" +
            "}";
    }
}
