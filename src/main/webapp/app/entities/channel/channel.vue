<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.channel.home.title')" id="channel-heading">Channels</span>
            <router-link :to="{name: 'ChannelCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-channel">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.channel.home.createLabel')">
                    Create a new Channel
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
        <div class="alert alert-warning" v-if="!isFetching && channels && channels.length === 0">
            <span v-text="$t('griviApp.channel.home.notFound')">No channels found</span>
        </div>
        <div class="table-responsive" v-if="channels && channels.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.channel.name')">Name</span></th>
                    <th><span v-text="$t('griviApp.channel.person')">Person</span></th>
                    <th><span v-text="$t('griviApp.channel.category')">Category</span></th>
                    <th><span v-text="$t('griviApp.channel.profession')">Profession</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="channel in channels"
                    :key="channel.id">
                    <td>
                        <router-link :to="{name: 'ChannelView', params: {channelId: channel.id}}">{{channel.id}}</router-link>
                    </td>
                    <td>{{channel.name}}</td>
                    <td>
                        <span v-for="(person, i) in channel.people" :key="person.id">{{i > 0 ? ', ' : ''}}
                            <router-link class="form-control-static" :to="{name: 'PersonView', params: {personId: person.id}}">{{person.id}}</router-link>
                        </span>
                    </td>
                    <td>
                        <div v-if="channel.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: channel.category.id}}">{{channel.category.category}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="channel.profession">
                            <router-link :to="{name: 'ProfessionView', params: {professionId: channel.profession.id}}">{{channel.profession.profession}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ChannelView', params: {channelId: channel.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ChannelEdit', params: {channelId: channel.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(channel)"
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
            <span slot="modal-title"><span id="griviApp.channel.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-channel-heading" v-text="$t('griviApp.channel.delete.question', {'id': removeId})">Are you sure you want to delete this Channel?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-channel" v-text="$t('entity.action.delete')" v-on:click="removeChannel()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./channel.component.ts">
</script>
