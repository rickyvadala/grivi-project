<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.notification.home.title')" id="notification-heading">Notifications</span>
            <router-link :to="{name: 'NotificationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-notification">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.notification.home.createLabel')">
                    Create a new Notification
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && notifications && notifications.length === 0">
            <span v-text="$t('griviApp.notification.home.notFound')">No notifications found</span>
        </div>
        <div class="table-responsive" v-if="notifications && notifications.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.notification.post')">Post</span></th>
                    <th><span v-text="$t('griviApp.notification.reaction')">Reaction</span></th>
                    <th><span v-text="$t('griviApp.notification.review')">Review</span></th>
                    <th><span v-text="$t('griviApp.notification.channel')">Channel</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="notification in notifications"
                    :key="notification.id">
                    <td>
                        <router-link :to="{name: 'NotificationView', params: {notificationId: notification.id}}">{{notification.id}}</router-link>
                    </td>
                    <td>
                        <div v-if="notification.post">
                            <router-link :to="{name: 'PostView', params: {postId: notification.post.id}}">{{notification.post.post}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="notification.reaction">
                            <router-link :to="{name: 'ReactionView', params: {reactionId: notification.reaction.id}}">{{notification.reaction.reaction}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="notification.review">
                            <router-link :to="{name: 'ReviewView', params: {reviewId: notification.review.id}}">{{notification.review.review}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="notification.channel">
                            <router-link :to="{name: 'ChannelView', params: {channelId: notification.channel.id}}">{{notification.channel.channel}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'NotificationView', params: {notificationId: notification.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'NotificationEdit', params: {notificationId: notification.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(notification)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="griviApp.notification.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-notification-heading" v-text="$t('griviApp.notification.delete.question', {'id': removeId})">Are you sure you want to delete this Notification?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-notification" v-text="$t('entity.action.delete')" v-on:click="removeNotification()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./notification.component.ts">
</script>
