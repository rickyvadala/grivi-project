<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="griviApp.channel.home.createOrEditLabel" v-text="$t('griviApp.channel.home.createOrEditLabel')">Create or edit a Channel</h2>
                <div>
                    <div class="form-group" v-if="channel.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="channel.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.channel.name')" for="channel-name">Name</label>
                        <input type="text" class="form-control" name="name" id="channel-name"
                            :class="{'valid': !$v.channel.name.$invalid, 'invalid': $v.channel.name.$invalid }" v-model="$v.channel.name.$model" />
                    </div>
                    <div class="form-group">
                        <label v-text="$t('griviApp.channel.person')" for="channel-person">Person</label>
                        <select class="form-control" id="channel-person" multiple name="person" v-model="channel.people">
                            <option v-bind:value="getSelected(channel.people, personOption)" v-for="personOption in people" :key="personOption.id">{{personOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.channel.category')" for="channel-category">Category</label>
                        <select class="form-control" id="channel-category" name="category" v-model="channel.category">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="channel.category && categoryOption.id === channel.category.id ? channel.category : categoryOption" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.category}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('griviApp.channel.profession')" for="channel-profession">Profession</label>
                        <select class="form-control" id="channel-profession" name="profession" v-model="channel.profession">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="channel.profession && professionOption.id === channel.profession.id ? channel.profession : professionOption" v-for="professionOption in professions" :key="professionOption.id">{{professionOption.profession}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.channel.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./channel-update.component.ts">
</script>
