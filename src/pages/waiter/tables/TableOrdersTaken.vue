<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">{{ $t('orders_taken') }}</div>
    </q-card-section>

    <q-separator inset></q-separator>

    <q-card-section>
      <q-table :rows="data" :columns="columns">
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>{{ props.row.dishe?.name || 'Sin nombre' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>{{ props.row.quantity || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>${{ props.row.dishe?.price || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'kitchen') ? 'yellow' : (props.row.status == 'cooked' ? 'green' : 'grey')"
              text-color="white" dense class="text-weight-bolder" square>
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn flat dense round icon="more_vert">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="editItem(props.row)">
                    <q-item-section avatar>
                      <q-icon color="secondary" name="edit" />
                    </q-item-section>
                    <q-item-section>{{ $t('edit') }}</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="deleteItem(props.rowIndex)">
                    <q-item-section avatar>
                      <q-icon color="secondary" name="delete" />
                    </q-item-section>
                    <q-item-section>{{ $t('delete') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useOrderStore } from '@/stores/waiter/order-store';
import { useChefOrdersStore } from '@/stores/chef-orders-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = ref([]);
const orderStore = useOrderStore();
const chefOrderStore = useChefOrdersStore();

const columns = [
  { name: 'name', label: 'name', field: 'name', sortable: true, align: 'left' },
  { name: 'quantity', label: 'quantity', field: 'quantity', sortable: true, align: 'left' },
  { name: 'price', label: 'price', field: 'price', sortable: true, align: 'left' },
  { name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center' }
];

const addOrderToTable = () => {
  chefOrderStore.addOrder({
    table: orderStore.table,
    numberDiners: orderStore.numberDiners,
    orders: data.value
  });
  orderStore.resetState()
  router.push({ name: 'home', });
};

defineExpose({ addOrderToTable });

const editItem = (item) => {
  console.log('editItem', item);
};

const deleteItem = (index) => {
  data.value.splice(index, 1);
};

watch(() => orderStore.order, () => {
  if (!orderStore.order || !orderStore.order.dishe) {
    return;
  }

  const dishIndex = data.value.findIndex(dish => dish.dishe.id === orderStore.order.dishe.id);

  if (dishIndex !== -1) {
    data.value[dishIndex].quantity += orderStore.order.quantity;
  } else {
    data.value.push({
      ...orderStore.order,
      status: 'created'
    });
  }
});
</script>
