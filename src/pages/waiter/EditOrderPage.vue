<template>
  <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section class="flex justify-between">
          <div class="text-h6">{{ $t('add_dish') }}</div>
          <q-btn @click="handleOrderAdded" align="around" class="btn-fixed-width" color="secondary"
            :label="$t('finish_order')" icon="mdi-check" />
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
          <q-tab name="in_kitchen" :label="$t('in_kitchen')" />
        </q-tabs>

        <q-separator />

        <keep-alive include="TableOrdersTaken,TableOrdeesKitchen">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="ordering">
              <TableOrdersTaken />
            </q-tab-panel>

            <q-tab-panel name="in_kitchen">
              <TableOrdeesKitchen />
            </q-tab-panel>
          </q-tab-panels>
        </keep-alive>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useChefOrdersStore } from '@/stores/chef-orders-store';
import { useOrderStore } from '@/stores/waiter/order-store';
import { useOrdersTableStore } from '@/stores/waiter/orders-table-store';
import TableOrdeesKitchen from './tables/TableOrdeesKitchen.vue';
import TableOrdersTaken from "./tables/TableOrdersTaken.vue";
import FormOrder from "./cards/FormOrder.vue";
import { ref } from 'vue';

const router = useRouter()
const chefOrderStore = useChefOrdersStore()
const orderStore = useOrderStore();
const ordersTable = useOrdersTableStore();
const tab = ref('ordering')

const handleOrderAdded = () => {
  chefOrderStore.addOrder({
    table: orderStore.table,
    numberDiners: orderStore.numberDiners,
    orders: ordersTable.data
  });

  orderStore.resetState()

  router.push({ name: 'home', });
};
</script>

<style scoped></style>
