<template>
    <!-- Name -->
    <div class="col-md-6 col-12">
        <q-input v-model="employeeStore.formEmployee.name" label="Nombre" outlined>
            <template v-slot:append>
                <q-icon name="mdi-clipboard-text-outline" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
    <!-- First Name -->
    <div class="col-md-6 col-12">
        <q-input v-model="employeeStore.formEmployee.first_surname" label="Apellido paterno" outlined>
            <template v-slot:append>
                <q-icon name="mdi-face-man" class="cursor-pointer" />
            </template>
        </q-input>
    </div>

    <!-- Last Name -->
    <div class="col-md-6 col-12">
        <q-input v-model="employeeStore.formEmployee.second_surname" label="Apellido materno" outlined>
            <template v-slot:append>
                <q-icon name="mdi-face-woman" class="cursor-pointer" />
            </template>
        </q-input>
    </div>

    <!-- Position -->
    <div class="col-md-6 col-12">
        <q-select outlined v-model="employeeStore.formEmployee.position_id" :options="positions" label="Posición"
            emit-value map-options option-value="id" option-label="name">
            <template v-if="employeeStore.formEmployee.position_id" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="employeeStore.formEmployee.position_id = null"
                    class="cursor-pointer" />
            </template>
        </q-select>
    </div>

    <!-- Salary -->
    <div class="col-md-6 col-12">
        <q-input outlined v-model="employeeStore.formEmployee.salary" label="Salario" mask="#.##" fill-mask="0"
            reverse-fill-mask>
            <template v-slot:append>
                <q-icon name="mdi-currency-usd" @click.stop.prevent="employeeStore.formEmployee.salary = null"
                    class="cursor-pointer" />
            </template>
        </q-input>
    </div>

</template>
<script setup>
import { onMounted, ref } from 'vue'
import { notifyError } from 'src/utils/notify'
import positionService from 'src/services/positionService'
import { useEmployeeStore } from 'src/stores/employee/employee-store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const positions = ref([])
const employeeStore = useEmployeeStore()

const loadPositions = async () => {
    const response = await positionService.index()
    if (response.success) {
        positions.value = response.data.positions.map(pos => ({
            ...pos,
            name: t(pos.name)
        }))
    } else {
        notifyError(response.message)
    }
}

onMounted(async () => {
    loadPositions()
})

</script>