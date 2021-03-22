package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ProviderProfession.
 */
@Entity
@Table(name = "provider_profession")
public class ProviderProfession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "providerProfession")
    private Set<ReviewQuestion> reviewQuestions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "providerProfessions", allowSetters = true)
    private Person person;

    @ManyToOne
    @JsonIgnoreProperties(value = "providerProfessions", allowSetters = true)
    private Profession profession;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<ReviewQuestion> getReviewQuestions() {
        return reviewQuestions;
    }

    public ProviderProfession reviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
        return this;
    }

    public ProviderProfession addReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.add(reviewQuestion);
        reviewQuestion.setProviderProfession(this);
        return this;
    }

    public ProviderProfession removeReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.remove(reviewQuestion);
        reviewQuestion.setProviderProfession(null);
        return this;
    }

    public void setReviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
    }

    public Person getPerson() {
        return person;
    }

    public ProviderProfession person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Profession getProfession() {
        return profession;
    }

    public ProviderProfession profession(Profession profession) {
        this.profession = profession;
        return this;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProviderProfession)) {
            return false;
        }
        return id != null && id.equals(((ProviderProfession) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProviderProfession{" +
            "id=" + getId() +
            "}";
    }
}
