<template>
    <q-dialog v-model="isVisible" persistent>
        <q-card class="q-pa-md q-dialog-card">
            <!-- Línea superior -->
            <div class="top-line" :class="dialogClass" />

            <!-- Icono flotante -->
            <div class="icon-container" :class="dialogClass">
                <q-icon :name="statusIcon" color="white" size="lg" />
            </div>

            <q-card-section class="q-pt-none text-center">
                <div class="text-h6 q-mt-md">
                    Estas realizando cambios en la orden {{ orderFolio }}
                </div>

                <q-virtual-scroll :items="confirmItems" v-slot="{ item }" virtual-scroll-item-size="50"
                    style="max-height: 300px">
                    <q-card-section :key="item.id" class="column q-ma-none">
                        <span>{{ item.dish_name }}:</span>
                        <div class="row justify-center">
                            <q-chip :color="getStatusColor(item.order_item_status?.id)" text-color="dark" dense
                                class="text-weight-bold text-center" square>
                                <q-icon :name="getStatusIcon(item.order_item_status?.id)" class="q-mr-xs" />
                                {{ item.order_item_status?.name }}
                            </q-chip>

                            <q-icon name="mdi-arrow-right-thin" color="dark"></q-icon>

                            <q-chip :color="targetStatusColor" text-color="dark" dense
                                class="text-weight-bold text-center" square>
                                <q-icon :name="targetStatusIcon" class="q-mr-xs" />
                                {{ targetStatusText }}
                            </q-chip>
                        </div>
                    </q-card-section>
                </q-virtual-scroll>
            </q-card-section>

            <q-card-actions align="center" class="q-mt-md">
                <q-btn outline
                    :style="props.confirmStatus === ORDER_ITEM_STATUS.PREPARING ? 'color: var(--q-accent)' : 'color: var(--q-cerise)'"
                    label="Cancelar" v-close-popup class="cancel-btn" />
                <q-btn label="Confirmar"
                    :color="+props.confirmStatus === +ORDER_ITEM_STATUS.PREPARING ? 'accent' : 'cerise'"
                    @click="confirm" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { getStatusColor, getStatusIcon, ORDER_ITEM_STATUS } from '@/constants/status.js'

// ✅ Definir `modelValue` en props
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    confirmItems: {
        type: Array,
        required: true
    },
    confirmStatus: Number,
    orderFolio: String
})

// ✅ Emitir evento para sincronizar el valor de `modelValue`
const emit = defineEmits(['update:modelValue', 'confirm'])

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const dialogClass = computed(() =>
    props.confirmStatus === ORDER_ITEM_STATUS.PREPARING ? 'bg-accent' : 'bg-mulberry'
)

const statusIcon = computed(() =>
    getStatusIcon(props.confirmStatus)
)

const targetStatusColor = computed(() =>
    getStatusColor(props.confirmStatus)
)

const targetStatusIcon = computed(() =>
    getStatusIcon(props.confirmStatus)
)

const targetStatusText = computed(() => {
    switch (props.confirmStatus) {
        case ORDER_ITEM_STATUS.PREPARING:
            return 'En preparación'
        case ORDER_ITEM_STATUS.READY_TO_SERVE:
            return 'Listo para servir'
        default:
            return ''
    }
})

const confirm = () => {
    emit('confirm')
    isVisible.value = false
}
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
