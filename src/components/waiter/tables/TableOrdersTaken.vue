<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">{{ $t('orders_taken') }}</div>
    </q-card-section>

    <q-separator inset></q-separator>

    <q-card-section>
      <q-table :rows="dataTable" :columns="columns" :dense="$q.screen.lt.md" :grid="mode === 'grid'"
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
                <q-item-label>{{ props.row.dish?.name || 'Sin nombre' }}</q-item-label>
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
                <q-item-label>${{ props.row.dish?.price || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-status_id="props">
          <q-td :props="props">
            <q-chip :color="props.row.status_id == 2 ? 'yellow' : 'grey'" text-color="dark" square>
              {{ status(props.row.status_id) }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn flat dense round icon="more_vert">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="orderStore.editOrderItem(props.row)">
                    <q-item-section avatar>
                      <q-icon color="secondary" name="edit" />
                    </q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="orderStore.deleteOrderItem(props.row)">
                    <q-item-section avatar>
                      <q-icon color="secondary" name="delete" />
                    </q-item-section>
                    <q-item-section>Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>

        <!-- Formato en Modo Grid -->
        <template v-slot:item="props">
          <div>
            <q-card class="q-mb-sm q-mx-xs">
              <q-card-section>
                <div class="text-h6">{{ props.row.dish.name || "Sin nombre" }}</div>
                <div class="text-caption">Cantidad: {{ props.row.quantity || 0 }}</div>
                <div class="text-caption">Precio: ${{ props.row.dish.price || 0 }}</div>
                <q-chip color="grey" text-color="white" dense class="q-mt-sm">
                  {{ status(props.row.status_id) }}
                </q-chip>
              </q-card-section>
              <q-card-actions>
                <q-btn flat dense round icon="more_vert">
                </q-btn>
              </q-card-actions>
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

const dataTable = computed(() =>
  orderStore.orders
    .map((item, index) => ({ ...item, originalIndex: index })) // Agregar el índice original
    .filter((item) => item.status_id == 1 || item.status_id == 2)
);

const columns = [
  { name: "name", label: "Nombre", field: "name", sortable: true, align: "left" },
  { name: "quantity", label: "Cantidad", field: "quantity", sortable: true, align: "left" },
  { name: "price", label: "Precio", field: "price", sortable: true, align: "left" },
  { name: "status_id", label: "Estado", field: "status_id", sortable: false, align: "left" },
  { name: "Action", label: "Acción", field: "Action", sortable: false, align: "center" }
];

const status = (status_id) => {
  return statuses[status_id] || 'Desconocido'
}

</script>
