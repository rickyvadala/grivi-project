<template>
    <p class="mt-3">
        {{ profileText.less }}
        <span class="dots" v-show="!more">...</span>
        <span class="more" v-show="more">{{ profileText.more }}</span>
        <span class="see_more" @click="toggleText">{{ buttonText() }}</span>
    </p>
</template>

<script lang="ts" src="./see-more-less.component.ts"></script>

<style scoped>
    .see_more {
        color: #17a2b8;
        white-space: pre;
        cursor: pointer;
    }
</style>
