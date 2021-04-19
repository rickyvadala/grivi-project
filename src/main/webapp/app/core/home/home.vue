<template>
    <div class="home">
        <div class="row" v-if="!authenticated" :style="{'height': getMainContainerHeight()}">
            <div class="col-md-6 m-auto">
                <h1 class="display-4 text-center" v-text="$t('home.title')">Grivi!</h1>
                <login-form></login-form>
            </div>
            <div class="col-md-6 home--login-image d-none d-lg-block p-0">
                <span class="hipster img-fluid rounded"></span>
            </div>
        </div>
        <div class="alert alert-success" v-if="authenticated">
            <span v-if="username" v-text="$t('home.logged.message', { 'username': username})">You are logged in as user "{{
                    username
                }}"</span>
        </div>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
