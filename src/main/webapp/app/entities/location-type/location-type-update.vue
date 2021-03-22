<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.locationType.home.createOrEditLabel" v-text="$t('griviApp.locationType.home.createOrEditLabel')">Create or edit a LocationType</h2>
                <div>
                    <div class="form-group" v-if="locationType.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="locationType.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.locationType.name')" for="location-type-name">Name</label>
                        <input type="text" class="form-control" name="name" id="location-type-name"
                            :class="{'valid': !$v.locationType.name.$invalid, 'invalid': $v.locationType.name.$invalid }" v-model="$v.locationType.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.locationType.description')" for="location-type-description">Description</label>
                        <input type="text" class="form-control" name="description" id="location-type-description"
                            :class="{'valid': !$v.locationType.description.$invalid, 'invalid': $v.locationType.description.$invalid }" v-model="$v.locationType.description.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.locationType.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./location-type-update.component.ts">
</script>
