<template>
    <q-dialog v-model="isVisible" persistent>
        <q-card class="q-pa-md q-dialog-card">
            <!-- Línea superior -->
            <div class="top-line " :class="background" />

            <!-- Icono flotante -->
            <div :class="[background, 'icon-container']">
                <q-icon :name="statusIcon" color="white" size="lg" />
            </div>

            <slot />
        </q-card>
    </q-dialog>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

// ✅ Definir `modelValue` en props
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    statusIcon: {
        type: String,
        required: true
    },
    background: {
        type: String,
        default: 'bg-accent'
    }
})

// ✅ Emitir evento para sincronizar el valor de `modelValue`
const emit = defineEmits(['update:modelValue'])

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})


</script>

<style scoped>
.q-dialog-card {
    max-width: 500px;
    border-radius: 12px;
    overflow: visible;
    /* Permitir que el icono sobresalga */
    position: relative;
}

.icon-container {
    position: absolute;
    top: -28px;
    /* Lo saca fuera del contenedor */
    left: 50%;
    transform: translateX(-50%);
    padding: 12px;
    border-radius: 50% !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.delete-btn {
    width: 100px;
    color: white;
}

.cancel-btn {
    width: 100px;
    color: #888;
}

.q-card-actions {
    gap: 12px;
}

.top-line {
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
</style>
