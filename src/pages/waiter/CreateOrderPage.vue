<template>
  <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
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
      <TableOrdersTaken />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useChefOrdersStore } from '@/stores/chef-orders-store';
import { useOrderStore } from '@/stores/waiter/order-store';
import { useOrdersTableStore } from '@/stores/waiter/orders-table-store';
import FormOrder from "@/components/waiter/cards/FormOrder.vue";
import TableOrdersTaken from "@/components/waiter/tables/TableOrdersTaken.vue";
import { notifyError, notifySuccess } from 'src/utils/notify';

const router = useRouter()
const chefOrderStore = useChefOrdersStore()
const orderStore = useOrderStore();
const ordersTable = useOrdersTableStore();

const handleOrderAdded = async () => {

  const response = await chefOrderStore.addOrder({
    table: orderStore.table,
    numberDiners: orderStore.numberDiners,
    orders: ordersTable.data
  });

  if (response.success) {
    orderStore.resetState()
    ordersTable.resetState()
    notifySuccess(response.message)
    router.push({ name: 'home', });
  } else {
    notifyError(response.message)
  }

};
</script>
