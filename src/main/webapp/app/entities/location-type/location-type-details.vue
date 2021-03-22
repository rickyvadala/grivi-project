<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="locationType">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.locationType.detail.title')">LocationType</span> {{locationType.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.locationType.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{locationType.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.locationType.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{locationType.description}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="locationType.id" :to="{name: 'LocationTypeEdit', params: {locationTypeId: locationType.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./location-type-details.component.ts">
</script>
