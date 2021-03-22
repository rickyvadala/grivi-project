<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.notification.home.createOrEditLabel" v-text="$t('griviApp.notification.home.createOrEditLabel')">Create or edit a Notification</h2>
                <div>
                    <div class="form-group" v-if="notification.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="notification.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.notification.post')" for="notification-post">Post</label>
                        <select class="form-control" id="notification-post" name="post" v-model="notification.post">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="notification.post && postOption.id === notification.post.id ? notification.post : postOption" v-for="postOption in posts" :key="postOption.id">{{postOption.post}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.notification.reaction')" for="notification-reaction">Reaction</label>
                        <select class="form-control" id="notification-reaction" name="reaction" v-model="notification.reaction">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="notification.reaction && reactionOption.id === notification.reaction.id ? notification.reaction : reactionOption" v-for="reactionOption in reactions" :key="reactionOption.id">{{reactionOption.reaction}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.notification.review')" for="notification-review">Review</label>
                        <select class="form-control" id="notification-review" name="review" v-model="notification.review">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="notification.review && reviewOption.id === notification.review.id ? notification.review : reviewOption" v-for="reviewOption in reviews" :key="reviewOption.id">{{reviewOption.review}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.notification.channel')" for="notification-channel">Channel</label>
                        <select class="form-control" id="notification-channel" name="channel" v-model="notification.channel">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="notification.channel && channelOption.id === notification.channel.id ? notification.channel : channelOption" v-for="channelOption in channels" :key="channelOption.id">{{channelOption.channel}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.notification.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./notification-update.component.ts">
</script>
