<template>
  <transition appear enter-active-class="animated bounceInLeft slower" leave-active-class="animated zoomOut slower">
    <q-page class="q-ma-md q-px-xl">
      <q-infinite-scroll @load="onLoad" :offset="16">
        <q-timeline color="secondary">
          <q-timeline-entry heading body="November, 2017" />
          <q-virtual-scroll :items="orders" v-slot="{ item: order }">
            <transition-group appear leave-active-class="animated fadeOut slow">
              <q-timeline-entry :key="order.id" color="secondary">
                <div class="row justify-between items-center full-width">
                  <div class="text-weight-bold">{{ order.folio }}</div>
                  <div class="text-grey-7 text-caption">{{ order.formatted_time }}</div>
                </div>

                <q-expansion-item class="text-weight-bold" :label="order.table.name">
                  <q-card flat bordered class="q-pa-sm q-mt-xs" style="border-radius: 10px;">
                    <!-- Checkbox para seleccionar todos los items -->
                    <div class="row justify-between items-center q-mb-md"
                      :class="{ 'bg-teal-1': order.order_status_id == ORDER_STATUS.EDIT }">
                      <div class="row items-center">
                        <q-checkbox v-model="order.selectAll" label="Seleccionar todo"
                          @update:model-value="toggleSelectAll(order)" class="q-ml-sm" />
                      </div>

                      <!-- ✅ Animación Lottie al lado del checkbox -->
                      <LottieAnimation v-if="order.order_status_id == ORDER_STATUS.EDIT" :animationData="animationData"
                        :loop="true" :autoplay="true" width="60px" height="60px" class="q-ml-sm" />
                    </div>
                    <!-- Renderizado de los items -->
                    <q-virtual-scroll :items="order.order_items" v-slot="{ item, index }" virtual-scroll-item-size="100"
                      virtual-scroll-sticky>
                      <q-card :key="item.id"
                        class="col-lg-4 fit col-md-4 col-sm-12 col-xs-12 no-shadow q-px-sm no-border custom-card"
                        :class="{ 'border-bottom': index === order.order_items.length - 1 }">
                        <q-item>
                          <!-- Checkbox individual -->
                          <q-checkbox class="q-mx-xs" v-if="item.status_id !== ORDER_ITEM_STATUS.READY_TO_SERVE"
                            v-model="item.checked" @update:model-value="updateSelectAll(order)" />
                          <q-checkbox class="q-mx-xs" v-else v-model="item.checked" style="visibility: hidden;" />

                          <!-- Avatar y detalles del platillo -->
                          <q-item-section avatar>
                            <q-avatar size="60px" class="shadow-4">
                              <img src="/chef/sarten-1.svg" style="object-fit: contain; width: 85%; height: 85%;" />
                            </q-avatar>
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-grey-8 text-weight-bold">
                              {{ item.dish_name }}
                            </q-item-label>
                            <q-item-label class="text-grey-8">
                              Cantidad: {{ item.quantity }}
                            </q-item-label>
                            <q-item-label>
                              <transition appear enter-active-class="animated fadeIn slow"
                                leave-active-class="animated fadeOutRight slow"
                                @leave="(el) => { el.style.height = '0px'; }">
                                <div :key="item.order_item_status.id">
                                  <q-chip :color="getStatusColor(item.order_item_status.id)" text-color="dark" dense
                                    class="text-weight-bold text-center" square>
                                    <q-icon :name="getStatusIcon(item.order_item_status.id)" class="q-mr-xs" />
                                    {{ item.order_item_status.name }}
                                  </q-chip>
                                </div>
                              </transition>
                            </q-item-label>
                          </q-item-section>
                          <!-- Botones de acción -->
                          <q-item-section side>
                            <q-btn v-if="item.status_id === ORDER_ITEM_STATUS.IN_KITCHEN"
                              @click="updateDishStatus([item], ORDER_ITEM_STATUS.PREPARING)" size="md" dense flat round
                              icon="mdi-chef-hat" class="bg-accent text-white">
                              <q-tooltip>¡Voy a preparar!</q-tooltip>
                            </q-btn>

                            <q-btn v-if="item.status_id === ORDER_ITEM_STATUS.PREPARING"
                              @click="updateDishStatus([item], ORDER_ITEM_STATUS.READY_TO_SERVE)" size="md" dense flat
                              round icon="mdi-silverware-fork-knife" class="bg-mulberry text-white">
                              <q-tooltip>¡Listo para servir!</q-tooltip>
                            </q-btn>
                          </q-item-section>
                        </q-item>
                      </q-card>
                    </q-virtual-scroll>

                    <!-- Botones de acción por orden -->
                    <div v-if="selectedStatus(order) !== null" class="row justify-between items-center q-py-sm q-mx-md">

                      <q-btn v-if="selectedStatus(order) === ORDER_ITEM_STATUS.IN_KITCHEN" icon="mdi-chef-hat"
                        size="12px" color="accent" outline label="Voy a preparar" @click="updateDishStatus(
                          order.order_items.filter(item => item.checked),
                          ORDER_ITEM_STATUS.PREPARING
                        )" />

                      <q-btn v-if="selectedStatus(order) === ORDER_ITEM_STATUS.PREPARING"
                        icon="mdi-silverware-fork-knife" size="12px" outline color="green-10" label="Listo para servir"
                        @click="updateDishStatus(
                          order.order_items.filter(item => item.checked),
                          ORDER_ITEM_STATUS.READY_TO_SERVE
                        )" />
                    </div>
                  </q-card>

                </q-expansion-item>
              </q-timeline-entry>
            </transition-group>

          </q-virtual-scroll>
        </q-timeline>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-puff color="primary" size="2.5em" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-page>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import orderService from 'src/services/chef/orderService'
