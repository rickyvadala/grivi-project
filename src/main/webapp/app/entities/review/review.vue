<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.review.home.title')" id="review-heading">Reviews</span>
            <router-link :to="{name: 'ReviewCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-review">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.review.home.createLabel')">
                    Create a new Review
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
        <div class="alert alert-warning" v-if="!isFetching && reviews && reviews.length === 0">
            <span v-text="$t('griviApp.review.home.notFound')">No reviews found</span>
        </div>
        <div class="table-responsive" v-if="reviews && reviews.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.review.avgRate')">Avg Rate</span></th>
                    <th><span v-text="$t('griviApp.review.date')">Date</span></th>
                    <th><span v-text="$t('griviApp.review.client')">Client</span></th>
                    <th><span v-text="$t('griviApp.review.provider')">Provider</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="review in reviews"
                    :key="review.id">
                    <td>
                        <router-link :to="{name: 'ReviewView', params: {reviewId: review.id}}">{{review.id}}</router-link>
                    </td>
                    <td>{{review.avgRate}}</td>
                    <td>{{review.date ? $d(Date.parse(review.date), 'short') : ''}}</td>
                    <td>
                        <div v-if="review.client">
                            <router-link :to="{name: 'PersonView', params: {personId: review.client.id}}">{{review.client.person}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="review.provider">
                            <router-link :to="{name: 'ProviderProfessionView', params: {providerProfessionId: review.provider.id}}">{{review.provider.person}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ReviewView', params: {reviewId: review.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReviewEdit', params: {reviewId: review.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(review)"
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
            <span slot="modal-title"><span id="griviApp.review.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-review-heading" v-text="$t('griviApp.review.delete.question', {'id': removeId})">Are you sure you want to delete this Review?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-review" v-text="$t('entity.action.delete')" v-on:click="removeReview()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./review.component.ts">
</script>
