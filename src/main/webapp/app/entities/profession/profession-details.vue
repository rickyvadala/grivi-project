<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="profession">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.profession.detail.title')">Profession</span> {{profession.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.profession.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{profession.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.profession.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{profession.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.profession.category')">Category</span>
                    </dt>
                    <dd>
                        <div v-if="profession.category">
                            <router-link :to="{name: 'CategoryView', params: {categoryId: profession.category.id}}">{{profession.category.category}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="profession.id" :to="{name: 'ProfessionEdit', params: {professionId: profession.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./profession-details.component.ts">
</script>
