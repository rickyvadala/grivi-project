package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Friendship.
 */
@Entity
@Table(name = "friendship")
public class Friendship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "originFriendships", allowSetters = true)
    private Person personOrigin;

    @ManyToOne
    @JsonIgnoreProperties(value = "addresseeFriendships", allowSetters = true)
    private Person personAddressee;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPersonOrigin() {
        return personOrigin;
    }

    public Friendship personOrigin(Person person) {
        this.personOrigin = person;
        return this;
    }

    public void setPersonOrigin(Person person) {
        this.personOrigin = person;
    }

    public Person getPersonAddressee() {
        return personAddressee;
    }

    public Friendship personAddressee(Person person) {
        this.personAddressee = person;
        return this;
    }

    public void setPersonAddressee(Person person) {
        this.personAddressee = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Friendship)) {
            return false;
        }
        return id != null && id.equals(((Friendship) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Friendship{" +
            "id=" + getId() +
            "}";
    }
}
