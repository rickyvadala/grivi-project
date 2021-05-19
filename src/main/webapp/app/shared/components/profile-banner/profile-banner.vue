<template>
    <div class="profile_banner_container">
        <b-avatar variant="warning" class="profile_avatar" size="4em"></b-avatar>
    </div>
</template>

<script lang="ts" src="./profile-banner.component.ts"></script>

<style scoped>
.profile_banner_container {
    width: calc(100% + 30px);
    background: #17a2b8;
    height: 200px;
    margin-left: -15px;
}

.profile_avatar {
    position: absolute;
    top: 2rem;
    right: 2rem;
}
</style>
