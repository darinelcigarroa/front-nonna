<script setup>
import { useAuthStore } from 'stores/auth-store'
import { computed } from 'vue'

const props = defineProps({
    roles: Array
})

const auth = useAuthStore()

const canShow = computed(() => {
    return auth.hasAnyRole(props.roles)
})
</script>

<template>
    <slot v-if="canShow"></slot>
</template>
