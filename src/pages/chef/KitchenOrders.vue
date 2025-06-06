<template>
  <transition appear enter-active-class="animated zoomIn slower" leave-active-class="animated zoomOut slower">
    <q-page class="q-col-gutter-sm q-pa-lg" style="z-index: 1">
      <q-page-sticky position="top-right" :offset="[18, 18]" style="z-index: 2;">
        <q-btn color="secondary" glossy round size="md" icon="mdi-bell-ring" @click="handleScrollToBottom">
          <!-- Badge para el número de órdenes pendientes -->
          <q-badge color="yellow" class="text-dark" floating v-if="pendingOrders > 0">
            {{ pendingOrders }}
          </q-badge>
          <q-tooltip class="bg-primary" anchor="center left" self="center right" :offset="[10, 10]">
            Ordenes pendientes
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
      <q-infinite-scroll @load="onLoad" :offset="16">
        <q-timeline color=" secondary">
          <q-timeline-entry heading :body="currentTime" />
          <q-timeline-entry v-for="order in orders" :key="order.id" color="secondary">
            <div class="row justify-between items-center full-width">
              <div class="text-weight-bold">{{ order.folio }}</div>
              <div :class="[getTextColor(), 'text-caption']">{{ order.formatted_time }}</div>
            </div>

            <q-expansion-item class="text-weight-bold" :label="order.table.name">
              <q-card flat bordered class="q-pa-sm q-mt-xs" style="border-radius: 10px;">
                <!-- Checkbox para seleccionar todos los items -->
                <div class="row justify-between items-center q-mb-md" :class="{ 'bg-teal-1': order.editing }">
                  <div class="row items-center">
                    <q-checkbox v-model="order.selectAll" label="Seleccionar todo"
                      @update:model-value="toggleSelectAll(order)" class="q-ml-sm" />
                  </div>

                  <!-- ✅ Animación Lottie al lado del checkbox -->
                  <LottieAnimation v-if="order.editing" :animationData="animationData" :loop="true" :autoplay="true"
                    width="60px" height="60px" class="q-ml-sm" />
                </div>
                <!-- Renderizado de los items -->
                <q-virtual-scroll style="max-height: 400px; overflow-y: auto;" :items="order.order_items"
                  v-slot="{ item, index }" virtual-scroll-item-size="100" virtual-scroll-sticky>

                  <q-card :key="item.id" class="col-lg-4 fit col-md-4 col-sm-12 col-xs-12 no-shadow no-border">
                    <q-item class="q-pa-none q-pa-sm">
                      <!-- Checkbox individual -->
                      <q-checkbox class="q-mx-xs" v-if="item.status_id !== ORDER_ITEM_STATUS.READY_TO_SERVE"
                        v-model="item.checked" @update:model-value="updateSelectAll(order)" />
                      <q-checkbox class="q-mx-xs" v-else v-model="item.checked" style="visibility: hidden;" />

                      <!-- Avatar y detalles del platillo -->
                      <q-item-section avatar>
                        <q-avatar size="40px" class="shadow-4 bg-secondary">
                          <q-icon class="q-px-sm" color="white" size="sm"
                            :name="getStatusDishIcon(item.dish_type)"></q-icon>
                        </q-avatar>
                      </q-item-section>
                      <div class="row justify-between full-width">
                        <div class="col-12 col-sm">
                          <q-item-label :class="[getTextColor(), 'text-bold']">
                            <span>{{ item.dish_name }}</span>
                          </q-item-label>

                          <q-item-label :class="[getTextColor()]">
                            Cantidad: {{ item.quantity }}
                          </q-item-label>

                          <q-item-label :class="[getTextColor()]">
                            Observaciones
                            <q-avatar class="bg-red-2 q-ml-xs" size="sm" font-size="18px" text-color="primary"
                              :icon="item.showObservations ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                              @click="toggleObservations(item)" />
                          </q-item-label>

                          <transition appear enter-active-class="animated zoomIn slow"
                            leave-active-class="animated zoomOut fast">
                            <div v-show="item.showObservations" class="q-my-xs">
                              <q-item-label v-for="(observation, index) in item.observations" :key="index"
                                :class="[getTextColor('', 'text-grey-11'), 'text-weight-thin']">
                                <span class="text-weight-bold">{{ `Platillo ${index + 1}` }}</span>
                                <span>{{ `- ${observation}` }}</span>
                              </q-item-label>
                            </div>
                          </transition>

                          <q-item-label style="overflow: hidden;">
                            <transition appear enter-active-class="animated fadeIn slow"
                              leave-active-class="animated fadeOutRight slow"
                              @leave="(el) => { el.style.height = '0px'; }">
                              <div :key="item.order_item_status?.id">
                                <q-chip :color="getStatusColor(item.order_item_status?.id)" text-color="dark" dense
                                  class="text-weight-bold text-center" square>
                                  <q-icon :name="getStatusIcon(item.order_item_status?.id)" class="q-mr-xs" />
                                  {{ item.order_item_status?.name }}
                                </q-chip>
                              </div>
                            </transition>
                          </q-item-label>
                        </div>
                        <!-- Botones de acción -->
                        <div class="col-12 col-sm-auto row justify-start items-center">
                          <q-btn v-show="item.status_id === ORDER_ITEM_STATUS.IN_KITCHEN"
                            @click="changeStatus([item], ORDER_ITEM_STATUS.PREPARING)" size="md" dense flat round
                            icon="mdi-chef-hat" class="bg-accent text-white">
                            <q-tooltip>¡Voy a preparar!</q-tooltip>
                          </q-btn>

                          <q-btn v-show="item.status_id === ORDER_ITEM_STATUS.PREPARING"
                            @click="changeStatus([item], ORDER_ITEM_STATUS.READY_TO_SERVE)" size="md" dense flat round
                            icon="mdi-silverware-fork-knife" class="bg-mulberry text-white">
                            <q-tooltip>¡Listo para servir!</q-tooltip>
                          </q-btn>
                        </div>
                      </div>
                    </q-item>
                    <q-separator v-if="index < order.order_items.length - 1" inset />
                  </q-card>
                </q-virtual-scroll>

                <!-- Botones de acción por orden -->
                <div v-if="selectedStatus(order) !== null" class="row justify-between items-center q-py-sm q-mx-md">

                  <q-btn v-if="selectedStatus(order) === ORDER_ITEM_STATUS.IN_KITCHEN" icon="mdi-chef-hat" size="12px"
                    color="accent" outline label="Voy a preparar" @click="changeStatus(order.order_items.filter(item => item.checked),
                      ORDER_ITEM_STATUS.PREPARING)" />

                  <q-btn v-if="selectedStatus(order) === ORDER_ITEM_STATUS.PREPARING" icon="mdi-silverware-fork-knife"
                    size="12px" outline color="green-10" label="Listo para servir" @click="changeStatus(
                      order.order_items.filter(item => item.checked),
                      ORDER_ITEM_STATUS.READY_TO_SERVE
                    )" />
                </div>
              </q-card>
            </q-expansion-item>
          </q-timeline-entry>
        </q-timeline>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-puff color="primary" size="2.5em" />
          </div>
        </template>
      </q-infinite-scroll>
      <confirm-dialog v-model="isVisible" :confirm-items="confirmItems" :confirm-status="confirmStatus"
        :order-folio="orderFolio" @confirm="updateDishStatus" />
    </q-page>
  </transition>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import orderService from 'src/services/orderService'
