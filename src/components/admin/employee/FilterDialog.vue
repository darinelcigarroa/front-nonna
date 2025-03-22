<template>
    <q-dialog v-model="isVisible">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Filtrar empleados por posición</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="flex flex-center q-gutter-md">
                <q-checkbox v-for="status in POSITION_OPTIONS" :key="status.value"
                    v-model="employeeStore.filterPosition" :label="status.label" :val="status.value"
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
import { useEmployeeStore } from 'src/stores/employee/employee-store';

const employeeStore = useEmployeeStore()

const emit = defineEmits(['update:modelValue', 'applyFilters'])

const props = defineProps({
    modelValue: Boolean
})

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const applyFilter = () => {
    employeeStore.applyFilter()
    isVisible.value = false
}
// Opciones de estado con colores
const POSITION_OPTIONS = [
    { label: "Mesero", value: "waiter", color: "teal" },
    { label: "Chef", value: "chef", color: "blue-4" }
]

</script>

<style scoped>
.q-dialog-plugin {
    width: 350px;
}
</style>
