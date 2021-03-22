<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.person.home.createOrEditLabel" v-text="$t('griviApp.person.home.createOrEditLabel')">Create or edit a Person</h2>
                <div>
                    <div class="form-group" v-if="person.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="person.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.person.firstName')" for="person-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="person-firstName"
                            :class="{'valid': !$v.person.firstName.$invalid, 'invalid': $v.person.firstName.$invalid }" v-model="$v.person.firstName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.person.lastName')" for="person-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="person-lastName"
                            :class="{'valid': !$v.person.lastName.$invalid, 'invalid': $v.person.lastName.$invalid }" v-model="$v.person.lastName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.person.birthDate')" for="person-birthDate">Birth Date</label>
                        <div class="d-flex">
                            <input id="person-birthDate" type="datetime-local" class="form-control" name="birthDate" :class="{'valid': !$v.person.birthDate.$invalid, 'invalid': $v.person.birthDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.person.birthDate.$model)"
                            @change="updateInstantField('birthDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.person.phoneNumber')" for="person-phoneNumber">Phone Number</label>
                        <input type="number" class="form-control" name="phoneNumber" id="person-phoneNumber"
                            :class="{'valid': !$v.person.phoneNumber.$invalid, 'invalid': $v.person.phoneNumber.$invalid }" v-model.number="$v.person.phoneNumber.$model" />
                    </div>
                    <div class="form-group">
                        <label v-text="$t('griviApp.person.company')" for="person-company">Company</label>
                        <select class="form-control" id="person-company" multiple name="company" v-model="person.companies">
                            <option v-bind:value="getSelected(person.companies, companyOption)" v-for="companyOption in companies" :key="companyOption.id">{{companyOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('griviApp.person.location')" for="person-location">Location</label>
                        <select class="form-control" id="person-location" multiple name="location" v-model="person.locations">
                            <option v-bind:value="getSelected(person.locations, locationOption)" v-for="locationOption in locations" :key="locationOption.id">{{locationOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.person.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./person-update.component.ts">
</script>
