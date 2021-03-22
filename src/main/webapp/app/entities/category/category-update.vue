<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.category.home.createOrEditLabel" v-text="$t('griviApp.category.home.createOrEditLabel')">Create or edit a Category</h2>
                <div>
                    <div class="form-group" v-if="category.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="category.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.category.name')" for="category-name">Name</label>
                        <input type="text" class="form-control" name="name" id="category-name"
                            :class="{'valid': !$v.category.name.$invalid, 'invalid': $v.category.name.$invalid }" v-model="$v.category.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.category.description')" for="category-description">Description</label>
                        <input type="text" class="form-control" name="description" id="category-description"
                            :class="{'valid': !$v.category.description.$invalid, 'invalid': $v.category.description.$invalid }" v-model="$v.category.description.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.category.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./category-update.component.ts">
</script>
