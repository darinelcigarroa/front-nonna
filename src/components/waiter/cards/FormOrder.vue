<template>
  <q-form class="q-gutter-md q-pa-md" ref="formRef">
    <div class="row q-col-gutter-md">
      <!-- Información Básica -->
      <div class="col-12">
        <div class="text-h6 text-weight-regular q-pb-xs">
          {{ $t('basic_information') }}
        </div>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12">
        <label class="q-pb-xs">{{ $t('table_number') }}</label>
        <q-select :rules="[val => !!val || $t('field_is_required')]" dense option-label="name" option-value="id"
          :disable="isEditingOrder" outlined v-model="orderStore.currentOrder.table" :options="filteredTables"
          :label="$t('table_number')" map-options options-dense @filter="filterTables" behavior="menu" use-input
          fill-input hide-selected />
      </div>

      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12">
        <label class="q-pb-xs">{{ $t('number_of_diners') }}</label>
        <q-input :disable="isEditingOrder" :rules="[val => !!val || $t('field_is_required')]" dense outlined
          v-model="orderStore.currentOrder.numberDiners" type="number" :label="$t('number_of_diners')" />
      </div>
      <!-- Separador -->
      <div class="col-12">
        <q-separator />
      </div>

      <!-- Tipo de Platillo -->
      <div class="col-12">
        <label class="q-pb-xs">{{ $t('type_of_dish') }}</label>
        <q-select :rules="[val => !!val || $t('field_is_required')]" dense :label="$t('type_of_dish')"
          option-label="name" option-value="id" outlined v-model="orderStore.currentOrder.typeDish"
          :options="dishTypeStore.dishType" options-dense map-options />
      </div>

      <!-- Platillo y Cantidad -->
      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12">
        <label class="q-pb-xs">{{ $t('dish') }}</label>
        <q-select :disable="orderStore.currentOrder.typeDish == null" :rules="[val => !!val || $t('field_is_required')]"
          dense option-label="name" option-value="id" outlined v-model="orderStore.currentOrder.dish"
          :options="filteredDishes" :label="$t('dish')" map-options options-dense @filter="filterDishes"
          :loading="loadingDishes" behavior="menu" use-input fill-input hide-selected />
      </div>

      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12">
        <label class="q-pb-xs">{{ $t('quantity') }}</label>
        <q-input :rules="[val => !!val || $t('field_is_required')]" dense outlined min="1"
          v-model="orderStore.currentOrder.quantity" type="number" :label="$t('quantity')"
          @update:model-value="onUpdateQuantity" />
      </div>

      <!-- Observaciones -->
      <div class="col-12">
        <q-checkbox v-model="activeObservations" label="Observaciones" color="primary" keep-color />
        <br>

        <div v-if="activeObservations">
          <!-- <label class="q-pb-xs">{{ $t('observation') }}</label> -->
          <q-virtual-scroll style="max-height: 200px" :items="Array.from({ length: orderStore.currentOrder.quantity })"
            virtual-scroll-item-size="50" separator>
            <template v-slot="{ index }">
              <div :key="index" class="q-my-sm">
                <q-input v-model="orderStore.currentOrder.observations[index]" :label="`${$t('dish')} ${index + 1}`"
                  dense outlined placeholder="Sin cebolla" autogrow />
              </div>
            </template>
          </q-virtual-scroll>

        </div>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex text-teal justify-between">
      <q-btn dense @click="handleOrderClick" :label="isEditingOrder ? $t('update') : $t('finish')" icon="mdi-check"
        color="accent" v-close-popup />
      <div>
        <q-btn class="q-mx-xs" dense @click="orderStore.resetCurrentOrder" :label="$t('clear')" color="accent"
          v-close-popup />

        <q-btn dense v-if="orderStore.currentOrder.edit" @click="updateOrderTable" :label="$t('update')"
          color="secondary" v-close-popup />

        <q-btn v-else dense :label="$t('add')" @click="onSubmit" color="secondary" v-close-popup />
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { useOrderStore } from "@/stores/waiter/order-store"
import { ref, onMounted, watch, computed } from "vue"
import { notifyError, notifySuccess, notifyWarning } from 'src/utils/notify';
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
const activeObservations = ref(false)

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

watch(() => orderStore.currentOrder.quantity, async (newVal, oldVal) => {
  console.log('Cantidad:', newVal, oldVal);

  if (!newVal) return;

  if (oldVal > newVal) {
    // 🔥 Si se reduce la cantidad, eliminamos las observaciones sobrantes
    orderStore.currentOrder.observations.splice(newVal);
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
  try {
    if (!formRef.value) {
      notifyWarning('Formulario no disponible')
    }

    const success = await formRef.value.validate()

    if (!success) {
      notifyWarning('Por favor, completa todos los campos correctamente.')
      return
    }

    await orderStore.setOrder()
    formRef.value.resetValidation()

    notifySuccess('', { timeout: 100 })
  } catch (error) {
    notifyError(error?.message || 'Ocurrió un error inesperado')
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

  if (orderStore.activeOrders.length === 0) {
    notifyWarning('No tienes platillos válidos')
    return
  }

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

  if (orderStore.activeOrders.length === 0) {
    notifyWarning('No tienes platillos válidos')
    return
  }

  const response = await orderStore.updateOrder();

  if (response.success) {
    orderStore.resetState()
    notifySuccess(response.message)
  } else {
    notifyError(response.message)
  }

}
// const applyObservationToAll = ref(false);


// const applyToAll = () => {
//   if (applyObservationToAll.value) {
//     const firstObservation = editableOrders.value[0]?.observations || '';
//     editableOrders.value.forEach((order) => {
//       order.observations = firstObservation;
//     });
//   }
// };

</script>
