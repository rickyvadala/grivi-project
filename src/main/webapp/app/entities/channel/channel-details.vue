<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="channel">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.channel.detail.title')">Channel</span> {{channel.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.channel.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{channel.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.channel.person')">Person</span>
                    </dt>
                    <dd>
                        <span v-for="(person, i) in channel.people" :key="person.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'PersonView', params: {personId: person.id}}">{{person.id}}</router-link>
                        </span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.channel.category')">Category</span>
                    </dt>
                    <dd>
                        <div v-if="channel.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: channel.category.id}}">{{channel.category.category}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.channel.profession')">Profession</span>
                    </dt>
                    <dd>
                        <div v-if="channel.profession">
                            <router-link :to="{name: 'ProfessionView', params: {professionId: channel.profession.id}}">{{channel.profession.profession}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="channel.id" :to="{name: 'ChannelEdit', params: {channelId: channel.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./channel-details.component.ts">
</script>
