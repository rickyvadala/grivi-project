<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.reaction.home.title')" id="reaction-heading">Reactions</span>
            <router-link :to="{name: 'ReactionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-reaction">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.reaction.home.createLabel')">
                    Create a new Reaction
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
        <div class="alert alert-warning" v-if="!isFetching && reactions && reactions.length === 0">
            <span v-text="$t('griviApp.reaction.home.notFound')">No reactions found</span>
        </div>
        <div class="table-responsive" v-if="reactions && reactions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.reaction.type')">Type</span></th>
                    <th><span v-text="$t('griviApp.reaction.person')">Person</span></th>
                    <th><span v-text="$t('griviApp.reaction.post')">Post</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="reaction in reactions"
                    :key="reaction.id">
                    <td>
                        <router-link :to="{name: 'ReactionView', params: {reactionId: reaction.id}}">{{reaction.id}}</router-link>
                    </td>
                    <td>{{reaction.type}}</td>
                    <td>
                        <div v-if="reaction.person">
                            <router-link :to="{name: 'PersonView', params: {personId: reaction.person.id}}">{{reaction.person.person}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="reaction.post">
                            <router-link :to="{name: 'PostView', params: {postId: reaction.post.id}}">{{reaction.post.post}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ReactionView', params: {reactionId: reaction.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReactionEdit', params: {reactionId: reaction.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(reaction)"
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
            <span slot="modal-title"><span id="griviApp.reaction.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-reaction-heading" v-text="$t('griviApp.reaction.delete.question', {'id': removeId})">Are you sure you want to delete this Reaction?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-reaction" v-text="$t('entity.action.delete')" v-on:click="removeReaction()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./reaction.component.ts">
</script>
