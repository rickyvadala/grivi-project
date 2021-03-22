<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.reviewQuestion.home.createOrEditLabel" v-text="$t('griviApp.reviewQuestion.home.createOrEditLabel')">Create or edit a ReviewQuestion</h2>
                <div>
                    <div class="form-group" v-if="reviewQuestion.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="reviewQuestion.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewQuestion.enabled')" for="review-question-enabled">Enabled</label>
                        <input type="checkbox" class="form-check" name="enabled" id="review-question-enabled"
                            :class="{'valid': !$v.reviewQuestion.enabled.$invalid, 'invalid': $v.reviewQuestion.enabled.$invalid }" v-model="$v.reviewQuestion.enabled.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewQuestion.question')" for="review-question-question">Question</label>
                        <select class="form-control" id="review-question-question" name="question" v-model="reviewQuestion.question">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reviewQuestion.question && questionOption.id === reviewQuestion.question.id ? reviewQuestion.question : questionOption" v-for="questionOption in questions" :key="questionOption.id">{{questionOption.question}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewQuestion.category')" for="review-question-category">Category</label>
                        <select class="form-control" id="review-question-category" name="category" v-model="reviewQuestion.category">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reviewQuestion.category && categoryOption.id === reviewQuestion.category.id ? reviewQuestion.category : categoryOption" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.category}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewQuestion.profession')" for="review-question-profession">Profession</label>
                        <select class="form-control" id="review-question-profession" name="profession" v-model="reviewQuestion.profession">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reviewQuestion.profession && professionOption.id === reviewQuestion.profession.id ? reviewQuestion.profession : professionOption" v-for="professionOption in professions" :key="professionOption.id">{{professionOption.profession}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.reviewQuestion.providerProfession')" for="review-question-providerProfession">Provider Profession</label>
                        <select class="form-control" id="review-question-providerProfession" name="providerProfession" v-model="reviewQuestion.providerProfession">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="reviewQuestion.providerProfession && providerProfessionOption.id === reviewQuestion.providerProfession.id ? reviewQuestion.providerProfession : providerProfessionOption" v-for="providerProfessionOption in providerProfessions" :key="providerProfessionOption.id">{{providerProfessionOption.providerProfession}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.reviewQuestion.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./review-question-update.component.ts">
</script>
