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
          <q-form class="q-gutter-md" ref="formRef">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-h6 text-weight-regular">{{ $t('basic_information') }}</q-item-label>
                  <q-separator></q-separator>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('table_number') }}</q-item-label>
                  <q-select :rules="[val => !!val || $t('field_is_required')]" dense :label="$t('table_number')"
                    option-label="name" option-value="id" outlined v-model="table" :options="numberTables" options-dense
                    map-options></q-select>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-regular">{{ $t('number_of_diners') }}</q-item-label>
                  <q-input :rules="[val => !!val || $t('field_is_required')]" dense outlined v-model="numberDiners"
                    type="number" :label="$t('number_of_diners')" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 q-pb-xs">{{ $t('order_information') }}</q-item-label>
                  <q-separator></q-separator>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('type_of_dish') }}</q-item-label>
                  <q-select :rules="[val => !!val || $t('field_is_required')]" dense :label="$t('type_of_dish')"
                    option-label="name" option-value="id" outlined v-model="orderedDishes.typeDish" :options="typesDish"
                    options-dense map-options></q-select>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('dish') }}</q-item-label>
                  <q-select :rules="[val => !!val || $t('field_is_required')]" dense option-label="name"
                    option-value="id" outlined v-model="orderedDishes.dishe" :options="dishes" :label="$t('dish')"
                    map-options options-dense></q-select>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('quantity') }}</q-item-label>
                  <q-input :rules="[val => !!val || $t('field_is_required')]" dense outlined min="1"
                    v-model="orderedDishes.quantity" type="number" :label="$t('quantity')"
                    @update:model-value="val => orderedDishes.quantity = Number(val)" />
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="right" class="text-teal">
              <q-btn @click="addDish" :label="$t('add')" type="submit" color="secondary" v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered class>
        <q-card-section>
          <div class="text-h6">{{ $t('recent_orders') }}</div>
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
import { reactive, ref } from "vue";
import { useOrdersStore } from "@/stores/orders-store"

const orderStore = useOrdersStore()

const formRef = ref(null);

const numberTables = ref([
  { id: 1, name: 'Mesa 1' },
  { id: 1, name: 'Mesa 2' },
  { id: 1, name: 'Mesa 3' },
  { id: 1, name: 'Mesa 4' },
])

const typesDish = ref([
  { id: 1, name: 'Desayuno' },
  { id: 2, name: 'Almuerzo' },
  { id: 3, name: 'Cena' },
  { id: 4, name: 'Entradas' },
  { id: 5, name: 'Platos Fuertes' },
  { id: 6, name: 'Postres' },
  { id: 7, name: 'Bebidas' },
  { id: 8, name: 'Aperitivos' },
  { id: 9, name: 'Comida Rápida' },
  { id: 10, name: 'Vegetariano' },
  { id: 11, name: 'Mariscos' },
  { id: 12, name: 'Carnes' },
]);

const dishes = ref([
  { id: 1, name: "Huevos Rancheros", description: "Huevos fritos sobre tortillas con salsa picante.", price: 80, typeDishId: 1 }, // Desayuno
  { id: 2, name: "Panqueques con Miel", description: "Panqueques esponjosos con miel de maple.", price: 75, typeDishId: 1 }, // Desayuno
  { id: 3, name: "Ensalada César", description: "Lechuga, pollo a la parrilla, crutones y aderezo césar.", price: 95, typeDishId: 4 }, // Entrada
  { id: 4, name: "Hamburguesa Clásica", description: "Carne de res, queso cheddar, lechuga, tomate y papas fritas.", price: 120, typeDishId: 9 }, // Comida Rápida
  { id: 5, name: "Pizza Margarita", description: "Pizza con salsa de tomate, mozzarella y albahaca fresca.", price: 150, typeDishId: 5 }, // Plato Fuerte
  { id: 6, name: "Salmón a la Parrilla", description: "Salmón con espárragos y puré de papas.", price: 180, typeDishId: 11 }, // Mariscos
  { id: 7, name: "Filete de Res", description: "Filete jugoso con papas y ensalada.", price: 250, typeDishId: 12 }, // Carnes
  { id: 8, name: "Pasta Alfredo", description: "Fetuccini con salsa cremosa de queso parmesano.", price: 140, typeDishId: 5 }, // Plato Fuerte
  { id: 9, name: "Flan Napolitano", description: "Postre suave de caramelo.", price: 60, typeDishId: 6 }, // Postres
  { id: 10, name: "Jugo de Naranja", description: "Jugo de naranja natural recién exprimido.", price: 40, typeDishId: 7 }, // Bebidas
]);
const table = ref()
const numberDiners = ref(1)

let orderedDishes = reactive({
  dishe: null,
  quantity: 1
});

const data = ref([]);

const columns = [
  { name: 'name', label: 'name', field: 'name', sortable: true, align: 'left' },
  { name: 'quantity', label: 'quantity', field: 'quantity', sortable: true, align: 'left' },
  { name: 'price', label: 'price', field: 'price', sortable: true, align: 'left' },
  { name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center' }
];

const resetOrderedDishes = () => {
  orderedDishes.typeDish = null;
  orderedDishes.dishe = null;
  orderedDishes.quantity = 1;
};

const addDish = async () => {
  const success = await formRef.value.validate();

  if (!success) return;

  const dishIndex = data.value.findIndex(dish => dish.dishe.id === orderedDishes.dishe.id);

  if (dishIndex !== -1) {
    data.value[dishIndex].quantity += orderedDishes.quantity;
  } else {
    data.value.push({ ...orderedDishes });
  }

  resetOrderedDishes();
};

const editItem = ((item) => {
  orderedDishes.value = { ...item }
})
const deleteItem = ((index) => {
  data.value.splice(index, 1)
})

const addOrder = (() => {
  const payload = {
    table: table.value,
    numberDiners: numberDiners.value,
    orders: data.value
  }
  orderStore.addOrderStore(payload)
})
</script>

<style scoped></style>
