<template>
  <q-card class="q-pa-md" style="width: 100%">
    <q-card-section>
      <div class="text-h6">Comanda de Pedido</div>
    </q-card-section>

    <q-form @submit="submitOrder">
      <q-card-section>
        <!-- Fila para Fecha y Hora -->
        <div class="row q-gutter-md q-mb-md justify-between">
          <q-input class="col-12 col-sm-5" v-model="order.date" label="Fecha" filled type="date" dense />
          <q-input class="col-12 col-sm-5" v-model="order.time" label="Hora de pedido" filled type="time" dense />
        </div>

        <!-- Fila para Mesa y Comensales -->
        <div class="row q-gutter-md justify-between">
          <q-select class="col-12 col-sm-5" v-model="order.table" label="Número de Mesa" transition-show="jump-up"
            transition-hide="jump-up" filled :options="options" style="min-height: 42px;" />
          <q-input class="col-12 col-sm-5" v-model="order.people" label="Número de Comensales" filled type="number"
            min="1" dense />
        </div>
        <br>
        <!-- Tabla de Pedidos -->

        <!-- Detalles del Pedido -->
        <q-row class="q-gutter-md">
          <q-col cols="12">
            <q-input v-model="order.details" label="Más detalles del Pedido" filled type="textarea" dense />
          </q-col>
        </q-row>
      </q-card-section>

      <!-- Botón Alineado a la Derecha -->
      <q-card-actions align="right" class="q-mt-md">
        <q-btn type="submit" label="Enviar Comanda" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';

const order = ref({
  date: '',
  time: '',
  table: '',
  people: '',
  details: ''
});


const options = ref(["Mesa 1", "Mesa 2", "Mesa 3"]);


</script>
