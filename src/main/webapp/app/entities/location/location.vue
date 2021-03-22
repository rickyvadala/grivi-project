<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.location.home.title')" id="location-heading">Locations</span>
            <router-link :to="{name: 'LocationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-location">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.location.home.createLabel')">
                    Create a new Location
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
        <div class="alert alert-warning" v-if="!isFetching && locations && locations.length === 0">
            <span v-text="$t('griviApp.location.home.notFound')">No locations found</span>
        </div>
        <div class="table-responsive" v-if="locations && locations.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.location.streetAddress')">Street Address</span></th>
                    <th><span v-text="$t('griviApp.location.streetNumber')">Street Number</span></th>
                    <th><span v-text="$t('griviApp.location.postalCode')">Postal Code</span></th>
                    <th><span v-text="$t('griviApp.location.city')">City</span></th>
                    <th><span v-text="$t('griviApp.location.stateProvince')">State Province</span></th>
                    <th><span v-text="$t('griviApp.location.country')">Country</span></th>
                    <th><span v-text="$t('griviApp.location.type')">Type</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="location in locations"
                    :key="location.id">
                    <td>
                        <router-link :to="{name: 'LocationView', params: {locationId: location.id}}">{{location.id}}</router-link>
                    </td>
                    <td>{{location.streetAddress}}</td>
                    <td>{{location.streetNumber}}</td>
                    <td>{{location.postalCode}}</td>
                    <td>{{location.city}}</td>
                    <td>{{location.stateProvince}}</td>
                    <td>
                        <div v-if="location.country">
                            <router-link :to="{name: 'CountryView', params: {countryId: location.country.id}}">{{location.country.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="location.type">
                            <router-link :to="{name: 'LocationTypeView', params: {locationTypeId: location.type.id}}">{{location.type.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'LocationView', params: {locationId: location.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'LocationEdit', params: {locationId: location.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(location)"
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
            <span slot="modal-title"><span id="griviApp.location.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-location-heading" v-text="$t('griviApp.location.delete.question', {'id': removeId})">Are you sure you want to delete this Location?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-location" v-text="$t('entity.action.delete')" v-on:click="removeLocation()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./location.component.ts">
</script>
