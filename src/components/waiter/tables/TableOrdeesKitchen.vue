<template>
  <q-card flat bordered class>
    <q-card-section>
      <div class="text-h6">{{ $t('orders_in_kitchen') }}</div>
    </q-card-section>

    <q-separator inset></q-separator>

    <q-card-section>
      <q-table :rows="dataKitchen" :columns="columns" row-key="id">
        <!-- Nombre del platillo -->
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>{{ props.row.dishe?.name || 'Sin nombre' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <!-- Cantidad -->
        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>{{ props.row.quantity || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <!-- Precio -->
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section>
                <q-item-label>${{ props.row.dishe?.price || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <!-- Status -->
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'kitchen') ? 'yellow' : (props.row.status == 'cooked' ? 'green' : 'grey')"
              text-color="white" dense class="text-weight-bolder" square>
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-d="props">
          <q-td :props="props">
            Divisor
          </q-td>
        </template>
        <!-- Action -->
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
import { onMounted } from 'vue';

const router = useRouter();
const dataKitchen = ref([]);
const orderStore = useOrderStore();
const chefOrderStore = useChefOrdersStore();

onMounted(() => {
  const data =
  {
    table: {
      "id": 2,
      "name": "Mesa 2",
      "numberDiners": 1
    },
    orders: [
      {
        "dishe": { "id": 101, "name": "Ensalada César" },
        "quantity": 1,
        "status": "created",
        "typeDish": { "id": 1, "name": "Entradas" }
      },
      {
        "dishe": { "id": 102, "name": "Sopa de Tortilla" },
        "quantity": 2,
        "status": "created",
        "typeDish": { "id": 2, "name": "Sopas" }
      },
      {
        "dishe": { "id": 103, "name": "Pasta Alfredo" },
        "quantity": 1,
        "status": "created",
        "typeDish": { "id": 3, "name": "Pastas" }
      },
      {
        "dishe": { "id": 104, "name": "Hamburguesa BBQ" },
        "quantity": 1,
        "status": "created",
        "typeDish": { "id": 4, "name": "Platos Fuertes" }
      },
      {
        "dishe": { "id": 105, "name": "Tacos al Pastor" },
        "quantity": 3,
        "status": "created",
        "typeDish": { "id": 5, "name": "Platos Fuertes" }
      },
      {
        "dishe": { "id": 106, "name": "Pizza Margarita" },
        "quantity": 1,
        "status": "kitchen",
        "typeDish": { "id": 6, "name": "Platos Fuertes" }
      },
      {
        "dishe": { "id": 107, "name": "Churrasco" },
        "quantity": 2,
        "status": "kitchen",
        "typeDish": { "id": 7, "name": "Platos Fuertes" }
      },
      {
        "dishe": { "id": 108, "name": "Risotto de Champiñones" },
        "quantity": 1,
        "status": "kitchen",
        "typeDish": { "id": 8, "name": "Platos Fuertes" }
      },
      {
        "dishe": { "id": 109, "name": "Filete de Salmón" },
        "quantity": 2,
        "status": "kitchen",
        "typeDish": { "id": 9, "name": "Platos Fuertes" }
      },
      {
        "dishe": { "id": 110, "name": "Postre de Chocolate" },
        "quantity": 1,
        "status": "kitchen",
        "typeDish": { "id": 10, "name": "Postres" }
      }
    ]
  }

  // console.log(data)
  dataKitchen.value = data.orders.filter((item) => {
    // console.log('item', item)
    return item.status == 'kitchen'
  })
})

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
    orders: dataKitchen.value
  });
  orderStore.resetState()
  router.push({ name: 'home', });
};

defineExpose({ addOrderToTable });

const editItem = (item) => {
  console.log('editItem', item);
};

const deleteItem = (index) => {
  dataKitchen.value.splice(index, 1);
};

watch(() => orderStore.order, () => {
  if (!orderStore.order || !orderStore.order.dishe) {
    return;
  }

  const dishIndex = dataKitchen.value.findIndex(dish => dish.dishe.id === orderStore.order.dishe.id);

  if (dishIndex !== -1) {
    dataKitchen.value[dishIndex].quantity += orderStore.order.quantity;
  } else {
    dataKitchen.value.push({
      ...orderStore.order,
      status: 'created'
    });
  }
});
</script>
