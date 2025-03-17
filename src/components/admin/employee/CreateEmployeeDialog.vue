<template>
    <q-dialog v-model="showModal" persistent>
        <q-card class="q-pa-md shadow-1" style="width: 600px; max-width: 90vw">
            <!-- Foto de perfil -->
            <div class="row flex-center q-mb-md column">
                <q-avatar size="80px">
                    <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Profile" />
                </q-avatar>
                <span class="text-primary text-h6 text-uppercase q-mt-xs">Crear empleado</span>
            </div>

            <!-- Formulario -->
            <q-form @submit="onSubmit" class="row q-col-gutter-md">
                <FormEmployee ref="formEmployeeRef" />
                <div class="col-12 q-mt-md row justify-end">
                    <q-btn :label="$t('cancel')" color="grey" flat class="q-mr-sm" @click="onCancel" />
                    <q-btn :label="$t('save')" color="primary" type="submit" />
                </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup>
import employeeService from 'src/services/employeeService'
import { notifyError, notifySuccess } from 'src/utils/notify'
import { ref, watch } from 'vue'
import FormEmployee from './FormEmployee.vue'
// Estado reactivo para controlar el modal
const showModal = ref(false)
const formEmployeeRef = ref(null)

const props = defineProps({
    employeeCreate: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['update:employeeCreate', 'newEmployee'])

// Sincronizar el estado con el prop
watch(() => props.employeeCreate, (newValue) => {
    showModal.value = newValue
})


// Función para guardar datos
const onSubmit = async () => {
    try {
        const form = formEmployeeRef.value.form

        const response = await employeeService.store(form)
        console.log('response', response)
        if (response.success) {
            console.log('okkk', response)
            notifySuccess(response.message)
            emit('update:employeeCreate', false)
            emit('newEmployee')
        } else {
            notifyError(response.message)
        }
    } catch (error) {
        notifyError(error)
    }

}

const onCancel = () => {
    emit('update:employeeCreate', false)
}
</script>

<style scoped>
.q-card {
    max-width: 600px;
}

.q-avatar {
    border: 2px solid #ccc;
}
</style>