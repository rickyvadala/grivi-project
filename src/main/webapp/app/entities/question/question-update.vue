<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.question.home.createOrEditLabel" v-text="$t('griviApp.question.home.createOrEditLabel')">Create or edit a Question</h2>
                <div>
                    <div class="form-group" v-if="question.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="question.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.question.name')" for="question-name">Name</label>
                        <input type="text" class="form-control" name="name" id="question-name"
                            :class="{'valid': !$v.question.name.$invalid, 'invalid': $v.question.name.$invalid }" v-model="$v.question.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.question.text')" for="question-text">Text</label>
                        <input type="text" class="form-control" name="text" id="question-text"
                            :class="{'valid': !$v.question.text.$invalid, 'invalid': $v.question.text.$invalid }" v-model="$v.question.text.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.question.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./question-update.component.ts">
</script>
