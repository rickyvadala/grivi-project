<template>
    <div class="modal-body">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <b-alert show variant="danger" v-if="authenticationError"
                         v-html="$t('login.messages.error.authentication')">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </b-alert>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <b-form role="form" v-on:submit.prevent="doLogin()">
                    <b-form-group v-bind:label="$t('global.form[\'username.label\']')" label-for="username">
                        <b-form-input id="username" type="text" name="username" autofocus
                                      v-bind:placeholder="$t('global.form[\'username.placeholder\']')" v-model="login">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group v-bind:label="$t('login.form.password')" label-for="password">
                        <b-form-input id="password" type="password" name="password" v-model.trim="name"
                                      v-bind:placeholder="$t('login.form[\'password.placeholder\']')"
                                      v-model="password">
                        </b-form-input>
                    </b-form-group>
                    <b-form-checkbox id="rememberMe" name="rememberMe" v-model="rememberMe" checked>
                        <span v-text="$t('login.form.rememberme')">Remember me</span>
                    </b-form-checkbox>
                    <div class="text-center m-3">
                        <b-button type="submit" variant="primary" v-text="$t('login.form.button')">Sign in</b-button>
                    </div>
                </b-form>
            </div>
        </div>
        <div class="row justify-content-center mt-3">
            <div class="col-md-6 col-12">
                <b-link :to="'/account/reset/request'" class="alert-link" v-text="$t('login.password.forgot')">Did you
                    forget your password?
                </b-link>
            </div>
        </div>
        <div class="row justify-content-center mt-3">
            <div class="col-md-6 col-12">
                <b-link :to="'/register'" class="alert-link" v-text="$t('global.messages.info.register.link')">Register
                    a new account
                </b-link>
            </div>
        </div>
    </div>
    </div>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>
