<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.reviewDet.home.title')" id="review-det-heading">Review Dets</span>
            <router-link :to="{name: 'ReviewDetCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-review-det">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.reviewDet.home.createLabel')">
                    Create a new Review Det
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && reviewDets && reviewDets.length === 0">
            <span v-text="$t('griviApp.reviewDet.home.notFound')">No reviewDets found</span>
        </div>
        <div class="table-responsive" v-if="reviewDets && reviewDets.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.reviewDet.rate')">Rate</span></th>
                    <th><span v-text="$t('griviApp.reviewDet.review')">Review</span></th>
                    <th><span v-text="$t('griviApp.reviewDet.question')">Question</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="reviewDet in reviewDets"
                    :key="reviewDet.id">
                    <td>
                        <router-link :to="{name: 'ReviewDetView', params: {reviewDetId: reviewDet.id}}">{{reviewDet.id}}</router-link>
                    </td>
                    <td>{{reviewDet.rate}}</td>
                    <td>
                        <div v-if="reviewDet.review">
                            <router-link :to="{name: 'ReviewView', params: {reviewId: reviewDet.review.id}}">{{reviewDet.review.review}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="reviewDet.question">
                            <router-link :to="{name: 'NotificationView', params: {notificationId: reviewDet.question.id}}">{{reviewDet.question.question}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ReviewDetView', params: {reviewDetId: reviewDet.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReviewDetEdit', params: {reviewDetId: reviewDet.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(reviewDet)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="griviApp.reviewDet.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-reviewDet-heading" v-text="$t('griviApp.reviewDet.delete.question', {'id': removeId})">Are you sure you want to delete this Review Det?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-reviewDet" v-text="$t('entity.action.delete')" v-on:click="removeReviewDet()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./review-det.component.ts">
</script>
