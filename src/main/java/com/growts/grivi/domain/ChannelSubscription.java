package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ChannelSubscription.
 */
@Entity
@Table(name = "channel_subscription")
public class ChannelSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "channelSubscriptions", allowSetters = true)
    private Person person;

    @ManyToOne
    @JsonIgnoreProperties(value = "channelSubscriptions", allowSetters = true)
    private Channel channel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public ChannelSubscription person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Channel getChannel() {
        return channel;
    }

    public ChannelSubscription channel(Channel channel) {
        this.channel = channel;
        return this;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChannelSubscription)) {
            return false;
        }
        return id != null && id.equals(((ChannelSubscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChannelSubscription{" +
            "id=" + getId() +
            "}";
    }
}
