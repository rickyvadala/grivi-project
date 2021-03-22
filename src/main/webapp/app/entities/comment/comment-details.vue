<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="comment">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.comment.detail.title')">Comment</span> {{comment.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.comment.postFrom')">Post From</span>
                    </dt>
                    <dd>
                        <div v-if="comment.postFrom">
                            <router-link :to="{name: 'PostView', params: {postId: comment.postFrom.id}}">{{comment.postFrom.postFrom}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.comment.post')">Post</span>
                    </dt>
                    <dd>
                        <div v-if="comment.post">
                            <router-link :to="{name: 'PostView', params: {postId: comment.post.id}}">{{comment.post.post}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="comment.id" :to="{name: 'CommentEdit', params: {commentId: comment.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./comment-details.component.ts">
</script>
