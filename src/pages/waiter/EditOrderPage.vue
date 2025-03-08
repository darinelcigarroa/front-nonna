<template>
  <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section class="flex justify-between">
          <div class="text-h6">{{ $t('update_order') }}</div>
          <q-btn @click="cancelOrder" align="around" class="btn-fixed-width" color="secondary" :label="$t('cancel')"
            icon="mdi-cancel" />
        </q-card-section>

        <q-separator inset></q-separator>
        <q-card-section>
          <FormOrder></FormOrder>
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
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/waiter/order-store';
import TableOrdeesKitchen from '@/components/waiter/tables/TableOrdeesKitchen.vue';
import TableOrdersTaken from "@/components/waiter/tables/TableOrdersTaken.vue";
import FormOrder from "@/components/waiter/cards/FormOrder.vue";
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { notifyError } from 'src/utils/notify';

const router = useRouter(); // Para hacer redirecciones
const route = useRoute(); // Para obtener parámetros de la URL
const orderStore = useOrderStore();
const tab = ref('ordering');
const q = useQuasar();

const orderID = ref(route.params.id); // Asegurar que es reactivo

onMounted(async () => {
  q.loading.show();

  const result = await orderStore.getOrder(orderID.value);

  if (!result.success) {
    notifyError(result.message);
  }

  q.loading.hide();
});

const cancelOrder = (() => {
  orderStore.resetState()
  router.push({ name: 'home' })
})
</script>

<style scoped></style>
