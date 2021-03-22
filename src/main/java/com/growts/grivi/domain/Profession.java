package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Profession.
 */
@Entity
@Table(name = "profession")
public class Profession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "profession")
    private Set<ProviderProfession> providerProfessions = new HashSet<>();

    @OneToMany(mappedBy = "profession")
    private Set<Channel> channels = new HashSet<>();

    @OneToMany(mappedBy = "profession")
    private Set<ReviewQuestion> reviewQuestions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "professions", allowSetters = true)
    private Category category;

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

    public Profession name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Profession description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ProviderProfession> getProviderProfessions() {
        return providerProfessions;
    }

    public Profession providerProfessions(Set<ProviderProfession> providerProfessions) {
        this.providerProfessions = providerProfessions;
        return this;
    }

    public Profession addProviderProfession(ProviderProfession providerProfession) {
        this.providerProfessions.add(providerProfession);
        providerProfession.setProfession(this);
        return this;
    }

    public Profession removeProviderProfession(ProviderProfession providerProfession) {
        this.providerProfessions.remove(providerProfession);
        providerProfession.setProfession(null);
        return this;
    }

    public void setProviderProfessions(Set<ProviderProfession> providerProfessions) {
        this.providerProfessions = providerProfessions;
    }

    public Set<Channel> getChannels() {
        return channels;
    }

    public Profession channels(Set<Channel> channels) {
        this.channels = channels;
        return this;
    }

    public Profession addChannel(Channel channel) {
        this.channels.add(channel);
        channel.setProfession(this);
        return this;
    }

    public Profession removeChannel(Channel channel) {
        this.channels.remove(channel);
        channel.setProfession(null);
        return this;
    }

    public void setChannels(Set<Channel> channels) {
        this.channels = channels;
    }

    public Set<ReviewQuestion> getReviewQuestions() {
        return reviewQuestions;
    }

    public Profession reviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
        return this;
    }

    public Profession addReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.add(reviewQuestion);
        reviewQuestion.setProfession(this);
        return this;
    }

    public Profession removeReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.remove(reviewQuestion);
        reviewQuestion.setProfession(null);
        return this;
    }

    public void setReviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
    }

    public Category getCategory() {
        return category;
    }

    public Profession category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profession)) {
            return false;
        }
        return id != null && id.equals(((Profession) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profession{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
