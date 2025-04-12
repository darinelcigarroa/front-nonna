<template>
  <div class="row q-col-gutter-sm q-pa-md">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section class="flex justify-between">
          <div class="text-h6">{{ $t('update_order') }}</div>
          <q-btn @click="cancelOrder" align="around" class="btn-fixed-width" color="secondary" :label="$t('cancel')"
            icon="mdi-cancel" />
        </q-card-section>

        <q-separator inset></q-separator>
        <q-card-section>
          <FormOrder @set-loading="setLoading" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <q-card>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
          narrow-indicator>
          <q-tab name="ordering" :label="$t('ordering')" />
          <q-tab name="in_preparation" :label="$t('in_preparation')" />
        </q-tabs>

        <q-separator />

        <keep-alive include="TableOrdersTaken,TableOrdeesKitchen">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="ordering">
              <TableOrdersTaken />
            </q-tab-panel>

            <q-tab-panel name="in_preparation">
              <TableOrdeesKitchen />
            </q-tab-panel>
          </q-tab-panels>
        </keep-alive>
      </q-card>
    </div>
    <q-dialog v-model="showExtendModal">
      <q-card>
        <q-toolbar class="bg-primary text-center">
          <q-icon name="mdi-clock" size="40px" color="white" />
          <q-toolbar-title><span class="text-weight-bold text-white">¿Extender el tiempo de edición?</span>
          </q-toolbar-title>
          <q-btn text-color="white" flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="text-center" style="font-size: 1.3em;">
          El tiempo de edición está a punto de terminar. ¿Quieres extenderlo por 5 minutos?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Extender 5 minutos" color="dark" @click="extendTime" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { useOrderStore } from '@/stores/waiter/order-store';
import TableOrdeesKitchen from '@/components/waiter/tables/TableOrdeesKitchen.vue';
import TableOrdersTaken from "@/components/waiter/tables/TableOrdersTaken.vue";
import FormOrder from "@/components/waiter/cards/FormOrder.vue";
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { notifyError, notifyInfo } from 'src/utils/notify';
import { echo } from 'boot/echo';

// ✅ Constantes y referencias
const router = useRouter();
const route = useRoute();
const orderStore = useOrderStore();
const q = useQuasar();
const loading = ref(false)

const orderID = ref(route.params.id);
const tab = ref('ordering');
const showExtendModal = ref(false);
let timer = null;

// ✅ Funciones de negocio
const fetchOrder = async () => {
  try {
    q.loading.show();

    const result = await orderStore.editOrder(orderID.value);

    if (!result.success) {
      notifyError(result.message);
    } else {
      startTimer()
    }


  } catch (error) {
    notifyError('Error al cargar la orden');
    console.error(error);
  } finally {
    q.loading.hide();
  }
};

const startTimer = () => {
  // 🧹 Limpiar temporizador previo (si existe)
  clearTimeout(timer);

  // ⏳ Tiempo total = 1 minuto (para pruebas)
  timer = setTimeout(() => {
    notifyInfo('El tiempo de edición ha terminado');
    router.push({ name: 'home' });
  }, 60_000);

  // 🚨 Mostrar advertencia 15 segundos antes de terminar
  setTimeout(() => {
    showExtendModal.value = true;
  }, 45_000);
};

const extendTime = () => {
  showExtendModal.value = false;
  startTimer(); // ✅ Reiniciar el temporizador
};

const cancelOrder = () => {
  orderStore.resetState();
  router.push({ name: 'home' });
};

const setLoading = (value) => {
  loading.value = value;
};


// ✅ Hooks
onMounted(async () => {
  await fetchOrder()
});


onUnmounted(() => {
  clearTimeout(timer);
  orderStore.cancelEditingOrder(orderID.value);
  orderStore.resetState()
});

onBeforeUnmount(() => {
  echo.leave(`orders.${orderID.value}`);
});

</script>