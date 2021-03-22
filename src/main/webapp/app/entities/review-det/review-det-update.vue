<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.reviewDet.home.createOrEditLabel" v-text="$t('griviApp.reviewDet.home.createOrEditLabel')">Create or edit a ReviewDet</h2>
                <div>
                    <div class="form-group" v-if="reviewDet.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="reviewDet.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewDet.rate')" for="review-det-rate">Rate</label>
                        <input type="number" class="form-control" name="rate" id="review-det-rate"
                            :class="{'valid': !$v.reviewDet.rate.$invalid, 'invalid': $v.reviewDet.rate.$invalid }" v-model.number="$v.reviewDet.rate.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewDet.review')" for="review-det-review">Review</label>
                        <select class="form-control" id="review-det-review" name="review" v-model="reviewDet.review">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reviewDet.review && reviewOption.id === reviewDet.review.id ? reviewDet.review : reviewOption" v-for="reviewOption in reviews" :key="reviewOption.id">{{reviewOption.review}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewDet.question')" for="review-det-question">Question</label>
                        <select class="form-control" id="review-det-question" name="question" v-model="reviewDet.question">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reviewDet.question && notificationOption.id === reviewDet.question.id ? reviewDet.question : notificationOption" v-for="notificationOption in notifications" :key="notificationOption.id">{{notificationOption.question}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.reviewDet.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./review-det-update.component.ts">
</script>