import orderItemService from 'src/services/orderItemService'
import { getStatusColor, getStatusIcon, ORDER_ITEM_STATUS, getStatusDishIcon, ORDER_STATUS } from '@/constants/status.js'
import { notifyError, notifyInfo, notifySuccess, notifyWarning } from 'src/utils/notify'
import LottieAnimation from 'src/components/LottieAnimation.vue'
import animationData from 'src/assets/chef/waiter-edit.json'
import { echo } from 'boot/echo'
import { es } from 'date-fns/locale';
import ConfirmDialog from 'src/components/chef/ConfirmDialog.vue'
import { getTextColor } from 'src/utils/theme';
import { format } from 'date-fns';


/* ✅ VARIABLES */
const now = ref(new Date());

const orders = ref([])
const currentPage = ref(1)
const hasMoreData = ref(true)
const perPage = ref(10)
const pendingOrders = ref(null)

const isVisible = ref(false)
const confirmItems = ref([])
const confirmStatus = ref(null)

const orderMap = ref(new Map())
let intervalId = null;

const currentTime = computed(() => format(now.value, 'HH:mm a', { locale: es }));


const updateTime = () => {
  now.value = new Date();

};

/* ✅ COMPUTED PROPERTIES */
const orderFolio = computed(() => {
  if (confirmItems.value.length > 0) {
    const order = orderMap.value.get(confirmItems.value[0].order_id)
    return order ? order.folio : ''
  }
  return ''
})

const selectedStatus = computed(() => (order) => {
  const selectedItems = order.order_items.filter(item => item.checked)
  if (selectedItems.length === 0) return null
  const status = selectedItems[0].status_id
  const allSameStatus = selectedItems.every(item => item.status_id === status)
  return allSameStatus ? status : null
})

/* ✅ CICLO DE VIDA */
onMounted(() => {
  echo.private('order-items-updated')
    .stopListening('OrderItemsUpdated')
    .listen('OrderItemsUpdated', handleOrderUpdated)

  echo.private('waiter-editing-order')
    .stopListening('WaiterEditingOrder')
    .listen('WaiterEditingOrder', handleWaiterEditingOrder)

  echo.private('orders-updated')
    .stopListening('OrdersUpdated')
    .listen('OrdersUpdated', ordersUpdated)

  echo.private('order-item-deleted')
    .stopListening('OrderItemDeleted')
    .listen('OrderItemDeleted', orderItemDeleted)

  updateTime();
  setInterval(updateTime, 1000);
})

