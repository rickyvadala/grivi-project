<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.review.home.createOrEditLabel" v-text="$t('griviApp.review.home.createOrEditLabel')">Create or edit a Review</h2>
                <div>
                    <div class="form-group" v-if="review.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="review.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.review.avgRate')" for="review-avgRate">Avg Rate</label>
                        <input type="number" class="form-control" name="avgRate" id="review-avgRate"
                            :class="{'valid': !$v.review.avgRate.$invalid, 'invalid': $v.review.avgRate.$invalid }" v-model.number="$v.review.avgRate.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.review.date')" for="review-date">Date</label>
                        <div class="d-flex">
                            <input id="review-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.review.date.$invalid, 'invalid': $v.review.date.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.review.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.review.client')" for="review-client">Client</label>
                        <select class="form-control" id="review-client" name="client" v-model="review.client">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="review.client && personOption.id === review.client.id ? review.client : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.person}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.review.provider')" for="review-provider">Provider</label>
                        <select class="form-control" id="review-provider" name="provider" v-model="review.provider">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="review.provider && personOption.id === review.provider.id ? review.provider : personOption" v-for="personOption in people" :key="personOption.id">{{personOption.person}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.review.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./review-update.component.ts">
</script>
