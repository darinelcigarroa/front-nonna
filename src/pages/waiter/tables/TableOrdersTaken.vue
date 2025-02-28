<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">{{ $t('orders_taken') }}</div>
    </q-card-section>

    <q-separator inset></q-separator>

    <q-card-section>
      <q-table :rows="ordersTable.data" :columns="columns" row-key="name" :dense="$q.screen.lt.md"
        :grid="mode === 'grid'" :hide-header="mode === 'grid'" :separator="separator" class="full-width"
        card-class="q-table__grid" :filter="filter">
        <!-- Barra de herramientas superior -->
        <template v-slot:top-right="props">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <!-- Botón de pantalla completa -->
          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" v-if="mode === 'list'">
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
              {{ props.inFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa" }}
            </q-tooltip>
          </q-btn>

          <!-- Botón para cambiar entre tabla y grid -->
          <q-btn flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal';"
            v-if="!props.inFullscreen">
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
              {{ mode === "grid" ? "Ver Tabla" : "Ver Grid" }}
            </q-tooltip>
          </q-btn>
        </template>

        <!-- Formato de Celdas (solo si está en modo tabla) -->
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>{{ props.row.dishe?.name || "Sin nombre" }}</q-item-label>
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
                <q-item-label>${{ props.row.dishe?.price || 0 }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="props.row.status == 'kitchen' ? 'yellow' : props.row.status == 'cooked' ? 'green' : 'grey'"
              text-color="white" dense class="text-weight-bolder" square>
              {{ props.row.status }}
            </q-chip>
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
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="deleteItem(props.rowIndex)">
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
          <q-card class="q-mb-sm">
            <q-card-section>
              <div class="text-h6">{{ props.row.dishe?.name || "Sin nombre" }}</div>
              <div class="text-caption">Cantidad: {{ props.row.quantity || 0 }}</div>
              <div class="text-caption">Precio: ${{ props.row.dishe?.price || 0 }}</div>
              <q-chip
                :color="props.row.status == 'kitchen' ? 'yellow' : props.row.status == 'cooked' ? 'green' : 'grey'"
                text-color="white" dense class="q-mt-sm">
                {{ props.row.status }}
              </q-chip>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn flat dense round icon="more_vert">
                <q-menu>
                  <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup @click="editItem(props.row)">
                      <q-item-section avatar>
                        <q-icon color="secondary" name="edit" />
                      </q-item-section>
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="deleteItem(props.rowIndex)">
                      <q-item-section avatar>
                        <q-icon color="secondary" name="delete" />
                      </q-item-section>
                      <q-item-section>Eliminar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-card-actions>
          </q-card>
        </template>

      </q-table>
    </q-card-section>

  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useOrdersTableStore } from "@/stores/waiter/orders-table-store";

const ordersTable = useOrdersTableStore();
const filter = ref(""); // Para la búsqueda
const mode = ref("list"); // Alternar entre 'list' (tabla) y 'grid'
const separator = ref("horizontal"); // Define la separación de filas

const columns = [
  { name: "name", label: "Nombre", field: "name", sortable: true, align: "left" },
  { name: "quantity", label: "Cantidad", field: "quantity", sortable: true, align: "left" },
  { name: "price", label: "Precio", field: "price", sortable: true, align: "left" },
  { name: "status", label: "Estado", field: "status", sortable: false, align: "left" },
  { name: "Action", label: "Acción", field: "Action", sortable: false, align: "center" }
];

const editItem = (item) => console.log("editItem", item);
const deleteItem = (index) => console.log(index);
</script>
