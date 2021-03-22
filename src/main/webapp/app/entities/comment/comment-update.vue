<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.comment.home.createOrEditLabel" v-text="$t('griviApp.comment.home.createOrEditLabel')">Create or edit a Comment</h2>
                <div>
                    <div class="form-group" v-if="comment.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="comment.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.comment.postFrom')" for="comment-postFrom">Post From</label>
                        <select class="form-control" id="comment-postFrom" name="postFrom" v-model="comment.postFrom">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="comment.postFrom && postOption.id === comment.postFrom.id ? comment.postFrom : postOption" v-for="postOption in posts" :key="postOption.id">{{postOption.postFrom}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.comment.post')" for="comment-post">Post</label>
                        <select class="form-control" id="comment-post" name="post" v-model="comment.post">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="comment.post && postOption.id === comment.post.id ? comment.post : postOption" v-for="postOption in posts" :key="postOption.id">{{postOption.post}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.comment.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./comment-update.component.ts">
</script>
