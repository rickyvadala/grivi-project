package com.growts.grivi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birth_date")
    private Instant birthDate;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @OneToMany(mappedBy = "personOrigin")
    private Set<Friendship> originFriendships = new HashSet<>();

    @OneToMany(mappedBy = "personAddressee")
    private Set<Friendship> addresseeFriendships = new HashSet<>();

    @OneToMany(mappedBy = "person")
    private Set<ChannelSubscription> channelSubscriptions = new HashSet<>();

    @OneToMany(mappedBy = "person")
    private Set<ProviderProfession> providerProfessions = new HashSet<>();

    @OneToMany(mappedBy = "person")
    private Set<Reaction> reactions = new HashSet<>();

    @OneToMany(mappedBy = "client")
    private Set<Review> asClientReviews = new HashSet<>();

    @OneToMany(mappedBy = "provider")
    private Set<Review> asProviderReviews = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "person_company",
               joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"))
    private Set<Company> companies = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "person_location",
               joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "location_id", referencedColumnName = "id"))
    private Set<Location> locations = new HashSet<>();

    @ManyToMany(mappedBy = "people")
    @JsonIgnore
    private Set<Channel> channels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Person firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Person lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Instant getBirthDate() {
        return birthDate;
    }

    public Person birthDate(Instant birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(Instant birthDate) {
        this.birthDate = birthDate;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public Person phoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<Friendship> getOriginFriendships() {
        return originFriendships;
    }

    public Person originFriendships(Set<Friendship> friendships) {
        this.originFriendships = friendships;
        return this;
    }

    public Person addOriginFriendships(Friendship friendship) {
        this.originFriendships.add(friendship);
        friendship.setPersonOrigin(this);
        return this;
    }

    public Person removeOriginFriendships(Friendship friendship) {
        this.originFriendships.remove(friendship);
        friendship.setPersonOrigin(null);
        return this;
    }

    public void setOriginFriendships(Set<Friendship> friendships) {
        this.originFriendships = friendships;
    }

    public Set<Friendship> getAddresseeFriendships() {
        return addresseeFriendships;
    }

    public Person addresseeFriendships(Set<Friendship> friendships) {
        this.addresseeFriendships = friendships;
        return this;
    }

    public Person addAddresseeFriendships(Friendship friendship) {
        this.addresseeFriendships.add(friendship);
        friendship.setPersonAddressee(this);
        return this;
    }

    public Person removeAddresseeFriendships(Friendship friendship) {
        this.addresseeFriendships.remove(friendship);
        friendship.setPersonAddressee(null);
        return this;
    }

    public void setAddresseeFriendships(Set<Friendship> friendships) {
        this.addresseeFriendships = friendships;
    }

    public Set<ChannelSubscription> getChannelSubscriptions() {
        return channelSubscriptions;
    }

    public Person channelSubscriptions(Set<ChannelSubscription> channelSubscriptions) {
        this.channelSubscriptions = channelSubscriptions;
        return this;
    }

    public Person addChannelSubscription(ChannelSubscription channelSubscription) {
        this.channelSubscriptions.add(channelSubscription);
        channelSubscription.setPerson(this);
        return this;
    }

    public Person removeChannelSubscription(ChannelSubscription channelSubscription) {
        this.channelSubscriptions.remove(channelSubscription);
        channelSubscription.setPerson(null);
        return this;
    }

    public void setChannelSubscriptions(Set<ChannelSubscription> channelSubscriptions) {
        this.channelSubscriptions = channelSubscriptions;
    }

    public Set<ProviderProfession> getProviderProfessions() {
        return providerProfessions;
    }

    public Person providerProfessions(Set<ProviderProfession> providerProfessions) {
        this.providerProfessions = providerProfessions;
        return this;
    }

    public Person addProviderProfession(ProviderProfession providerProfession) {
        this.providerProfessions.add(providerProfession);
        providerProfession.setPerson(this);
        return this;
    }

    public Person removeProviderProfession(ProviderProfession providerProfession) {
        this.providerProfessions.remove(providerProfession);
        providerProfession.setPerson(null);
        return this;
    }

    public void setProviderProfessions(Set<ProviderProfession> providerProfessions) {
        this.providerProfessions = providerProfessions;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public Person reactions(Set<Reaction> reactions) {
        this.reactions = reactions;
        return this;
    }

    public Person addReaction(Reaction reaction) {
        this.reactions.add(reaction);
        reaction.setPerson(this);
        return this;
    }

    public Person removeReaction(Reaction reaction) {
        this.reactions.remove(reaction);
        reaction.setPerson(null);
        return this;
    }

    public void setReactions(Set<Reaction> reactions) {
        this.reactions = reactions;
    }

    public Set<Review> getAsClientReviews() {
        return asClientReviews;
    }

    public Person asClientReviews(Set<Review> reviews) {
        this.asClientReviews = reviews;
        return this;
    }

    public Person addAsClientReviews(Review review) {
        this.asClientReviews.add(review);
        review.setClient(this);
        return this;
    }

    public Person removeAsClientReviews(Review review) {
        this.asClientReviews.remove(review);
        review.setClient(null);
        return this;
    }

    public void setAsClientReviews(Set<Review> reviews) {
        this.asClientReviews = reviews;
    }

    public Set<Review> getAsProviderReviews() {
        return asProviderReviews;
    }

    public Person asProviderReviews(Set<Review> reviews) {
        this.asProviderReviews = reviews;
        return this;
    }

    public Person addAsProviderReviews(Review review) {
        this.asProviderReviews.add(review);
        review.setProvider(this);
        return this;
    }

    public Person removeAsProviderReviews(Review review) {
        this.asProviderReviews.remove(review);
        review.setProvider(null);
        return this;
    }

    public void setAsProviderReviews(Set<Review> reviews) {
        this.asProviderReviews = reviews;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public Person companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public Person addCompany(Company company) {
        this.companies.add(company);
        company.getPeople().add(this);
        return this;
    }

    public Person removeCompany(Company company) {
        this.companies.remove(company);
        company.getPeople().remove(this);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Person locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Person addLocation(Location location) {
        this.locations.add(location);
        location.getPeople().add(this);
        return this;
    }

    public Person removeLocation(Location location) {
        this.locations.remove(location);
        location.getPeople().remove(this);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<Channel> getChannels() {
        return channels;
    }

    public Person channels(Set<Channel> channels) {
        this.channels = channels;
        return this;
    }

    public Person addChannel(Channel channel) {
        this.channels.add(channel);
        channel.getPeople().add(this);
        return this;
    }

    public Person removeChannel(Channel channel) {
        this.channels.remove(channel);
        channel.getPeople().remove(this);
        return this;
    }

    public void setChannels(Set<Channel> channels) {
        this.channels = channels;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        return id != null && id.equals(((Person) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            "}";
    }
}
