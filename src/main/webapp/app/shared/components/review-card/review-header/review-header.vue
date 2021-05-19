<template>
    <div>
        <h1>{{ fullName }}</h1>
        <h2>{{ activity }}</h2>
        <div class="rating_container">
            <span class="rating">{{ rating }}</span>
            <b-form-rating
                icon-empty="heart"
                icon-half="heart-half"
                icon-full="heart-fill"
                variant="danger"
                precision="2"
                size="lg"
                no-border inline readonly
                v-model="rating">
            </b-form-rating>
            <span v-if="reviews" class="rating">({{ reviews.length }} Reviews)</span>
        </div>
    </div>
</template>

<script lang="ts" src="./review-header.component.ts"></script>

<style scoped>
.rating_container {
    display: flex;
    align-items: center;
}

.rating {
    font-weight: bold;
    margin-bottom: 2px;
}

.readonly {
    background-color: white;
}

</style>
