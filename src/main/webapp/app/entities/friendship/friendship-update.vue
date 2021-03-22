<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.friendship.home.createOrEditLabel" v-text="$t('griviApp.friendship.home.createOrEditLabel')">Create or edit a Friendship</h2>
                <div>
                    <div class="form-group" v-if="friendship.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="friendship.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.friendship.personOrigin')" for="friendship-personOrigin">Person Origin</label>
                        <select class="form-control" id="friendship-personOrigin" name="personOrigin" v-model="friendship.personOrigin">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="friendship.personOrigin && personOption.id === friendship.personOrigin.id ? friendship.personOrigin : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.personOrigin}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.friendship.personAddressee')" for="friendship-personAddressee">Person Addressee</label>
                        <select class="form-control" id="friendship-personAddressee" name="personAddressee" v-model="friendship.personAddressee">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="friendship.personAddressee && personOption.id === friendship.personAddressee.id ? friendship.personAddressee : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.personAddressee}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.friendship.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./friendship-update.component.ts">
</script>
