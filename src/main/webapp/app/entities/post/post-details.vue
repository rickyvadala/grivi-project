<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="post">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.post.detail.title')">Post</span> {{post.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.post.text')">Text</span>
                    </dt>
                    <dd>
                        <span>{{post.text}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.post.photoUrl')">Photo Url</span>
                    </dt>
                    <dd>
                        <span>{{post.photoUrl}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="post.id" :to="{name: 'PostEdit', params: {postId: post.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./post-details.component.ts">
</script>
