<template>
    <q-item-label style="position: relative; overflow: hidden; height: auto; transition: height 0.3s ease;">
        <transition appear :key="`${itemKey}-${forceRender}`" :enter-active-class="enterClass"
            :leave-active-class="leaveClass" @before-leave="setHeight" @leave="collapseHeight"
            @after-leave="resetHeight">
            <div :key="itemKey" style="width: 100%;">
                <slot />
            </div>
        </transition>
    </q-item-label>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    itemKey: {
        type: [String, Number],
        required: true
    },
    enterClass: {
        type: String,
        default: 'animated fadeIn slow'
    },
    leaveClass: {
        type: String,
        default: 'animated fadeOutRight slower'
    }
})

// ✅ Para forzar que Vue reconstruya el DOM
const forceRender = ref(0)

watch(() => props.itemKey, () => {
    forceRender.value++ // 🔥 Forzar reconstrucción cuando cambia el valor
})

const setHeight = (el) => {
    el.style.height = `${el.scrollHeight}px`
}

const collapseHeight = (el) => {
    el.style.height = '0px'
}

const resetHeight = (el) => {
    el.style.height = null
}
</script>