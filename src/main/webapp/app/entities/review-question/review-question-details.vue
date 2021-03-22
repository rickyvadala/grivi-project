<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="reviewQuestion">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.reviewQuestion.detail.title')">ReviewQuestion</span> {{reviewQuestion.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.reviewQuestion.enabled')">Enabled</span>
                    </dt>
                    <dd>
                        <span>{{reviewQuestion.enabled}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reviewQuestion.question')">Question</span>
                    </dt>
                    <dd>
                        <div v-if="reviewQuestion.question">
                            <router-link :to="{name: 'QuestionView', params: {questionId: reviewQuestion.question.id}}">{{reviewQuestion.question.question}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reviewQuestion.category')">Category</span>
                    </dt>
                    <dd>
                        <div v-if="reviewQuestion.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: reviewQuestion.category.id}}">{{reviewQuestion.category.category}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reviewQuestion.profession')">Profession</span>
                    </dt>
                    <dd>
                        <div v-if="reviewQuestion.profession">
                            <router-link :to="{name: 'ProfessionView', params: {professionId: reviewQuestion.profession.id}}">{{reviewQuestion.profession.profession}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.reviewQuestion.providerProfession')">Provider Profession</span>
                    </dt>
                    <dd>
                        <div v-if="reviewQuestion.providerProfession">
                            <router-link :to="{name: 'ProviderProfessionView', params: {providerProfessionId: reviewQuestion.providerProfession.id}}">{{reviewQuestion.providerProfession.providerProfession}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="reviewQuestion.id" :to="{name: 'ReviewQuestionEdit', params: {reviewQuestionId: reviewQuestion.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./review-question-details.component.ts">
</script>
