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
          <q-select :disable="orderID != undefined" :rules="[val => !!val || $t('field_is_required')]" dense
            :label="$t('table_number')" option-label="name" option-value="id" outlined v-model="table"
            :options="numberTables" options-dense map-options></q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs text-weight-regular">{{ $t('number_of_diners')
          }}</q-item-label>
          <q-input :disable="orderID != undefined" :rules="[val => !!val || $t('field_is_required')]" dense outlined
            v-model="numberDiners" type="number" :label="$t('number_of_diners')" />
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
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs">{{ $t('observation') }}</q-item-label>
          <q-input v-model="text" :label="$t('observation')" placeholder="Sin cebolla" outlined dense autogrow />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right" class="text-teal">
      <q-btn @click="formAction" :label="$t('add')" type="submit" color="secondary" v-close-popup />
    </q-card-actions>
  </q-form>
</template>
<script setup>
import { useOrdersTableStore } from '@/stores/waiter/orders-table-store';
import { useOrderStore } from "@/stores/waiter/order-store"
import { ref, reactive, onMounted } from "vue"
import { useRoute } from "vue-router";
import { notifyError } from 'src/utils/notify';
import { useQuasar } from 'quasar';
import tableService from '@/services/tableService';
import dishTypeService from '@/services/dishTypeService';
import dishesService from '@/services/dishesService';

const formRef = ref(null);
const table = ref([])
const orderStore = useOrderStore()
const ordersTable = useOrdersTableStore();
const numberDiners = ref(1)
const numberTables = ref([])
const dishes = ref([])
const typesDish = ref([])
const text = ref()
const $q = useQuasar();


const route = useRoute()
const orderID = route.params.id

onMounted(async () => {
  $q.loading.show()
  const dataTable = await tableService.index()
  const dataDishType = await dishTypeService.index()
  const dataDishes = await dishesService.index()

  if (dataTable.success) {
    numberTables.value = dataTable.data.tables
  }

  if (dataDishType.success) {
    typesDish.value = dataDishType.data.dishTypes
  }

  if (dataDishes.success) {
    dishes.value = dataDishes.data.dishes
  }

  $q.loading.hide()

})

const resetOrderedDishes = () => {
  Object.assign(orderedDishes, {
    typeDish: '',
    dishe: '',
    quantity: 1
  });
};

let orderedDishes = reactive({
  typeDish: '',
  dishe: '',
  quantity: 1,
  observations: ''
});


const onUpdateQuantity = ((val) => {
  orderedDishes.quantity = Number(val)
})

const formAction = async () => {
  if (!formRef.value) return;

  const success = await formRef.value.validate();
  if (!success) return;

  try {
    await orderStore.setOrder({
      table: table.value,
      numberDiners: numberDiners.value,
      orderedDishes: { ...orderedDishes },
    });

    await ordersTable.set();

    resetOrderedDishes();

    formRef.value.resetValidation();
  } catch (error) {
    notifyError(error)
  }
};

</script>
