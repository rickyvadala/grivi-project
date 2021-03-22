<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="channelSubscription">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.channelSubscription.detail.title')">ChannelSubscription</span> {{channelSubscription.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.channelSubscription.person')">Person</span>
                    </dt>
                    <dd>
                        <div v-if="channelSubscription.person">
                            <router-link :to="{name: 'PersonView', params: {personId: channelSubscription.person.id}}">{{channelSubscription.person.person}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.channelSubscription.channel')">Channel</span>
                    </dt>
                    <dd>
                        <div v-if="channelSubscription.channel">
                            <router-link :to="{name: 'ChannelView', params: {channelId: channelSubscription.channel.id}}">{{channelSubscription.channel.channel}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="channelSubscription.id" :to="{name: 'ChannelSubscriptionEdit', params: {channelSubscriptionId: channelSubscription.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./channel-subscription-details.component.ts">
</script>
