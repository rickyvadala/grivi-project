<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.comment.home.title')" id="comment-heading">Comments</span>
            <router-link :to="{name: 'CommentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-comment">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.comment.home.createLabel')">
                    Create a new Comment
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && comments && comments.length === 0">
            <span v-text="$t('griviApp.comment.home.notFound')">No comments found</span>
        </div>
        <div class="table-responsive" v-if="comments && comments.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.comment.postFrom')">Post From</span></th>
                    <th><span v-text="$t('griviApp.comment.post')">Post</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="comment in comments"
                    :key="comment.id">
                    <td>
                        <router-link :to="{name: 'CommentView', params: {commentId: comment.id}}">{{comment.id}}</router-link>
                    </td>
                    <td>
                        <div v-if="comment.postFrom">
                            <router-link :to="{name: 'PostView', params: {postId: comment.postFrom.id}}">{{comment.postFrom.postFrom}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="comment.post">
                            <router-link :to="{name: 'PostView', params: {postId: comment.post.id}}">{{comment.post.post}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CommentView', params: {commentId: comment.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CommentEdit', params: {commentId: comment.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(comment)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="griviApp.comment.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-comment-heading" v-text="$t('griviApp.comment.delete.question', {'id': removeId})">Are you sure you want to delete this Comment?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-comment" v-text="$t('entity.action.delete')" v-on:click="removeComment()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./comment.component.ts">
</script>
