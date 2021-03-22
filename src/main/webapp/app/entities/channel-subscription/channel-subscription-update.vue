<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.channelSubscription.home.createOrEditLabel" v-text="$t('griviApp.channelSubscription.home.createOrEditLabel')">Create or edit a ChannelSubscription</h2>
                <div>
                    <div class="form-group" v-if="channelSubscription.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="channelSubscription.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.channelSubscription.person')" for="channel-subscription-person">Person</label>
                        <select class="form-control" id="channel-subscription-person" name="person" v-model="channelSubscription.person">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="channelSubscription.person && personOption.id === channelSubscription.person.id ? channelSubscription.person : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.person}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.channelSubscription.channel')" for="channel-subscription-channel">Channel</label>
                        <select class="form-control" id="channel-subscription-channel" name="channel" v-model="channelSubscription.channel">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="channelSubscription.channel && channelOption.id === channelSubscription.channel.id ? channelSubscription.channel : channelOption" v-for="channelOption in channels" :key="channelOption.id">{{channelOption.channel}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.channelSubscription.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./channel-subscription-update.component.ts">
</script>
