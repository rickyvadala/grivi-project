<template>
    <div>
        <profile-banner-component></profile-banner-component>

        <review-header-component class="mt-3" :full-name="fullName"
                                 :activity="activity"
                                 :rating="rating"
                                 :reviews="reviews">
        </review-header-component>

        <contact-buttons-component class="mt-2"></contact-buttons-component>

        <see-more-less-component :text="text"></see-more-less-component>

        <review-card-component :full-name="fullName"
                               :activity="activity"
                               :rating="rating"
                               :text="text"
                               :date="date">
        </review-card-component>
    </div>
</template>

<script lang="ts" src="./profile.component.ts"></script>

<style scoped>


</style>