onBeforeUnmount(() => {
  clearInterval(intervalId)

  const events = {
    'order-items-updated': 'OrderItemsUpdated',
    'waiter-editing-order': 'WaiterEditingOrder',
    'orders-updated': 'OrdersUpdated',
    'order-item-deleted': 'OrderItemDeleted'
  }

  Object.entries(events).forEach(([channel, event]) => {
    echo.private(channel).stopListening(event)
  })
})

/* ✅ WATCHERS */
watchEffect(() => {
  orderMap.value = new Map(orders.value.map(order => [order.id, order]))
})

/* ✅ MÉTODOS (ordenados según uso en el template) */
const onLoad = async (index, done) => {
  if (!hasMoreData.value) return done(true)

  const response = await orderService.index({
    page: currentPage.value,
    per_page: perPage.value
  })

  if (response.success) {
    pendingOrders.value = response.data.pendingOrders
    const data = response.data.orders
    orders.value = orders.value.concat(data.data)
    hasMoreData.value = !!data.next_page_url
    if (data.next_page_url) currentPage.value++
  }

  done(false)
}

const handleScrollToBottom = async () => {
  window.location.reload();
}

const changeStatus = (items, status) => {
  if (!items.length) return
  isVisible.value = true
  confirmItems.value = items
  confirmStatus.value = status
}

const updateDishStatus = async () => {
  const response = await orderItemService.updateDishStatus(confirmItems.value, confirmStatus.value)
  if (response.success) notifySuccess(response.message)
  else notifyError(response.message)
  isVisible.value = false
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
  order.selectAll = order.order_items
    .map(item => item.status_id !== ORDER_ITEM_STATUS.READY_TO_SERVE ? item.checked : false)
    .every(checked => checked)
}

const ordersUpdated = (event) => {
  pendingOrders.value = event.pendingOrders

  if (event.order) {
    const existingOrder = orderMap.value.get(+event.order.id)
    ordeCanceled(existingOrder, event)
    if (existingOrder || hasMoreData.value) return

    // Insertar la orden en la posición correcta
    const index = orders.value.findIndex(o => o.id > event.order.id)
    if (index === -1) {
      orders.value.push(event.order) // Si es la más grande, agregar al final
    } else {
      orders.value.splice(index, 0, event.order) // Insertar en la posición correcta
    }
  }
}

const ordeCanceled = (existingOrder, event) => {
  if (existingOrder && event.order.order_status_id == ORDER_STATUS.CANCELED) {
    const index = orders.value.findIndex(o => o.id === +event.order.id);
    if (index !== -1) {
      notifyWarning(`La orden ${existingOrder.folio} fue cancelada`)
      orders.value.splice(index, 1);
    }
  }
}

const orderItemDeleted = (event) => {
  const order = orderMap.value.get(+event.orderItem.order_id)
  if (order) {
    order.order_items = order.order_items.filter(
      item => +item.id !== +event.orderItem.id
    )
  }
}

const handleOrderUpdated = (event) => {
  const order = orderMap.value.get(+event.orderId)
  if (order) {
    const updatedItemsMap = new Map(event.orderItems.map(item => [item.id, item]))
    order.order_items = updateExistingItems(order, updatedItemsMap)
    addNewItems(order, updatedItemsMap)
    order.selectAll = false
    finalizeOrder(event, order)
  }
}

const updateExistingItems = (order, updatedItemsMap) => {
  return order.order_items.map(item => {
    if (updatedItemsMap.has(item.id)) {
      const updatedItem = updatedItemsMap.get(item.id)
      return { ...item, ...updatedItem, checked: false }
    }
    return item
  })
}

const addNewItems = (order, updatedItemsMap) => {
  const existingItemsMap = new Map(order.order_items.map(item => [item.id, item]))
  for (const [id, item] of updatedItemsMap) {
    if (!existingItemsMap.has(id)) {
      order.order_items.push({ ...item, checked: false })
    }
  }
}

const finalizeOrder = (event, order) => {
  if (event.completed) {
    const orderIndex = orders.value.findIndex(order => +order.id === +event.orderId)
    if (orderIndex !== -1) {
      orders.value.splice(orderIndex, 1)
      notifyInfo(`Orden ${order.folio} completada.`)
    }
  }
}

const handleWaiterEditingOrder = (event) => {
  const order = orderMap.value.get(+event.order.id)
  if (order) {
    order.editing = event.order.editing
  }
}

const toggleObservations = (item) => {
  item.showObservations = !item.showObservations
}
</script>
