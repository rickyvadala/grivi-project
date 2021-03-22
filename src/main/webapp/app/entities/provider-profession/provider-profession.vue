<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.providerProfession.home.title')" id="provider-profession-heading">Provider Professions</span>
            <router-link :to="{name: 'ProviderProfessionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-provider-profession">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.providerProfession.home.createLabel')">
                    Create a new Provider Profession
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
        <div class="alert alert-warning" v-if="!isFetching && providerProfessions && providerProfessions.length === 0">
            <span v-text="$t('griviApp.providerProfession.home.notFound')">No providerProfessions found</span>
        </div>
        <div class="table-responsive" v-if="providerProfessions && providerProfessions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.providerProfession.person')">Person</span></th>
                    <th><span v-text="$t('griviApp.providerProfession.profession')">Profession</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="providerProfession in providerProfessions"
                    :key="providerProfession.id">
                    <td>
                        <router-link :to="{name: 'ProviderProfessionView', params: {providerProfessionId: providerProfession.id}}">{{providerProfession.id}}</router-link>
                    </td>
                    <td>
                        <div v-if="providerProfession.person">
                            <router-link :to="{name: 'PersonView', params: {personId: providerProfession.person.id}}">{{providerProfession.person.provider}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="providerProfession.profession">
                            <router-link :to="{name: 'ProfessionView', params: {professionId: providerProfession.profession.id}}">{{providerProfession.profession.profession}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ProviderProfessionView', params: {providerProfessionId: providerProfession.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProviderProfessionEdit', params: {providerProfessionId: providerProfession.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(providerProfession)"
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
            <span slot="modal-title"><span id="griviApp.providerProfession.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-providerProfession-heading" v-text="$t('griviApp.providerProfession.delete.question', {'id': removeId})">Are you sure you want to delete this Provider Profession?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-providerProfession" v-text="$t('entity.action.delete')" v-on:click="removeProviderProfession()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./provider-profession.component.ts">
</script>
