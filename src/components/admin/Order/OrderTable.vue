<template>
    <q-table flat bordered wrap-cells :rows="orderStore.orders" :columns="columns" :grid="mode == 'grid'"
        :filter="orderStore.search" v-model:pagination="orderStore.pagination" :hide-header="mode === 'grid'"
        :rows-per-page-options="[5, 10, 20]" card-class="my-custom-grid" @request="onRequest">

        <template v-slot:top-left>
            <q-input outlined dense debounce="300" :model-value="orderStore.search" @update:model-value="onSearchUpdate"
                placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>

        <template v-slot:top-right="props">
            <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen" v-if="mode === 'list'">
                <q-tooltip :disable="$q.platform.is.mobile">
                    {{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                </q-tooltip>

            </q-btn>

            <q-btn flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
                @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
                v-if="!props.inFullscreen">
                <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
                    {{ mode === 'grid' ? 'List' : 'Grid' }}
                </q-tooltip>
            </q-btn>
        </template>

        <!-- Slot para la columna de estatus -->
        <template v-slot:body-cell-order_status="props">
            <q-td :props="props">
                <q-chip class="q-pa-sm" dense :color="getStatusColor(props.row.order_status.name)" text-color="white">
                    {{ props.row.order_status.name ?? 'Sin estatus' }}
                </q-chip>
            </q-td>
        </template>

    </q-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrderStore } from 'src/stores/admin/order-store';

const orderStore = useOrderStore()

onMounted(() => {
    onRequest({ pagination: orderStore.pagination })
})

const mode = ref("list")
const columns = ref([
    {
        name: "folio",
        align: "center",
        label: "Folio",
        field: "folio",
        sortable: true
    },
    {
        name: "table",
        align: "center",
        label: "Mesa",
        field: row => row.table.name ?? 'No hay mesa',
        sortable: true
    },
    {
        name: "formatted_date",
        required: true,
        label: "Fecha",
        align: "center",
        field: "formatted_date",
        sortable: true
    },
    {
        name: "order_status",
        align: "center",
        label: "Estatus",
        field: row => row.order_status.name ?? 'Sin estatus',
        sortable: true
    },
    {
        name: "total_amount",
        align: "center",
        label: "Monto",
        field: row => `+ ${row.total_amount}`,
        sortable: true
    }
])

const onSearchUpdate = (val) => {
    orderStore.search = val;
    orderStore.pagination.page = 1;
};

const onRequest = (props) => {
    const { page, rowsPerPage } = props.pagination

    orderStore.pagination.page = page;
    orderStore.pagination.rowsPerPage = rowsPerPage;

    orderStore.index();
};

// Función para asignar colores a los estatus
const getStatusColor = (status) => {
    const colors = {
        "pagado": "teal",
        "cancelado": "red",
    }
    return colors[status] || "grey";
}
</script>
