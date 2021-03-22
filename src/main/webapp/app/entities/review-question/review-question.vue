<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('griviApp.reviewQuestion.home.title')" id="review-question-heading">Review Questions</span>
            <router-link :to="{name: 'ReviewQuestionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-review-question">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('griviApp.reviewQuestion.home.createLabel')">
                    Create a new Review Question
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
        <div class="alert alert-warning" v-if="!isFetching && reviewQuestions && reviewQuestions.length === 0">
            <span v-text="$t('griviApp.reviewQuestion.home.notFound')">No reviewQuestions found</span>
        </div>
        <div class="table-responsive" v-if="reviewQuestions && reviewQuestions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('griviApp.reviewQuestion.enabled')">Enabled</span></th>
                    <th><span v-text="$t('griviApp.reviewQuestion.question')">Question</span></th>
                    <th><span v-text="$t('griviApp.reviewQuestion.category')">Category</span></th>
                    <th><span v-text="$t('griviApp.reviewQuestion.profession')">Profession</span></th>
                    <th><span v-text="$t('griviApp.reviewQuestion.providerProfession')">Provider Profession</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="reviewQuestion in reviewQuestions"
                    :key="reviewQuestion.id">
                    <td>
                        <router-link :to="{name: 'ReviewQuestionView', params: {reviewQuestionId: reviewQuestion.id}}">{{reviewQuestion.id}}</router-link>
                    </td>
                    <td>{{reviewQuestion.enabled}}</td>
                    <td>
                        <div v-if="reviewQuestion.question">
                            <router-link :to="{name: 'QuestionView', params: {questionId: reviewQuestion.question.id}}">{{reviewQuestion.question.question}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="reviewQuestion.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: reviewQuestion.category.id}}">{{reviewQuestion.category.category}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="reviewQuestion.profession">
                            <router-link :to="{name: 'ProfessionView', params: {professionId: reviewQuestion.profession.id}}">{{reviewQuestion.profession.profession}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="reviewQuestion.providerProfession">
                            <router-link :to="{name: 'ProviderProfessionView', params: {providerProfessionId: reviewQuestion.providerProfession.id}}">{{reviewQuestion.providerProfession.providerProfession}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ReviewQuestionView', params: {reviewQuestionId: reviewQuestion.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReviewQuestionEdit', params: {reviewQuestionId: reviewQuestion.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(reviewQuestion)"
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
            <span slot="modal-title"><span id="griviApp.reviewQuestion.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-reviewQuestion-heading" v-text="$t('griviApp.reviewQuestion.delete.question', {'id': removeId})">Are you sure you want to delete this Review Question?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-reviewQuestion" v-text="$t('entity.action.delete')" v-on:click="removeReviewQuestion()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./review-question.component.ts">
</script>
