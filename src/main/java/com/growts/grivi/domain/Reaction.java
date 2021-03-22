package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Reaction.
 */
@Entity
@Table(name = "reaction")
public class Reaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "reaction")
    private Set<Notification> notifications = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "reactions", allowSetters = true)
    private Person person;

    @ManyToOne
    @JsonIgnoreProperties(value = "reactions", allowSetters = true)
    private Post post;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Reaction type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public Reaction notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public Reaction addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setReaction(this);
        return this;
    }

    public Reaction removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setReaction(null);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Person getPerson() {
        return person;
    }

    public Reaction person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Post getPost() {
        return post;
    }

    public Reaction post(Post post) {
        this.post = post;
        return this;
    }

    public void setPost(Post post) {
        this.post = post;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reaction)) {
            return false;
        }
        return id != null && id.equals(((Reaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reaction{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
