<template>
    <q-dialog v-model="storeTable.createModal" persistent>
        <q-card class="q-pa-md shadow-1" style="width: 600px; max-width: 90vw">
            <div class="row flex-center q-mb-md column">
                <q-avatar size="70px" color="secondary">
                    <q-icon name="table_bar" color="white"></q-icon>
                </q-avatar>
                <span class="text-primary text-h6 text-uppercase q-mt-xs">Crear mesa</span>
            </div>


            <!-- Formulario -->
            <q-form @submit="onSubmit" class="row q-col-gutter-md">
                <FormEmployee />
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
import FormEmployee from './FormTable.vue'
import { useTableStore } from 'src/stores/table/table-store'

const storeTable = useTableStore()


// Función para guardar datos
const onSubmit = async () => {
    const result = await storeTable.saveTable()
    if (result.success) {
        notifySuccess(result.message)
    } else {
        notifyError(result.message)
    }
}

const onCancel = () => {
    storeTable.createModal = false
    storeTable.onCancel()
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