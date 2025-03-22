<template>
    <q-table flat bordered wrap-cells :rows="dishStore.dataDishes" :columns="columns" row-key="id"
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
            <q-btn @click="dishStore.createModal = true" class="q-mx-sm" dense size="sm" round color="primary"
                icon="mdi-plus" />

            <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen" v-if="mode === 'list'">
                <q-tooltip :disable="$q.platform.is.mobile">
                    {{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                </q-tooltip>
            </q-btn>

            <q-btn flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
                @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
                v-if="!props.inFullscreen">
                <q-tooltip :disable="$q.platform.is.mobile">
                    {{ mode === 'grid' ? 'List' : 'Grid' }}
                </q-tooltip>
            </q-btn>
        </template>

        <!-- Slot para estatus -->
        <template v-slot:body-cell-status="props">
            <q-td :props="props">
                <q-chip class="q-pa-sm text-weight-bold" dense :color="getStatusColor(props.row.status)"
                    text-color="white">
                    {{ props.row.status }}
                </q-chip>
            </q-td>
        </template>

        <!-- Acciones -->
        <template v-slot:body-cell-action="props">
            <q-td :props="props">
                <q-btn dense flat round icon="more_vert">
                    <q-menu>
                        <q-list dense>
                            <q-item clickable v-close-popup @click="dishStore.aditDish(props.row.id)">
                                <q-item-section class="q-py-xs" avatar>
                                    <q-btn dense color="blue-9" icon="edit" />
                                </q-item-section>
                                <q-item-section>Editar</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="onDelete(props.row.id)">
                                <q-item-section class="q-py-xs" avatar>
                                    <q-btn dense color="red" icon="delete" />
                                </q-item-section>
                                <q-item-section>Eliminar</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-td>
        </template>
    </q-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { useDishStore } from 'src/stores/catalogs/dish-store';

const dishStore = useDishStore();

const pagination = ref({
    rowsPerPage: 3,
    page: 1,
    rowsNumber: 0,
    filter: null
});

onMounted(async () => {
    await onRequest({
        pagination: {
            page: pagination.value.page,
            rowsPerPage: pagination.value.rowsPerPage,
            filter: null
        }
    });
});

const filter = ref("");
const mode = ref("list");

const columns = ref([
    { name: "name", align: "center", label: "Nombre", field: "name", sortable: true },
    {
        name: "description",
        align: "center",
        label: "Descripción",
        field: row => row.description ? row.description.substring(0, 12) + (row.description.length > 20 ? '...' : '') : '',
        sortable: true
    },
    { name: "dish_type_id", align: "center", label: "Tipo de platillo", field: row => row.dish_type ? row.dish_type.name : 'Sin tipo de platillo', sortable: true },
    { name: "status", align: "center", label: "Estatus", field: "status", sortable: true },
    { name: "action", align: "center", label: "Action", field: "action", sortable: false }
]);

const onRequest = async (props) => {
    const { page, rowsPerPage } = props.pagination;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.filter = filter.value;

    const result = await dishStore.getDishes(pagination.value);
    pagination.value.rowsNumber = result.total;
};

const onDelete = async (id) => {
    const result = await dishStore.deleteDish(id);
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
    return status ? "green-8" : "secondary";
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
