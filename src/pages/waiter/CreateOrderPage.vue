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
      <TableOrdersTaken ref="tableOrdersRef" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormOrder from "./cards/FormOrder.vue";
import TableOrdersTaken from "./tables/TableOrdersTaken.vue";

const tableOrdersRef = ref(null);

const handleOrderAdded = () => {
  if (tableOrdersRef.value) {
    tableOrdersRef.value.addOrderToTable();
  }
};
</script>
