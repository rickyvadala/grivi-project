package com.growts.grivi.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "category")
    private Set<Profession> professions = new HashSet<>();

    @OneToMany(mappedBy = "category")
    private Set<Channel> channels = new HashSet<>();

    @OneToMany(mappedBy = "category")
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

    public Category name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Category description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Profession> getProfessions() {
        return professions;
    }

    public Category professions(Set<Profession> professions) {
        this.professions = professions;
        return this;
    }

    public Category addProfession(Profession profession) {
        this.professions.add(profession);
        profession.setCategory(this);
        return this;
    }

    public Category removeProfession(Profession profession) {
        this.professions.remove(profession);
        profession.setCategory(null);
        return this;
    }

    public void setProfessions(Set<Profession> professions) {
        this.professions = professions;
    }

    public Set<Channel> getChannels() {
        return channels;
    }

    public Category channels(Set<Channel> channels) {
        this.channels = channels;
        return this;
    }

    public Category addChannel(Channel channel) {
        this.channels.add(channel);
        channel.setCategory(this);
        return this;
    }

    public Category removeChannel(Channel channel) {
        this.channels.remove(channel);
        channel.setCategory(null);
        return this;
    }

    public void setChannels(Set<Channel> channels) {
        this.channels = channels;
    }

    public Set<ReviewQuestion> getReviewQuestions() {
        return reviewQuestions;
    }

    public Category reviewQuestions(Set<ReviewQuestion> reviewQuestions) {
        this.reviewQuestions = reviewQuestions;
        return this;
    }

    public Category addReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.add(reviewQuestion);
        reviewQuestion.setCategory(this);
        return this;
    }

    public Category removeReviewQuestion(ReviewQuestion reviewQuestion) {
        this.reviewQuestions.remove(reviewQuestion);
        reviewQuestion.setCategory(null);
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
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
