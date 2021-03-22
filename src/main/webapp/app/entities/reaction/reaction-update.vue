<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.reaction.home.createOrEditLabel" v-text="$t('griviApp.reaction.home.createOrEditLabel')">Create or edit a Reaction</h2>
                <div>
                    <div class="form-group" v-if="reaction.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="reaction.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reaction.type')" for="reaction-type">Type</label>
                        <input type="text" class="form-control" name="type" id="reaction-type"
                            :class="{'valid': !$v.reaction.type.$invalid, 'invalid': $v.reaction.type.$invalid }" v-model="$v.reaction.type.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reaction.person')" for="reaction-person">Person</label>
                        <select class="form-control" id="reaction-person" name="person" v-model="reaction.person">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reaction.person && personOption.id === reaction.person.id ? reaction.person : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.person}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reaction.post')" for="reaction-post">Post</label>
                        <select class="form-control" id="reaction-post" name="post" v-model="reaction.post">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reaction.post && postOption.id === reaction.post.id ? reaction.post : postOption" v-for="postOption in posts" :key="postOption.id">{{postOption.post}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.reaction.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./reaction-update.component.ts">
</script>
