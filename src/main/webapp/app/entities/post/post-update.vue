<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.post.home.createOrEditLabel" v-text="$t('griviApp.post.home.createOrEditLabel')">Create or edit a Post</h2>
                <div>
                    <div class="form-group" v-if="post.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="post.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.post.text')" for="post-text">Text</label>
                        <input type="text" class="form-control" name="text" id="post-text"
                            :class="{'valid': !$v.post.text.$invalid, 'invalid': $v.post.text.$invalid }" v-model="$v.post.text.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.post.photoUrl')" for="post-photoUrl">Photo Url</label>
                        <input type="text" class="form-control" name="photoUrl" id="post-photoUrl"
                            :class="{'valid': !$v.post.photoUrl.$invalid, 'invalid': $v.post.photoUrl.$invalid }" v-model="$v.post.photoUrl.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.post.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./post-update.component.ts">
</script>
