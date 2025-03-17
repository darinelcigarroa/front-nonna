<template>
    <!-- Name -->
    <div class="col-md-6 col-12">
        <q-input v-model="form.name" label="Nombre" outlined>
            <template v-slot:append>
                <q-icon name="mdi-clipboard-text-outline" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
    <!-- First Name -->
    <div class="col-md-6 col-12">
        <q-input v-model="form.first_surname" label="Primer apellido" outlined>
            <template v-slot:append>
                <q-icon name="mdi-face-man" class="cursor-pointer" />
            </template>
        </q-input>
    </div>

    <!-- Last Name -->
    <div class="col-md-6 col-12">
        <q-input v-model="form.second_surname" label="Segundo apellido" outlined>
            <template v-slot:append>
                <q-icon name="mdi-face-woman" class="cursor-pointer" />
            </template>
        </q-input>
    </div>

    <!-- Position -->
    <div class="col-md-6 col-12">
        <q-select outlined v-model="form.position_id" :options="positions" label="Posición" emit-value map-options
            option-value="id" option-label="name">
            <template v-if="form.position_id" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="form.position_id = null" class="cursor-pointer" />
            </template>
        </q-select>
    </div>

    <!-- Phone Number -->
    <div class="col-md-6 col-12">
        <q-input outlined v-model="form.salary" label="Salario" mask="#.##" fill-mask="0" reverse-fill-mask>
            <template v-slot:append>
                <q-icon name="mdi-currency-usd" @click.stop.prevent="model = null" class="cursor-pointer" />
            </template>
        </q-input>
    </div>

</template>
<script setup>
import { onMounted, ref } from 'vue'
import { notifyError } from 'src/utils/notify'
import positionService from 'src/services/positionService'

const positions = ref([])


// Datos del formulario
const form = ref({
    name: '',
    first_surname: '',
    second_surname: '',
    position_id: '',
    salary: '',
})
// Exponer Form
defineExpose({ form })

onMounted(async () => {
    const response = await positionService.index()
    if (response.success) {
        positions.value = response.data.positions
    } else {
        notifyError(response.message)
    }
})



</script>