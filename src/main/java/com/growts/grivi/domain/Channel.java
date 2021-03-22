package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Channel.
 */
@Entity
@Table(name = "channel")
public class Channel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "channel")
    private Set<ChannelSubscription> channelSubscriptions = new HashSet<>();

    @OneToMany(mappedBy = "channel")
    private Set<Notification> notifications = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "channel_person",
               joinColumns = @JoinColumn(name = "channel_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"))
    private Set<Person> people = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "channels", allowSetters = true)
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = "channels", allowSetters = true)
    private Profession profession;

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

    public Channel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ChannelSubscription> getChannelSubscriptions() {
        return channelSubscriptions;
    }

    public Channel channelSubscriptions(Set<ChannelSubscription> channelSubscriptions) {
        this.channelSubscriptions = channelSubscriptions;
        return this;
    }

    public Channel addChannelSubscription(ChannelSubscription channelSubscription) {
        this.channelSubscriptions.add(channelSubscription);
        channelSubscription.setChannel(this);
        return this;
    }

    public Channel removeChannelSubscription(ChannelSubscription channelSubscription) {
        this.channelSubscriptions.remove(channelSubscription);
        channelSubscription.setChannel(null);
        return this;
    }

    public void setChannelSubscriptions(Set<ChannelSubscription> channelSubscriptions) {
        this.channelSubscriptions = channelSubscriptions;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public Channel notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public Channel addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setChannel(this);
        return this;
    }

    public Channel removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setChannel(null);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Person> getPeople() {
        return people;
    }

    public Channel people(Set<Person> people) {
        this.people = people;
        return this;
    }

    public Channel addPerson(Person person) {
        this.people.add(person);
        person.getChannels().add(this);
        return this;
    }

    public Channel removePerson(Person person) {
        this.people.remove(person);
        person.getChannels().remove(this);
        return this;
    }

    public void setPeople(Set<Person> people) {
        this.people = people;
    }

    public Category getCategory() {
        return category;
    }

    public Channel category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Profession getProfession() {
        return profession;
    }

    public Channel profession(Profession profession) {
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
        if (!(o instanceof Channel)) {
            return false;
        }
        return id != null && id.equals(((Channel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Channel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
