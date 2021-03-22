<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="friendship">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.friendship.detail.title')">Friendship</span> {{friendship.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.friendship.personOrigin')">Person Origin</span>
                    </dt>
                    <dd>
                        <div v-if="friendship.personOrigin">
                            <router-link :to="{name: 'PersonView', params: {personId: friendship.personOrigin.id}}">{{friendship.personOrigin.personOrigin}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.friendship.personAddressee')">Person Addressee</span>
                    </dt>
                    <dd>
                        <div v-if="friendship.personAddressee">
                            <router-link :to="{name: 'PersonView', params: {personId: friendship.personAddressee.id}}">{{friendship.personAddressee.personAddressee}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="friendship.id" :to="{name: 'FriendshipEdit', params: {friendshipId: friendship.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./friendship-details.component.ts">
</script>
