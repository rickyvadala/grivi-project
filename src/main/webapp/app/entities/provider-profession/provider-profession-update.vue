<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.providerProfession.home.createOrEditLabel" v-text="$t('griviApp.providerProfession.home.createOrEditLabel')">Create or edit a ProviderProfession</h2>
                <div>
                    <div class="form-group" v-if="providerProfession.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="providerProfession.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.providerProfession.person')" for="provider-profession-person">Person</label>
                        <select class="form-control" id="provider-profession-person" name="person" v-model="providerProfession.person">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="providerProfession.person && personOption.id === providerProfession.person.id ? providerProfession.person : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.provider}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.providerProfession.profession')" for="provider-profession-profession">Profession</label>
                        <select class="form-control" id="provider-profession-profession" name="profession" v-model="providerProfession.profession">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="providerProfession.profession && professionOption.id === providerProfession.profession.id ? providerProfession.profession : professionOption" v-for="professionOption in professions" :key="professionOption.id">{{professionOption.profession}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.providerProfession.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./provider-profession-update.component.ts">
</script>
