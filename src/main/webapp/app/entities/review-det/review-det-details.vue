<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="reviewDet">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.reviewDet.detail.title')">ReviewDet</span> {{reviewDet.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.reviewDet.rate')">Rate</span>
                    </dt>
                    <dd>
                        <span>{{reviewDet.rate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reviewDet.review')">Review</span>
                    </dt>
                    <dd>
                        <div v-if="reviewDet.review">
                            <router-link :to="{name: 'ReviewView', params: {reviewId: reviewDet.review.id}}">{{reviewDet.review.review}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reviewDet.question')">Question</span>
                    </dt>
                    <dd>
                        <div v-if="reviewDet.question">
                            <router-link :to="{name: 'NotificationView', params: {notificationId: reviewDet.question.id}}">{{reviewDet.question.question}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="reviewDet.id" :to="{name: 'ReviewDetEdit', params: {reviewDetId: reviewDet.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./review-det-details.component.ts">
</script>
