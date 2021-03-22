<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="reaction">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.reaction.detail.title')">Reaction</span> {{reaction.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.reaction.type')">Type</span>
                    </dt>
                    <dd>
                        <span>{{reaction.type}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reaction.person')">Person</span>
                    </dt>
                    <dd>
                        <div v-if="reaction.person">
                            <router-link :to="{name: 'PersonView', params: {personId: reaction.person.id}}">{{reaction.person.person}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reaction.post')">Post</span>
                    </dt>
                    <dd>
                        <div v-if="reaction.post">
                            <router-link :to="{name: 'PostView', params: {postId: reaction.post.id}}">{{reaction.post.post}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="reaction.id" :to="{name: 'ReactionEdit', params: {reactionId: reaction.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./reaction-details.component.ts">
</script>
