<template>
  <div class="q-pa-md">
    <transition appear enter-active-class="animated zoomIn slower" leave-active-class="animated zoomOut slower">
      <div class="row q-my-md shadow" style="border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.12);">
        <div v-for="(item) in restaurantStatus" :key="item.id"
          :class="['box_' + item.id, 'col-md-4', 'col-lg-4', 'col-sm-12', 'col-xs-12']">
          <q-card class="no-shadow q-pa-sm" style="position: relative;">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">
                  {{ item.total }}
                </q-item-label>
                <q-item-label :class="!$q.dark.isActive ? 'text-dark' : 'text-white'" style="letter-spacing: 1px;">
                  {{ $t(item.name) }}
                </q-item-label>
                <q-item-label :class="[!$q.dark.isActive ? `box_${item.id}` : 'text-white', 'text-weight-medium']"
                  style="letter-spacing: 1px;">
                  {{ $t('available') }} {{ (item.total - item.consumed) }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon :name="item.icon" :class="['box_' + item.id]" size="60px" />
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div :class="['progress-bar-' + item.id]"
                    :style="{ backgroundColor: item.color, width: capacity(item) }">
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </transition>
    <transition appear enter-active-class="animated lightSpeedInLeft slower"
      leave-active-class="animated zoomOut slower">
      <q-infinite-scroll @load="onLoad" :offset="16">
        <div class="grid-container">
          <q-card v-for="(order, index) in orders" :key="order.id" class="no-shadow shadow rounded-borders">
            <q-card-section class="row items-center q-pa-md no-wrap">
              <q-card-section class="flex" style="padding: 0;">
                <q-avatar style="cursor: pointer;" @click="paidOrder(order)" rounded
                  :class="[`box_button_${(index % 3) + 1}`]" text-color="dark">
                  <q-icon name="table_bar" />
                </q-avatar>
                <div class="q-ml-sm column">
                  <div :class="[`box_${(index % 3) + 1}`, 'text-weight-bold']">
                    {{ order.order_status.name }}
                  </div>
                  <div :class="!$q.dark.isActive ? 'text-grey-8' : 'text-white'">
                    {{ order.formatted_time }}
                  </div>
                </div>
              </q-card-section>
              <div class="q-ml-auto column items-end">
                <div :class="[!$q.dark.isActive ? 'text-dark' : 'text-white', 'flex', 'text-h5', 'flex-center']">
                  <span class="q-mx-xs q-mb-lg">{{ order.folio }}</span>
                </div>
                <div :class="[`box_button_${(index % 3) + 1}`, 'progress-btn']" class="flex items-center cursor-pointer"
                  @click="$router.push({ name: 'edit-order', params: { id: order.id } })">
                  <q-icon name="edit" class="q-mx-sm" size="xs"></q-icon>
                  <span class="text-weight-bold" style="font-size: 16px;">{{ order.table.name }}</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-puff color="primary" size="2.5em" />
          </div>
        </template>
      </q-infinite-scroll>
    </transition>
    <PaidOrderDialog :order="order" ref="paidOrderDialogRef" @pay-order="confirmPaymentOrder" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import orderService from '@/services/orderService';
import PaidOrderDialog from 'src/components/waiter/dialogs/PaidOrderDialog.vue';

const currentPage = ref(1)
const perPage = ref(4)
const hasMoreData = ref(true)
const orders = ref([])
const paidOrderDialogRef = ref(null);
const order = ref([])

const onLoad = async (index, done) => {
  if (!hasMoreData.value) return done(true)
  const response = await orderService.index({
    page: currentPage.value,
    per_page: perPage.value
  })

  if (response.success) {
    const data = response.data.orders
    orders.value = orders.value.concat(data.data)
    hasMoreData.value = !!data.next_page_url
    if (data.next_page_url) currentPage.value++
  }
  done(false)
}

const restaurantStatus = ref([
  { id: 1, name: 'total_tables', icon: 'mdi-table-chair', total: 25, consumed: 20 },
  { id: 2, name: 'total_dishes', icon: 'mdi-bowl-mix-outline', total: 35, consumed: 20 },
  { id: 3, name: 'total_diners', icon: 'mdi-account-multiple-outline', total: 50, consumed: 20 },
])

const capacity = ((item) => {
  const porcent = (item.consumed / item.total) * 100
  return String(porcent) + '%'
})

const paidOrder = (payload) => {
  order.value = payload
  paidOrderDialogRef.value?.open();
}

const confirmPaymentOrder = async () => {
  currentPage.value = 1;
  hasMoreData.value = true;
  const index = orders.value.findIndex((item) => item.id === order.value.id)
  orders.value.splice(index, 1)
};

</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}

.box_1 {
  color: var(--q-secondary);
}

.base_box_button {
  font-family: cursive;
  font-size: 12px !important;
}

.box_button_1 {
  color: var(--q-primary);
  background-color: #e8686862;

}

.box_2 {
  color: var(--q-accent);
}

.box_button_2 {
  color: var(--q-accent);
  background-color: #08446588;
}

.box_3 {
  color: var(--q-teal);
}

.box_button_3 {
  color: var(--q-teal);
  background-color: #087e8b80;
  /* background-color: rgba(8, 126, 139, 0.5); */
}

.permanent-flat.q-btn--actionable:not(.q-btn--disabled):hover::before,
.permanent-flat.q-btn--actionable:not(.q-btn--disabled):active::before {
  background-color: transparent !important;
  opacity: 0 !important;
}

.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}

.progress-base {
  height: 8px;
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar-1 {
  height: 8px;
  border-radius: 3px;
  background: -webkit-linear-gradient(45deg, #780000, #de52a5) !important;
  background: linear-gradient(45deg, #780000, #de52a5) !important;
}

.progress-bar-2 {
  height: 8px;
  border-radius: 3px;
  background: -webkit-linear-gradient(45deg, #003049, #bb6aa3) !important;
  background: linear-gradient(45deg, #003049, #bb6aa3) !important;
}

.progress-bar-3 {
  height: 8px;
  border-radius: 3px;
  background: -webkit-linear-gradient(45deg, #087e8b, #85ba62) !important;
  background: linear-gradient(45deg, #087e8b, #85ba62) !important;
}

.progress-btn {
  width: auto;
  height: 40%;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 20px 0 12px 0;
  padding: 8px;

}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 720px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
