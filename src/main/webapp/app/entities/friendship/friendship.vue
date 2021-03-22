<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.friendship.home.title')" id="friendship-heading">Friendships</span>
            <router-link :to="{name: 'FriendshipCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-friendship">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.friendship.home.createLabel')">
                    Create a new Friendship
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
        <div class="alert alert-warning" v-if="!isFetching && friendships && friendships.length === 0">
            <span v-text="$t('griviApp.friendship.home.notFound')">No friendships found</span>
        </div>
        <div class="table-responsive" v-if="friendships && friendships.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.friendship.personOrigin')">Person Origin</span></th>
                    <th><span v-text="$t('griviApp.friendship.personAddressee')">Person Addressee</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="friendship in friendships"
                    :key="friendship.id">
                    <td>
                        <router-link :to="{name: 'FriendshipView', params: {friendshipId: friendship.id}}">{{friendship.id}}</router-link>
                    </td>
                    <td>
                        <div v-if="friendship.personOrigin">
                            <router-link :to="{name: 'PersonView', params: {personId: friendship.personOrigin.id}}">{{friendship.personOrigin.personOrigin}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="friendship.personAddressee">
                            <router-link :to="{name: 'PersonView', params: {personId: friendship.personAddressee.id}}">{{friendship.personAddressee.personAddressee}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'FriendshipView', params: {friendshipId: friendship.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'FriendshipEdit', params: {friendshipId: friendship.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(friendship)"
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
            <span slot="modal-title"><span id="griviApp.friendship.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-friendship-heading" v-text="$t('griviApp.friendship.delete.question', {'id': removeId})">Are you sure you want to delete this Friendship?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-friendship" v-text="$t('entity.action.delete')" v-on:click="removeFriendship()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./friendship.component.ts">
</script>
