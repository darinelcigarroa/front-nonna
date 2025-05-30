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
                <q-btn outline unelevated color="primary" size="lg" class="q-my-sm full-width" label="Cancelar orden"
                    @click="confirmCancelOrder = true" />
            </q-card-section>
        </q-card>
    </q-dialog>
    <ConfirmDialog :background="'bg-green-7'" v-model="confirmPayOrder" :statusIcon="'mdi-check'">
        <q-card-section class="q-mt-lg text-center">
            <div style="font-size: 16px;">¿Estás seguro de marcar la orden como pagada?</div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey" @click="confirmPayOrder = false" />
            <q-btn label="Confirmar" color="green-7" @click="validateAndSubmit" />
        </q-card-actions>
    </ConfirmDialog>


    <ConfirmDialog :background="'bg-orange-8'" v-model="confirmCancelOrder" :statusIcon="'mdi-cancel'">
        <q-card-section class="q-mt-lg text-center">
            <div style="font-size: 16px;">¿Estás seguro de marcar la orden como cancelada?</div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="grey" @click="confirmCancelOrder = false" />
            <q-btn label="Confirmar" color="orange-8" @click="cancelOrder" />
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
const confirmPayOrder = ref(false);
const confirmCancelOrder = ref(false)

const emit = defineEmits(['actionOrderDialog'])

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
            emit('actionOrderDialog')
        } else {
            notifyError(response.message)
        }
        confirmPayOrder.value = false
    } else {
        notifyWarning('El tipo de pago es requerido')
    }
};

const confirmAction = () => {
    confirmPayOrder.value = true
}

const cancelOrder = async () => {
    const order = { ...props.order }
    const result = await orderService.cancelOrder(order)
    if (result.success) {
        confirmCancelOrder.value = false
        notifySuccess(result.message)
        close()
        emit('actionOrderDialog')
    } else {
        notifyError(result.message)
    }
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
    /* max-height: 0vh; */
    min-width: 500px;
    margin: auto;
}
</style>