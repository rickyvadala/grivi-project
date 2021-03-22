<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.company.home.createOrEditLabel" v-text="$t('griviApp.company.home.createOrEditLabel')">Create or edit a Company</h2>
                <div>
                    <div class="form-group" v-if="company.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="company.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.company.name')" for="company-name">Name</label>
                        <input type="text" class="form-control" name="name" id="company-name"
                            :class="{'valid': !$v.company.name.$invalid, 'invalid': $v.company.name.$invalid }" v-model="$v.company.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.company.description')" for="company-description">Description</label>
                        <input type="text" class="form-control" name="description" id="company-description"
                            :class="{'valid': !$v.company.description.$invalid, 'invalid': $v.company.description.$invalid }" v-model="$v.company.description.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.company.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./company-update.component.ts">
</script>
