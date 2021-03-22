<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="person">
                <h2 class="jh-entity-heading"><span v-text="$t('griviApp.person.detail.title')">Person</span> {{person.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('griviApp.person.firstName')">First Name</span>
                    </dt>
                    <dd>
                        <span>{{person.firstName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.person.lastName')">Last Name</span>
                    </dt>
                    <dd>
                        <span>{{person.lastName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.person.birthDate')">Birth Date</span>
                    </dt>
                    <dd>
                        <span v-if="person.birthDate">{{$d(Date.parse(person.birthDate), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.person.phoneNumber')">Phone Number</span>
                    </dt>
                    <dd>
                        <span>{{person.phoneNumber}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.person.company')">Company</span>
                    </dt>
                    <dd>
                        <span v-for="(company, i) in person.companies" :key="company.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'CompanyView', params: {companyId: company.id}}">{{company.id}}</router-link>
                        </span>
                    </dd>
                    <dt>
                        <span v-text="$t('griviApp.person.location')">Location</span>
                    </dt>
                    <dd>
                        <span v-for="(location, i) in person.locations" :key="location.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'LocationView', params: {locationId: location.id}}">{{location.id}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="person.id" :to="{name: 'PersonEdit', params: {personId: person.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./person-details.component.ts">
</script>
