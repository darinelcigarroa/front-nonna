<template>
  <q-form class="q-gutter-md" ref="formRef">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs text-h6 text-weight-regular">{{ $t('basic_information') }}</q-item-label>
          <q-separator></q-separator>
        </q-item-section>
      </q-item>
      <q-item v-if="orderID != undefined" class="column">
        <div class="row justify-between items-center full-width">
          <div class="bg-green-1" style="display: inline-block; line-height: 1; padding: 2px;">
            N.º de folio: 282FYA0183JAI
          </div>
          <div class="bg-blue-1" style="display: inline-block; line-height: 1; padding: 2px;">
            Fecha: 24/02/2025
          </div>
        </div>
        <div class="bg-purple-1 q-mt-md"
          style="display: inline-block; line-height: 1; padding: 2px; align-self: flex-start;">
          Hora: 24/02/2025
        </div>
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
          <q-select :rules="[val => !!val || $t('field_is_required')]" dense option-label="name" option-value="id"
            outlined v-model="orderedDishes.dishe" :options="dishes" :label="$t('dish')" map-options
            options-dense></q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs">{{ $t('quantity') }}</q-item-label>
          <q-input :rules="[val => !!val || $t('field_is_required')]" dense outlined min="1"
            v-model="orderedDishes.quantity" type="number" :label="$t('quantity')"
            @update:model-value="onUpdateQuantity" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right" class="text-teal">
      <q-btn @click="formAction" :label="$t('add')" type="submit" color="secondary" v-close-popup />
    </q-card-actions>
  </q-form>
</template>
<script setup>
import { ref, reactive } from "vue"
import { useOrderStore } from "@/stores/waiter/order-store"
import { useRoute } from "vue-router";

const formRef = ref(null);
const table = ref()
const numberDiners = ref(1)
const orderStore = useOrderStore()
const route = useRoute()
const orderID = route.params.id

const resetOrderedDishes = () => {
  orderedDishes.typeDish = null;
  orderedDishes.dishe = null;
  orderedDishes.quantity = 1;
};

let orderedDishes = reactive({
  typeDish: null,
  dishe: null,
  quantity: 1
});

const numberTables = ref([
  { id: 1, name: 'Mesa 1' },
  { id: 2, name: 'Mesa 2' },
  { id: 3, name: 'Mesa 3' },
  { id: 4, name: 'Mesa 4' },
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

const onUpdateQuantity = ((val) => {
  orderedDishes.quantity = Number(val)
})

const formAction = async () => {
  const success = await formRef.value.validate();

  if (!success) return;

  orderStore.setOrder({
    table: table.value,
    numberDiners: numberDiners.value,
    orderedDishes: orderedDishes
  })

  resetOrderedDishes();
};
</script>
