<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="providerProfession">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.providerProfession.detail.title')">ProviderProfession</span> {{providerProfession.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.providerProfession.person')">Person</span>
                    </dt>
                    <dd>
                        <div v-if="providerProfession.person">
                            <router-link :to="{name: 'PersonView', params: {personId: providerProfession.person.id}}">{{providerProfession.person.provider}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.providerProfession.profession')">Profession</span>
                    </dt>
                    <dd>
                        <div v-if="providerProfession.profession">
                            <router-link :to="{name: 'ProfessionView', params: {professionId: providerProfession.profession.id}}">{{providerProfession.profession.profession}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="providerProfession.id" :to="{name: 'ProviderProfessionEdit', params: {providerProfessionId: providerProfession.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./provider-profession-details.component.ts">
</script>
