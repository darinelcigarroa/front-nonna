<template>
  <LoadingComponent :loading="loading" />
  <transition appear enter-active-class="animated zoomIn slower" leave-active-class="animated zoomOut slower">

    <div class="row q-col-gutter-sm q-pa-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered>
          <q-card-section class="flex justify-between">
            <div class="text-h6">{{ $t('create_order') }}</div>
            <q-btn dense @click="cancelOrder" align="around" class="btn-fixed-width" color="secondary"
              :label="$t('cancel')" icon="mdi-cancel" />
          </q-card-section>

          <q-separator inset></q-separator>
          <q-card-section>
            <FormOrder @set-loading="setLoading" />
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
import { onUnmounted, ref } from 'vue'
import { useOrderStore } from '@/stores/waiter/order-store';
import FormOrder from "@/components/waiter/cards/FormOrder.vue";
import TableOrdersTaken from "@/components/waiter/tables/TableOrdersTaken.vue";
import { useRouter } from 'vue-router';
import LoadingComponent from '@/components/utils/LoadingComponent.vue';

const orderStore = useOrderStore();
const router = useRouter()
const loading = ref(false)

onUnmounted(() => {
  orderStore.resetState()
});

const setLoading = (value) => {
  loading.value = value;
};

const cancelOrder = (() => {
  orderStore.resetState()
  router.push({ name: 'home' })
})

</script>
