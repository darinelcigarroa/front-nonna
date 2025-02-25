<template>
  <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section class="flex justify-between">
          <div class="text-h6">{{ $t('add_dish') }}</div>
          <q-btn @click="addOrder" align="around" class="btn-fixed-width" color="secondary" :label="$t('finish_order')"
            icon="mdi-check" />
        </q-card-section>

        <q-separator inset></q-separator>
        <q-card-section>
          <FormOrder @form-action="addDish"></FormOrder>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section>
          <div class="text-h6">{{ $t('orders_taken') }}</div>
        </q-card-section>

        <q-separator inset></q-separator>

        <q-card-section>
          <q-table :rows="data" :columns="columns" row-key="id">
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
    </div>
    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section>
          <div class="text-h6">{{ $t('orders_in_kitchen') }}</div>
        </q-card-section>

        <q-separator inset></q-separator>

        <q-card-section>
          <q-table :rows="data" :columns="columns" row-key="id">
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useChefOrdersStore } from "@/stores/chef-orders-store"
import { useOrderStore } from "@/stores/waiter/order-store"
import FormOrder from "./cards/FormOrder.vue";

const data = ref([]);

const chefOrderStore = useChefOrdersStore()
const orderStore = useOrderStore()

const columns = [
  { name: 'name', label: 'name', field: 'name', sortable: true, align: 'left' },
  { name: 'quantity', label: 'quantity', field: 'quantity', sortable: true, align: 'left' },
  { name: 'price', label: 'price', field: 'price', sortable: true, align: 'left' },
  { name: 'status', label: 'status', field: 'status', sortable: true, align: 'left' },
  { name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center' }
];

const addDish = async () => {

  const dishIndex = data.value.findIndex(dish => dish.dishe.id === orderStore.order.dishe.id);

  if (dishIndex !== -1) {
    data.value[dishIndex].quantity += orderStore.order.quantity;
  } else {
    data.value.push({
      ...orderStore.order,
      status: 'created'
    });
  }
};

const editItem = ((item) => {
  console.log('editItem', item)
  // orderedDishes.value = { ...item }
})
const deleteItem = ((index) => {
  data.value.splice(index, 1)
})

const addOrder = (() => {
  chefOrderStore.addOrder({
    table: orderStore.table,
    numberDiners: orderStore.numberDiners,
    orders: data.value
  })
})
</script>

<style scoped></style>
