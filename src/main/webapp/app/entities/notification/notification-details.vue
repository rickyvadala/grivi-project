<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="notification">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.notification.detail.title')">Notification</span> {{notification.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.notification.post')">Post</span>
                    </dt>
                    <dd>
                        <div v-if="notification.post">
                            <router-link :to="{name: 'PostView', params: {postId: notification.post.id}}">{{notification.post.post}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.notification.reaction')">Reaction</span>
                    </dt>
                    <dd>
                        <div v-if="notification.reaction">
                            <router-link :to="{name: 'ReactionView', params: {reactionId: notification.reaction.id}}">{{notification.reaction.reaction}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.notification.review')">Review</span>
                    </dt>
                    <dd>
                        <div v-if="notification.review">
                            <router-link :to="{name: 'ReviewView', params: {reviewId: notification.review.id}}">{{notification.review.review}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.notification.channel')">Channel</span>
                    </dt>
                    <dd>
                        <div v-if="notification.channel">
                            <router-link :to="{name: 'ChannelView', params: {channelId: notification.channel.id}}">{{notification.channel.channel}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="notification.id" :to="{name: 'NotificationEdit', params: {notificationId: notification.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./notification-details.component.ts">
</script>
