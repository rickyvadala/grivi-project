<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="review">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.review.detail.title')">Review</span> {{review.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.review.avgRate')">Avg Rate</span>
                    </dt>
                    <dd>
                        <span>{{review.avgRate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.review.date')">Date</span>
                    </dt>
                    <dd>
                        <span v-if="review.date">{{$d(Date.parse(review.date), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.review.client')">Client</span>
                    </dt>
                    <dd>
                        <div v-if="review.client">
                            <router-link :to="{name: 'PersonView', params: {personId: review.client.id}}">{{review.client.person}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.review.provider')">Provider</span>
                    </dt>
                    <dd>
                        <div v-if="review.provider">
                            <router-link :to="{name: 'ProviderProfessionView', params: {providerProfessionId: review.provider.id}}">{{review.provider.person}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="review.id" :to="{name: 'ReviewEdit', params: {reviewId: review.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./review-details.component.ts">
</script>
