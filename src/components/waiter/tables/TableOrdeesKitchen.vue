<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">{{ $t('orders_taken') }}</div>
    </q-card-section>

    <q-separator inset></q-separator>

    <q-card-section>
      <q-table :rows="dataTable" :columns="columns" row-key="name" :dense="$q.screen.lt.md" :grid="mode === 'grid'"
        :hide-header="mode === 'grid'" :separator="separator" class="full-width" card-class="q-table__grid"
        :filter="filter">
        <!-- Barra de herramientas superior -->
        <template v-slot:top-right="props">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" v-show="mode === 'list'">
            <q-tooltip v-if="!$q.platform.is.mobile" v-close-popup>
              {{ props.inFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa" }}
            </q-tooltip>
          </q-btn>

          <q-btn flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal';"
            v-show="!props.inFullscreen">
            <q-tooltip v-if="!$q.platform.is.mobile" v-close-popup>
              {{ mode === "grid" ? "Ver Tabla" : "Ver Grid" }}
            </q-tooltip>
          </q-btn>

        </template>

        <!-- Formato de Celdas (solo si está en modo tabla) -->
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>{{ props.row.dish.name || "Sin nombre" }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>{{ props.row.quantity || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>${{ props.row.dish.price || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-status_id="props">
          <q-td :props="props">
            <q-chip
              :color="props.row.status_id == 2 ? 'blue' : props.row.status_id == 3 ? 'green' : props.row.status_id == 4 ? 'red' : 'primary'"
              text-color="white" dense class="text-weight-bolder" square>
              {{ status(props.row.status_id) }}
            </q-chip>
          </q-td>
        </template>
        <!-- Formato en Modo Grid -->
        <template v-slot:item="props">
          <div>
            <q-card class="q-mb-sm">
              <q-card-section>
                <div class="text-h6">{{ props.row.dish_name || "Sin nombre" }}</div>
                <div class="text-caption">Cantidad: {{ props.row.quantity || 0 }}</div>
                <div class="text-caption">Precio: ${{ props.row.dish.price || 0 }}</div>
                <q-chip
                  :color="props.row.status_id == 2 ? 'blue' : props.row.status_id == 3 ? 'green' : props.row.status_id == 4 ? 'red' : 'primary'"
                  text-color="white" dense class="q-mt-sm">
                  {{ status(props.row.status_id) }}
                </q-chip>
              </q-card-section>
            </q-card>
          </div>
        </template>

      </q-table>
    </q-card-section>

  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useOrderStore } from "src/stores/waiter/order-store";

const filter = ref("")
const mode = ref("list")
const separator = ref("horizontal")
const orderStore = useOrderStore()

const statuses = {
  1: 'Creado',
  2: 'En cocina',
  3: 'En Preparación',
  4: 'Listo para Servir',
  5: 'Cancelado'
}

const dataTable = computed(() => orderStore.orders.filter((item) => item.status_id !== 1 && item.status_id !== 2))

const columns = [
  { name: "name", label: "Nombre", field: "name", sortable: true, align: "left" },
  { name: "quantity", label: "Cantidad", field: "quantity", sortable: true, align: "left" },
  { name: "price", label: "Precio", field: "price", sortable: true, align: "left" },
  { name: "status_id", label: "Estado", field: "status_id", sortable: false, align: "left" },
];

const status = (status_id) => {
  return statuses[status_id] || 'Desconocido'
}

</script>
