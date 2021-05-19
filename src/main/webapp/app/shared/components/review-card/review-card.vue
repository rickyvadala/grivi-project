<template>
    <div class="mb-3">
        <b-card header-tag="header" footer-tag="footer">
            <template #header>
                <div class="header_review_avatar">
                    <b-avatar variant="warning" class="review_avatar" size="2em"></b-avatar>
                    <h6 class="mb-0 ml-3">John Doe</h6>
                </div>
            </template>
            <b-card-text>
                <review-header-component :full-name="fullName"
                                         :activity="activity"
                                         :rating="rating"
                                         :reviews="reviews"
                                         :text="text"
                ></review-header-component>
            </b-card-text>
            <see-more-less-component v-if="text" :text="text"></see-more-less-component>
            <template #footer>
                <em>{{ date | formatDate2 }}</em>
            </template>
        </b-card>
    </div>
</template>

<script lang="ts" src="./review-card.component.ts"></script>

<style scoped>
.header_review_avatar {
    display: flex;
    align-items: center;
}
</style>
