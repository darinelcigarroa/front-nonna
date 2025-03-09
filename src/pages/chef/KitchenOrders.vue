<template>
  <q-img src="/wave-5.svg" style="bottom: 1px;" />
  <q-page class="q-ma-md q-px-xl">
    <q-timeline color="secondary">
      <q-timeline-entry heading body="November, 2017" />
      <q-timeline-entry v-for="(order) in orders" :key="order.id" color="secondary">
        <div class="row justify-between items-center full-width">
          <div class="text-weight-bold">{{ order.folio }}</div>
          <div class="text-grey-7 text-caption">{{ order.formatted_time }}</div>
        </div>
        <q-expansion-item class=" text-weight-bold" :label="order.table.name">
          <q-card flat bordered class="q-pa-sm q-mt-xs" style="border-radius: 10px;">
            <q-checkbox v-model="order.selectAll" label="Seleccionar todo" @update:model-value="toggleSelectAll(order)"
              class="q-mb-md" />
            <q-card v-for="(item, index) in order.order_items" :key="item.id"
              class="col-lg-4 fit col-md-4 col-sm-12 col-xs-12 no-shadow q-px-sm no-border custom-card"
              :class="{ 'border-bottom': index === order.order_items.length - 1 }">
              <q-item>
                <q-checkbox class="q-mx-xs" v-if="item.status_id !== ORDER_ITEM_STATUS.READY_TO_SERVE"
                  v-model="item.checked" @update:model-value="updateSelectAll(order)" />
                <q-checkbox class="q-mx-xs" v-else v-model="item.checked" style="visibility: hidden;" />

                <q-item-section avatar>
                  <q-avatar size="60px" class="shadow-4">
                    <img src="/chef/sarten-1.svg" style="object-fit: contain; width: 85%; height: 85%;" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-grey-8 text-weight-bold">{{ item.dish_name }}</q-item-label>
                  <q-item-label class="text-grey-8">
                    Cantidad: {{ item.quantity }}
                  </q-item-label>
                  <q-item-label>
                    <q-chip :color="getStatusColor(item.order_item_status.id)" text-color="dark" dense
                      class="text-weight-bold text-center" square>
                      <q-icon :name="getStatusIcon(item.order_item_status.id)" class="q-mr-xs" />
                      {{ item.order_item_status.name }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label v-if="item.status_id === ORDER_ITEM_STATUS.IN_KITCHEN">
                    <q-btn @click="updateDishStatus([item], ORDER_ITEM_STATUS.IN_KITCHEN)" size="md" dense flat round
                      icon="mdi-chef-hat" class="bg-accent text-white">
                      <q-tooltip class="bg-blue-1 text-dark" transition-show="rotate" transition-hide="rotate">
                        ¡Voy a preparar!
                      </q-tooltip>
                    </q-btn>
                  </q-item-label>
                  <q-item-label v-if="item.status_id === ORDER_ITEM_STATUS.PREPARING">
                    <q-btn @click="updateDishStatus([item], ORDER_ITEM_STATUS.PREPARING)" size="md" dense flat round
                      icon="mdi-silverware-fork-knife" class="bg-mulberry text-white">
                      <q-tooltip class="bg-green-1 text-dark" transition-show="rotate" transition-hide="rotate">
                        ¡Listo para servir!
                      </q-tooltip>
                    </q-btn>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>

            <!-- ✅ Mostrar botones solo si hay consistencia en el estado -->
            <div v-if="selectedStatus(order) !== null" class="row justify-between items-center q-py-sm q-mx-md">
              <q-btn v-if="selectedStatus(order) === ORDER_ITEM_STATUS.IN_KITCHEN" icon="mdi-chef-hat" size="12px"
                color="accent" outline label="Voy a preparar"
                @click="updateDishStatus(order.order_items.filter(item => item.checked), ORDER_ITEM_STATUS.PREPARING)" />

              <q-btn v-if="selectedStatus(order) === ORDER_ITEM_STATUS.PREPARING" icon="mdi-silverware-fork-knife"
                size="12px" outline color="green-10" label="Listo para servir"
                @click="updateDishStatus(order.order_items.filter(item => item.checked), ORDER_ITEM_STATUS.READY_TO_SERVE)" />
            </div>
          </q-card>
        </q-expansion-item>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>


<script setup>
import orderItemService from 'src/services/orderItemService';
import { useOrderStore } from 'src/stores/waiter/order-store'
import { ref, onMounted, computed } from 'vue'
import { ORDER_ITEM_STATUS } from '@/constant/status.js'

const orderStore = useOrderStore()
const orders = ref([])

onMounted(async () => {
  const result = await orderStore.index()
  if (result.success) {
    orders.value = result.data.orders;

    // ✅ Inicializar estado
    orders.value.forEach(order => {
      order.selectAll = false;
      order.order_items.forEach(item => {
        item.checked = false;
      });
    });
  }
});

const STATUS_COLORS = {
  [ORDER_ITEM_STATUS.CREATED]: 'grey-5',           // Creado
  [ORDER_ITEM_STATUS.IN_KITCHEN]: 'yellow-2',      // En cocina
  [ORDER_ITEM_STATUS.PREPARING]: 'blue-2',         // Preparando
  [ORDER_ITEM_STATUS.READY_TO_SERVE]: 'green-2',   // Listo para servir
  [ORDER_ITEM_STATUS.CANCELED]: 'red-3'            // Cancelado
};

const STATUS_ICONS = {
  [ORDER_ITEM_STATUS.CREATED]: 'mdi-cart',                     // Pedido recibido
  [ORDER_ITEM_STATUS.IN_KITCHEN]: 'mdi-pot',                   // En cocina
  [ORDER_ITEM_STATUS.PREPARING]: 'mdi-chef-hat',  // Preparando
  [ORDER_ITEM_STATUS.READY_TO_SERVE]: 'mdi-silverware-fork-knife',         // Listo para servir
  [ORDER_ITEM_STATUS.CANCELED]: 'mdi-close-circle-outline'     // Cancelado
};

const getStatusColor = (statusId) => {
  return STATUS_COLORS[statusId] || 'grey-5';
};

const getStatusIcon = (statusId) => {
  return STATUS_ICONS[statusId] || 'mdi-help-circle-outline';
};


const selectedStatus = computed(() => (order) => {
  const selectedItems = order.order_items.filter(item => item.checked);

  if (selectedItems.length === 0) return null;

  // Verifica si todos tienen el mismo status_id
  const status = selectedItems[0].status_id;
  const allSameStatus = selectedItems.every(item => item.status_id === status);

  return allSameStatus ? status : null;
});

const toggleSelectAll = (order) => {
  order.order_items = order.order_items.map(item => ({
    ...item,
    checked: order.selectAll
  }));
};

const updateSelectAll = (order) => {
  order.selectAll = order.order_items.every(item => item.checked);
};

// ✅ Función genérica para actualizar estado
const updateDishStatus = async (orderItems, status) => {

  const ids = orderItems.map(item => item.id);

  try {
    const response = await orderItemService.updateDishStatus(ids, status);
    console.log('response', response);
  } catch (error) {
    console.error('Error:', error);
  }
};

</script>
<style>
:deep(.q-expansion-item .q-item) {
  min-height: 0px !important;
  padding: 16px 0px !important;
}

.q-card__section {
  border-radius: 15px !important;
}

/* .custom-card {
  border: none !important;
   border-bottom: 0.3px dashed rgb(140, 140, 140) !important;
} 
  */

.border-bottom {
  border-bottom: none !important;
}
</style>
