<template>
    <div>
        <b-button variant="primary">
            <font-awesome-icon icon="phone-volume"></font-awesome-icon>
        </b-button>
        <b-button variant="warning">
            <font-awesome-icon icon="video"></font-awesome-icon>
        </b-button>
        <b-button variant="success">
            <font-awesome-icon icon="comments"></font-awesome-icon>
        </b-button>
    </div>
</template>

<script lang="ts" src="./contact-buttons.component.ts"></script>

<style scoped>

button {
    border-radius: 15px 0 15px 0;
    min-width: 4rem;
}

</style>
