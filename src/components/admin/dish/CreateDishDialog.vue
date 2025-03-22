<template>
    <q-dialog v-model="storeDish.createModal" persistent>
        <q-card class="q-pa-md shadow-1" style="width: 600px; max-width: 90vw">
            <div class="row flex-center q-mb-md column">
                <q-avatar size="70px" color="secondary">
                    <q-icon name="mdi-food-turkey" color="white"></q-icon>
                </q-avatar>
                <span class="text-primary text-h6 text-uppercase q-mt-xs">Crear Platillo</span>
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
import FormEmployee from './FormDish.vue'
import { useDishStore } from 'src/stores/catalogs/dish-store'
import { onMounted } from 'vue'

const storeDish = useDishStore()

onMounted(() => {
    // storeDish.resetDish()
})

// Función para guardar datos
const onSubmit = async () => {
    const result = await storeDish.saveDish()
    if (result.success) {
        notifySuccess(result.message)
    } else {
        notifyError(result.message)
    }
}

const onCancel = () => {
    storeDish.createModal = false
    storeDish.onCancel()
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