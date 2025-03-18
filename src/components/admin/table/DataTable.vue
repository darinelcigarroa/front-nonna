<template>
    <q-table flat bordered wrap-cells :rows="tableStore.dataTables" :columns="columns" row-key="serial_no"
        :grid="mode == 'grid'" :filter="filter" v-model:pagination="pagination" :hide-header="mode === 'grid'"
        :rows-per-page-options="[5, 10, 20]" card-class="my-custom-grid" @request="onRequest">
        <!-- Filtro -->
        <template v-slot:top-left>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>

        <!-- Opciones de vista -->
        <template v-slot:top-right="props">
            <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen" v-if="mode === 'list'">
                <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>
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

        <!-- Slot para estatus -->
        <template v-slot:body-cell-status="props">
            <q-td :props="props">
                <q-chip class="q-pa-sm text-weight-bold" dense :color="getStatusColor(props.row.status)"
                    :text-color="props.row.status ? 'dark' : 'white'">
                    {{ props.row.status }}
                </q-chip>
            </q-td>
        </template>

        <!-- Acciones -->
        <template v-slot:body-cell-action="props">
            <q-td :props="props">
                <div class="q-gutter-sm">
                    <q-btn @click="tableStore.aditTable(props.row.id)" dense color="blue-9" icon="edit" />
                    <q-btn @click="onDelete(props.row.id)" dense color="red" icon="delete" />
                </div>
            </q-td>
        </template>
    </q-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { useTableStore } from 'src/stores/table/table-store';

const tableStore = useTableStore();

const pagination = ref({
    rowsPerPage: 5,
    page: 1,
    rowsNumber: 0
});

onMounted(async () => {
    await onRequest({
        pagination: {
            page: pagination.value.page,
            rowsPerPage: pagination.value.rowsPerPage
        }
    });
});

const filter = ref("");
const mode = ref("list");

const columns = ref([
    { name: "name", align: "center", label: "Nombre", field: "name", sortable: true },
    { name: "capacity", align: "center", label: "Capacidad", field: "capacity", sortable: true },
    { name: "status", align: "center", label: "Estatus", field: "status", sortable: true },
    { name: "action", align: "center", label: "Action", field: "action", sortable: false }
]);

const onRequest = async (props) => {
    const { page, rowsPerPage } = props.pagination;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;

    const result = await tableStore.getTables(pagination.value);
    pagination.value.rowsNumber = result.total;
};

const onDelete = async (id) => {
    const result = await tableStore.deleteTable(id);
    if (result.success) {
        notifySuccess(result.message);
        await onRequest({
            pagination: {
                page: pagination.value.page,
                rowsPerPage: pagination.value.rowsPerPage
            }
        });
    } else {
        notifyError(result.message);
    }
};

/**
 * Retorna el color del chip según el estatus
 */
const getStatusColor = (status) => {
    return status ? "green" : "secondary";
};
</script>

<style scoped>
.q-table__control {
    display: flex !important;
    justify-content: center;
}

.q-table-container {
    overflow-x: auto;
    max-width: 100%;
}

.my-custom-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
