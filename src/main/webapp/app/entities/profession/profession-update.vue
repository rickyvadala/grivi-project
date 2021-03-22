<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.profession.home.createOrEditLabel" v-text="$t('griviApp.profession.home.createOrEditLabel')">Create or edit a Profession</h2>
                <div>
                    <div class="form-group" v-if="profession.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="profession.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.profession.name')" for="profession-name">Name</label>
                        <input type="text" class="form-control" name="name" id="profession-name"
                            :class="{'valid': !$v.profession.name.$invalid, 'invalid': $v.profession.name.$invalid }" v-model="$v.profession.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.profession.description')" for="profession-description">Description</label>
                        <input type="text" class="form-control" name="description" id="profession-description"
                            :class="{'valid': !$v.profession.description.$invalid, 'invalid': $v.profession.description.$invalid }" v-model="$v.profession.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.profession.category')" for="profession-category">Category</label>
                        <select class="form-control" id="profession-category" name="category" v-model="profession.category">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="profession.category && categoryOption.id === profession.category.id ? profession.category : categoryOption" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.category}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.profession.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./profession-update.component.ts">
</script>
