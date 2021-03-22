package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ReviewQuestion.
 */
@Entity
@Table(name = "review_question")
public class ReviewQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enabled")
    private Boolean enabled;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviewQuestions", allowSetters = true)
    private Question question;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviewQuestions", allowSetters = true)
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviewQuestions", allowSetters = true)
    private Profession profession;

    @ManyToOne
    @JsonIgnoreProperties(value = "reviewQuestions", allowSetters = true)
    private ProviderProfession providerProfession;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public ReviewQuestion enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Question getQuestion() {
        return question;
    }

    public ReviewQuestion question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Category getCategory() {
        return category;
    }

    public ReviewQuestion category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Profession getProfession() {
        return profession;
    }

    public ReviewQuestion profession(Profession profession) {
        this.profession = profession;
        return this;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }

    public ProviderProfession getProviderProfession() {
        return providerProfession;
    }

    public ReviewQuestion providerProfession(ProviderProfession providerProfession) {
        this.providerProfession = providerProfession;
        return this;
    }

    public void setProviderProfession(ProviderProfession providerProfession) {
        this.providerProfession = providerProfession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReviewQuestion)) {
            return false;
        }
        return id != null && id.equals(((ReviewQuestion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReviewQuestion{" +
            "id=" + getId() +
            ", enabled='" + isEnabled() + "'" +
            "}";
    }
}
