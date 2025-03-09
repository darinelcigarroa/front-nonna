<template>
  <q-form class="q-gutter-md" ref="formRef">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs text-h6 text-weight-regular">{{ $t('basic_information') }}</q-item-label>
          <!-- <q-separator></q-separator> -->
        </q-item-section>
      </q-item>
      <q-item v-if="isEditingOrder" class="column">
        <div class="row justify-between items-center full-width">
          <div class="bg-green-1" style="display: inline-block; line-height: 1; padding: 2px;">
            N.º de folio: {{ orderStore.currentOrder.folio }}
          </div>
          <div class="bg-blue-1" style="display: inline-block; line-height: 1; padding: 2px;">
            Fecha: {{ orderStore.currentOrder.date }}
          </div>
        </div>
        <div class="bg-purple-1 q-mt-md"
          style="display: inline-block; line-height: 1; padding: 2px; align-self: flex-start;">
          Hora: {{ orderStore.currentOrder.time }}
        </div>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs">{{ $t('table_number') }}</q-item-label>
          <q-select :rules="[val => !!val || $t('field_is_required')]" dense option-label="name" option-value="id"
            :disable="isEditingOrder" outlined v-model="orderStore.currentOrder.table" :options="filteredTables"
            :label="$t('table_number')" map-options options-dense @filter="filterTables" behavior="menu" use-input
            fill-input hide-selected>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs text-weight-regular">{{ $t('number_of_diners')
            }}</q-item-label>
          <q-input :disable="isEditingOrder" :rules="[val => !!val || $t('field_is_required')]" dense outlined
            v-model="orderStore.currentOrder.numberDiners" type="number" :label="$t('number_of_diners')" />
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
            option-label="name" option-value="id" outlined v-model="orderStore.currentOrder.typeDish"
            :options="dishTypeStore.dishType" options-dense map-options></q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs">{{ $t('dish') }}</q-item-label>
          <q-select :disable="orderStore.currentOrder.typeDish == null"
            :rules="[val => !!val || $t('field_is_required')]" dense option-label="name" option-value="id" outlined
            v-model="orderStore.currentOrder.dish" :options="filteredDishes" :label="$t('dish')" map-options
            options-dense @filter="filterDishes" :loading="loadingDishes" behavior="menu" use-input fill-input
            hide-selected></q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs">{{ $t('quantity') }}</q-item-label>
          <q-input :rules="[val => !!val || $t('field_is_required')]" dense outlined min="1"
            v-model="orderStore.currentOrder.quantity" type="number" :label="$t('quantity')"
            @update:model-value="onUpdateQuantity" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs">{{ $t('observation') }}</q-item-label>
          <q-input v-model="orderStore.currentOrder.observations" :label="$t('observation')" placeholder="Sin cebolla"
            outlined dense autogrow />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right" class="text-teal justify-between">
      <q-btn @click="handleOrderClick" :label="isEditingOrder ? $t('update_order') : $t('finish_order')"
        icon="mdi-check" color="accent" v-close-popup />

      <q-btn v-if="orderStore.currentOrder.edit" @click="updateOrderTable" :label="$t('update')" color="secondary"
        v-close-popup />
      <q-btn v-else :label="$t('add')" @click="onSubmit" color="secondary" v-close-popup />

    </q-card-actions>
  </q-form>
</template>
<script setup>
import { useOrderStore } from "@/stores/waiter/order-store"
import { ref, onMounted, watch, computed } from "vue"
import { notifyError, notifySuccess } from 'src/utils/notify';
import { useQuasar } from 'quasar';
import tableService from '@/services/tableService';
import dishesService from '@/services/dishesService';
import { useDishTypeStore } from '@/stores/waiter/dish-type'
import { useRouter, useRoute } from 'vue-router';

// 🟢 1. Referencias reactivas
const formRef = ref(null);
const loadingDishes = ref(false);
const dishes = ref([]);
const numberTables = ref([]);

// 🟢 2. Variables derivadas (dependen de las referencias anteriores)
const filteredTables = ref([...numberTables.value]);
const filteredDishes = ref([...dishes.value]);

// 🟢 3. Instancias de librerías y stores
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const orderStore = useOrderStore();
const dishTypeStore = useDishTypeStore();

// 🟢 4. Variables de parámetros de ruta
const orderID = route.params.id;


onMounted(async () => {
  $q.loading.show()
  const dataTable = await tableService.index()

  await dishTypeStore.index()

  if (dataTable.success) {
    numberTables.value = dataTable.data.tables
  }

  $q.loading.hide()
})

watch(() => orderStore.currentOrder.typeDish, async (newVal) => {
  if (!newVal) return;
  loadingDishes.value = true

  const result = await dishesService.index({ typeDish: orderStore.currentOrder.typeDish.id });

  if (result.success) {
    dishes.value = result.data.dishes;
    loadingDishes.value = false
  }
});

const isEditingOrder = computed(() => !!orderID);
const handleOrderClick = computed(() => isEditingOrder.value ? handleOrderUpdate : handleOrderAdded);

const filterTables = (val, update) => {
  if (val === "") {
    update(() => {
      filteredTables.value = [...numberTables.value];
    });
    return;
  }

  update(() => {
    filteredTables.value = numberTables.value.filter(table =>
      table.name.toLowerCase().includes(val.toLowerCase())
    );
  });
};
const filterDishes = (val, update) => {
  if (val === "") {
    update(() => {
      filteredDishes.value = [...dishes.value];
    });
    return;
  }

  update(() => {
    filteredDishes.value = dishes.value.filter(dish =>
      dish.name.toLowerCase().includes(val.toLowerCase())
    );
  });
};
const onUpdateQuantity = ((val) => {
  orderStore.currentOrder.quantity = Number(val)
})
const onSubmit = async () => {
  if (!formRef.value) return;

  const success = await formRef.value.validate();
  if (!success) return;

  try {
    await orderStore.setOrder();
    formRef.value.resetValidation();
  } catch (error) {
    notifyError(error)
  }
}
const updateOrderTable = (async () => {
  if (!formRef.value) return;

  const success = await formRef.value.validate();
  if (!success) return;

  try {
    orderStore.updateOrderTable()
  } catch (error) {
    notifyError(error)
  }
})
const handleOrderAdded = async () => {

  const response = await orderStore.sendOrder();

  if (response.success) {
    orderStore.resetState()
    notifySuccess(response.message)
    router.push({ name: 'home', });
  } else {
    notifyError(response.message)
  }

}
const handleOrderUpdate = async () => {

  const response = await orderStore.updateOrder();

  if (response.success) {
    orderStore.resetState()
    notifySuccess(response.message)
  } else {
    notifyError(response.message)
  }

}
</script>
