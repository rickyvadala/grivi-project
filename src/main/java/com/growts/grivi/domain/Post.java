package com.growts.grivi.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "photo_url")
    private String photoUrl;

    @OneToMany(mappedBy = "post")
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "post")
    private Set<Reaction> reactions = new HashSet<>();

    @OneToMany(mappedBy = "postFrom")
    private Set<Comment> commentsFroms = new HashSet<>();

    @OneToMany(mappedBy = "post")
    private Set<Comment> comments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Post text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public Post photoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
        return this;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public Post notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public Post addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setPost(this);
        return this;
    }

    public Post removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setPost(null);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public Post reactions(Set<Reaction> reactions) {
        this.reactions = reactions;
        return this;
    }

    public Post addReaction(Reaction reaction) {
        this.reactions.add(reaction);
        reaction.setPost(this);
        return this;
    }

    public Post removeReaction(Reaction reaction) {
        this.reactions.remove(reaction);
        reaction.setPost(null);
        return this;
    }

    public void setReactions(Set<Reaction> reactions) {
        this.reactions = reactions;
    }

    public Set<Comment> getCommentsFroms() {
        return commentsFroms;
    }

    public Post commentsFroms(Set<Comment> comments) {
        this.commentsFroms = comments;
        return this;
    }

    public Post addCommentsFrom(Comment comment) {
        this.commentsFroms.add(comment);
        comment.setPostFrom(this);
        return this;
    }

    public Post removeCommentsFrom(Comment comment) {
        this.commentsFroms.remove(comment);
        comment.setPostFrom(null);
        return this;
    }

    public void setCommentsFroms(Set<Comment> comments) {
        this.commentsFroms = comments;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Post comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Post addComments(Comment comment) {
        this.comments.add(comment);
        comment.setPost(this);
        return this;
    }

    public Post removeComments(Comment comment) {
        this.comments.remove(comment);
        comment.setPost(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", photoUrl='" + getPhotoUrl() + "'" +
            "}";
    }
}
