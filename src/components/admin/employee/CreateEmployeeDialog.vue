<template>
    <q-dialog v-model="storeEmployee.createModal" persistent>
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
import { notifyError, notifySuccess } from 'src/utils/notify'
import FormEmployee from './FormEmployee.vue'
import { useEmployeeStore } from 'src/stores/employee/employee-store'

const storeEmployee = useEmployeeStore()
const emit = defineEmits(['update:loading'])


// Función para guardar datos
const onSubmit = async () => {
    emit('update:loading', true)
    const result = await storeEmployee.saveEmployee()
    if (result.success) {
        notifySuccess(result.message)
    } else {
        notifyError(result.message)
    }
    emit('update:loading', false)
}

const onCancel = () => {
    storeEmployee.createModal = false
    storeEmployee.onCancel()
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