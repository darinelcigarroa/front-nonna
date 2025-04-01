<template>
    <q-dialog v-model="isVisible">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Exportar ordenes en excel</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="flex flex-center q-gutter-md" style="padding: 10px;">
                <q-input outlined label="Fecha" v-model="orderStore.exportFilter.date" mask="date" :rules="['date']"
                    ref="dateInput">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer" @click="$refs.datePopup.show()" />
                    </template>

                    <q-popup-proxy ref="datePopup" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="orderStore.exportFilter.date">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Cerrar" color="primary" flat />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-input>
            </q-card-section>


            <q-card-section class="flex flex-center text-weight-medium" style="padding: 0px;">
                Filtro por posición
            </q-card-section>
            <q-card-section class="flex flex-center q-gutter-md">
                <q-checkbox v-for="status in ORDER_STATUS_OPTIONS" :key="status.value"
                    v-model="orderStore.exportFilter.status" :label="status.label" :val="status.value"
                    :color="status.color" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="dark" v-close-popup />
                <q-btn flat label="Exportar" color="primary" @click="exportOrders" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { useOrderStore } from 'src/stores/admin/order-store'
import { computed } from 'vue'

const orderStore = useOrderStore()

const emit = defineEmits(['update:modelValue', 'applyFilters'])

const props = defineProps({
    modelValue: Boolean
})

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const exportOrders = () => {
    orderStore.exportExcel()
    isVisible.value = false
}

const ORDER_STATUS_OPTIONS = [
    { label: "Pagado", value: "pagado", color: "teal" },
    { label: "Cancelado", value: "cancelado", color: "accent" }
]


</script>