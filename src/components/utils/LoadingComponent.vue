<template>
    <q-inner-loading :showing="loading" class="loading">
        <div class="column flex-center full-height full-width">
            <q-spinner-orbit size="50px" color="white" />
            <div class="text-white text-bold q-mt-sm" style="font-size: 1.1em;">
                Espere por favor...
            </div>
        </div>
    </q-inner-loading>
</template>

<script setup>
defineProps({
    loading: Boolean
})
</script>

<style scoped>
.loading {
    z-index: 9999;
    background-color: var(--q-loading);
}
</style>