import orderItemService from 'src/services/orderItemService'
import { getStatusColor, getStatusIcon, ORDER_ITEM_STATUS, ORDER_STATUS } from '@/constants/status.js'
import { notifyError, notifyInfo, notifySuccess } from 'src/utils/notify'
import LottieAnimation from 'src/components/LottieAnimation.vue'
import animationData from 'src/assets/chef/waiter-edit.json'
import { echo } from 'boot/echo'

const orders = ref([])
const currentPage = ref(1)
const hasMoreData = ref(true)
const perPage = ref(4)

onMounted(() => {
  console.log('Animation Data:', animationData)

  echo.private('order-items-updated')
    .listen('OrderItemsUpdated', handleOrderUpdated)

  echo.private('waiter-editing-order')
    .listen('WaiterEditingOrder', handleWaiterEditingOrder)
})

const handleOrderUpdated = (event) => {
  console.log('event', event)

  const orderIndex = orders.value.findIndex(order => +order.id === +event.orderId)
  if (orderIndex !== -1) {
    const order = orders.value[orderIndex]

    // ✅ Actualizar los items de la orden
    order.order_items = order.order_items.map(item => {
      const updatedItem = event.orderItems.find(updated => +updated.id === +item.id)
      return updatedItem ? { ...item, ...updatedItem, checked: false } : item
    })

    // ✅ Desmarcar checkbox general
    order.selectAll = false

    // ✅ Eliminar orden si está completada
    if (event.completed) {
      orders.value.splice(orderIndex, 1)
      notifyInfo(`Orden ${order.folio} completada.`)
    }
  }
}

const handleWaiterEditingOrder = (event) => {
  console.log('event', event)

  const order = orders.value.find(order => +order.id === +event.order.id)
  if (order) {
    order.order_status_id = event.order.order_status_id
  }
}

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

const toggleSelectAll = (order) => {
  order.order_items = order.order_items.map(item => {
    if (item.status_id !== ORDER_ITEM_STATUS.READY_TO_SERVE) {
      return { ...item, checked: order.selectAll }
    }
    return item
  })
}

const updateSelectAll = (order) => {
  order.selectAll = order.order_items.map(item => item.status_id !== ORDER_ITEM_STATUS.READY_TO_SERVE ? item.checked : false)
    .every(checked => checked)
}

const updateDishStatus = async (items, status) => {
  const response = await orderItemService.updateDishStatus(items, status)
  if (response.success) notifySuccess(response.message)
  else notifyError(response.message)
}

const selectedStatus = computed(() => (order) => {
  const selectedItems = order.order_items.filter(item => item.checked);

  if (selectedItems.length === 0) return null;

  const status = selectedItems[0].status_id;
  const allSameStatus = selectedItems.every(item => item.status_id === status);

  return allSameStatus ? status : null;
});
</script>

<style scoped>
.border-bottom {
  border-bottom: none !important;
}
</style>
