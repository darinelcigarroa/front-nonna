<template>
    <q-dialog v-model="isVisible">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="text-h6">Exportar empleados en excel</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="flex flex-center q-gutter-md">
                <q-checkbox v-for="status in POSITION_OPTIONS" :key="status.value"
                    v-model="employeeStore.exportPosition" :label="status.label" :val="status.value"
                    :color="status.color" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="dark" v-close-popup />
                <q-btn flat label="Exportar" color="primary" @click="exportEmployee" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { useEmployeeStore } from 'src/stores/employee/employee-store'
import { computed, watch } from 'vue'

const employeeStore = useEmployeeStore()
const emit = defineEmits(['update:modelValue', 'applyFilters'])

const props = defineProps({
    modelValue: Boolean
})

const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

watch(() => employeeStore.exportPosition, (newVal) => {
    const ultimateValue = newVal.at(-1);

    const filterPositions = (excludeValues) => {
        const filtered = newVal.filter((item) => !excludeValues.includes(item));

        if (filtered.length !== newVal.length) {
            employeeStore.exportPosition = filtered;
        }
    };

    if (['waiter', 'chef'].includes(ultimateValue)) {
        filterPositions(['all']);
        return;
    }

    if (ultimateValue === 'all') {
        filterPositions(['waiter', 'chef']);
        return;
    }
});

const exportEmployee = () => {
    employeeStore.exportExcel()
    isVisible.value = false
}

// Opciones de estado con colores
const POSITION_OPTIONS = [
    { label: "Todos", value: "all", color: "primary" },
    { label: "Mesero", value: "waiter", color: "teal" },
    { label: "Chef", value: "chef", color: "accent" }
]
</script>