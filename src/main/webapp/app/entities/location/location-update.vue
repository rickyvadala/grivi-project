<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.location.home.createOrEditLabel" v-text="$t('griviApp.location.home.createOrEditLabel')">Create or edit a Location</h2>
                <div>
                    <div class="form-group" v-if="location.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="location.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.streetAddress')" for="location-streetAddress">Street Address</label>
                        <input type="text" class="form-control" name="streetAddress" id="location-streetAddress"
                            :class="{'valid': !$v.location.streetAddress.$invalid, 'invalid': $v.location.streetAddress.$invalid }" v-model="$v.location.streetAddress.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.streetNumber')" for="location-streetNumber">Street Number</label>
                        <input type="number" class="form-control" name="streetNumber" id="location-streetNumber"
                            :class="{'valid': !$v.location.streetNumber.$invalid, 'invalid': $v.location.streetNumber.$invalid }" v-model.number="$v.location.streetNumber.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.postalCode')" for="location-postalCode">Postal Code</label>
                        <input type="text" class="form-control" name="postalCode" id="location-postalCode"
                            :class="{'valid': !$v.location.postalCode.$invalid, 'invalid': $v.location.postalCode.$invalid }" v-model="$v.location.postalCode.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.city')" for="location-city">City</label>
                        <input type="text" class="form-control" name="city" id="location-city"
                            :class="{'valid': !$v.location.city.$invalid, 'invalid': $v.location.city.$invalid }" v-model="$v.location.city.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.stateProvince')" for="location-stateProvince">State Province</label>
                        <input type="text" class="form-control" name="stateProvince" id="location-stateProvince"
                            :class="{'valid': !$v.location.stateProvince.$invalid, 'invalid': $v.location.stateProvince.$invalid }" v-model="$v.location.stateProvince.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.country')" for="location-country">Country</label>
                        <select class="form-control" id="location-country" name="country" v-model="location.country">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="location.country && countryOption.id === location.country.id ? location.country : countryOption" v-for="countryOption in countries" :key="countryOption.id">{{countryOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.location.type')" for="location-type">Type</label>
                        <select class="form-control" id="location-type" name="type" v-model="location.type">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="location.type && locationTypeOption.id === location.type.id ? location.type : locationTypeOption" v-for="locationTypeOption in locationTypes" :key="locationTypeOption.id">{{locationTypeOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.location.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./location-update.component.ts">
</script>
