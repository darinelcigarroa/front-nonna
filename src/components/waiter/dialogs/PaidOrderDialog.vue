<template>
    <q-dialog v-model="showDialog">
        <q-card class="my-cart">
            <q-card-section class="row items-center">
                <q-btn @click="close()" outline round color="secondary" icon="mdi-arrow-left" size="sm" />
                <q-space />
                <div class="text-h6">{{ props.order.folio }}</div>
                <q-space />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="text-subtitle1">Detalles de la orden</div>
                <q-list>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar square size="100px" font-size="82px" color="primary" text-color="white"
                                icon="mdi-barcode-scan" />
                        </q-item-section>
                        <q-item-section style="font-size: 1rem;">
                            <q-item-label> {{ props.order.formatted_date }} </q-item-label>
                            <q-item-label> {{ props.order.formatted_time }} </q-item-label>
                            <q-item-label>{{ props.order.table.name }} </q-item-label>

                        </q-item-section>

                    </q-item>
                </q-list>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <q-list dense>
                    <q-item>
                        <q-item-section class="text-weight-medium">
                            <q-item-label>Lista de platillos</q-item-label>
                        </q-item-section>
                        <q-item-section class="text-weight-medium" side>
                            <q-item-label class="text-dark">Precios</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item v-for="(item, index) in props.order.order_items" :key="index">
                        <q-item-section>
                            <q-item-label>{{ item.dish_name }} {{ `(${item.quantity})` }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-item-label>+{{ (item.price * item.quantity).toFixed(2) }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-item>
                    <q-item-section>
                        <q-item-label class="text-bold">Sub Total</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label class="text-bold">{{ props.order.total_amount }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="text-subtitle1">Tipo de pago</div>
                <div class="row q-mt-xs ">
                    <q-select ref="typePaymentRef" :rules="[val => !!val || $t('field_is_required')]" class="col-12"
                        color="primary" v-model="paymentType" :options="paymentTypes" label="Tipo de pago" emit-value
                        map-options option-label="name">
                        <template v-slot:prepend>
                            <q-icon color="primary" name="mdi-account-credit-card" />
                        </template>
                    </q-select>
                </div>
            </q-card-section>

            <q-card-section>
                <q-btn :disable="!paymentType" unelevated color="primary" size="lg" class="full-width"
                    label="Orden pagada" @click="confirmAction" />
            </q-card-section>
        </q-card>
    </q-dialog>
    <ConfirmDialog v-model="showConfirmDialog" :statusIcon="'mdi-check'">
        <q-card-section class="q-mt-lg text-center">
            <div style="font-size: 16px;">¿Estás seguro de marcar la orden como pagada?</div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey" @click="showDialog = false" />
            <q-btn label="Confirmar" color="accent" @click="validateAndSubmit" />
        </q-card-actions>
    </ConfirmDialog>
</template>

<script setup>
import paymentTypeService from 'src/services/catalogs/paymentTypeService';
import orderService from 'src/services/orderService';
import { notifyError, notifySuccess, notifyWarning } from 'src/utils/notify';
import { ref, onMounted } from 'vue';
import ConfirmDialog from 'src/components/utils/ConfirmDialog.vue';

const props = defineProps(['order'])
const paymentTypes = ref([])
const paymentType = ref(null);
const typePaymentRef = ref(null);
const showDialog = ref(false);
const showConfirmDialog = ref(false);

const emit = defineEmits(['payOrder'])

const open = () => {
    showDialog.value = true;
};

const close = () => {
    showDialog.value = false;
};

// Expone las funciones para que el padre las pueda usar
defineExpose({ open, close });

const validateAndSubmit = async () => {
    typePaymentRef.value.validate(); // Ejecuta la validación de Quasar

    if (paymentType.value) {
        // Lógica para marcar la orden como pagada
        const order = { ...props.order, paymentType: paymentType.value }
        const response = await orderService.payOrder(order)

        if (response.success) {
            notifySuccess(response.message)
            close()
            emit('payOrder')
        } else {
            notifyError(response.message)
        }
        showConfirmDialog.value = false
    } else {
        notifyWarning('El tipo de pago es requerido')
    }
};

const confirmAction = () => {
    console.log('Acción confirmada')
    showConfirmDialog.value = true
}

onMounted(async () => {
    try {
        const response = await paymentTypeService.getPaymentTypes()
        paymentTypes.value = response.data.paymentTypes

    } catch (error) {
        notifyError(error)
    }

})
</script>

<style scoped>
.my-cart {
    min-width: 400px;
    margin: auto;
}
</style>