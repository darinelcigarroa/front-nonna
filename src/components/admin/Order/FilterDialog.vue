<template>
    <q-dialog v-model="isVisible">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Filtrar órdenes por estatus</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="flex flex-center q-gutter-md">
                <q-checkbox v-for="status in ORDER_STATUS_OPTIONS" :key="status.value"
                    v-model="orderStore.filterStatuses" :label="status.label" :val="status.value"
                    :color="status.color" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="dark" v-close-popup />
                <q-btn flat label="Aplicar" color="primary" @click="applyFilter" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { useOrderStore } from 'src/stores/admin/order-store';

const orderStore = useOrderStore()

const emit = defineEmits(['update:modelValue', 'applyFilters'])

const props = defineProps({
    modelValue: Boolean
})

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const applyFilter = () => {
    orderStore.applyFilter()
    isVisible.value = false
}
// Opciones de estado con colores
const ORDER_STATUS_OPTIONS = [
    { label: "pagado", value: "pagado", color: "teal" },
    { label: "cancelado", value: "cancelado", color: "red" }
]

</script>

<style scoped>
.q-dialog-plugin {
    width: 350px;
}
</style>
