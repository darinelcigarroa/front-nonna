<template>
  <transition appear enter-active-class="animated zoomIn slower" leave-active-class="animated zoomOut slower">

    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered>
          <q-card-section class="flex justify-between">
            <div class="text-h6">{{ $t('create_order') }}</div>
            <q-btn dense @click="cancelOrder" align="around" class="btn-fixed-width" color="secondary"
              :label="$t('cancel')" icon="mdi-cancel" />
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
  </transition>
</template>

<script setup>
import { useOrderStore } from '@/stores/waiter/order-store';
import FormOrder from "@/components/waiter/cards/FormOrder.vue";
import TableOrdersTaken from "@/components/waiter/tables/TableOrdersTaken.vue";
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const orderStore = useOrderStore();
const router = useRouter()

onMounted(() => {
  orderStore.resetState()
})

const cancelOrder = (() => {
  orderStore.resetState()
  router.push({ name: 'home' })
})

</script>
