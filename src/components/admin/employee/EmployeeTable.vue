<template>
    <q-table flat bordered wrap-cells :rows="employeeStore.dataEmployees" :columns="columns" :grid="mode == 'grid'"
        :filter="filter" v-model:pagination="pagination" :hide-header="mode === 'grid'"
        :rows-per-page-options="[5, 10, 20]" card-class="my-custom-grid" @request="onRequest">
        <template v-slot:top-left>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>

        </template>
        <template v-slot:top-right="props">

            <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen" v-if="mode === 'list'">
                <q-tooltip :disable="$q.platform.is.mobile">{{ props.inFullscreen ? 'Exit Fullscreen' :
                    'Toggle Fullscreen' }}
                </q-tooltip>
            </q-btn>

            <q-btn flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
                @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
                v-if="!props.inFullscreen">
                <q-tooltip :disable="$q.platform.is.mobile">{{ mode === 'grid' ? 'List' : 'Grid' }}
                </q-tooltip>
            </q-btn>


        </template>

        <template v-slot:body-cell-action="props">
            <q-td :props="props">
                <div class="q-gutter-sm">
                    <q-btn @click="employeeStore.aditEmployee(props.row.id)" dense color="blue-9" icon="edit" />
                    <q-btn @click="onDelete(props.row.id)" dense color="red" icon="delete" />
                </div>
            </q-td>
        </template>
    </q-table>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useEmployeeStore } from 'src/stores/employee/employee-store';
import { notifyError, notifySuccess } from 'src/utils/notify';

const employeeStore = useEmployeeStore()

const pagination = ref({
    rowsPerPage: 5,
    page: 1,
    rowsNumber: 0,
    filter: null
})

onMounted(async () => {
    await onRequest({
        pagination: {
            page: pagination.value.page,
            rowsPerPage: pagination.value.rowsPerPage,
            filter: null
        }
    })
})

const filter = ref("")
const mode = ref("list")
const columns = ref([
    {
        name: "name",
        align: "left",
        label: "Nombre",
        field: "name",
        sortable: true
    },
    {
        name: "first_surname",
        align: "left",
        label: "Primer apellido",
        field: "first_surname",
        sortable: true
    },
    {
        name: "second_surname",
        required: true,
        label: "Segundo apellido",
        align: "left",
        field: "second_surname",
        sortable: true
    },
    {
        name: "position",
        align: "left",
        label: "Posición",
        field: row => row.position ? row.position.name : 'Sin posición',
        sortable: true
    },
    {
        name: "salary",
        align: "left",
        label: "Salario",
        field: "salary",
        sortable: true
    },
    {
        name: "action",
        align: "left",
        label: "Action",
        field: "action",
        sortable: true
    }
])
const onRequest = async (props) => {
    const { page, rowsPerPage } = props.pagination

    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.filter = filter.value

    const result = await employeeStore.getEmployee(pagination.value)
    pagination.value.rowsNumber = result.total
}
const onDelete = async (id) => {
    const result = await employeeStore.deleteEmployee(id)
    if (result.success) {
        notifySuccess(result.message)
        await onRequest({
            pagination: {
                page: pagination.value.page,
                rowsPerPage: pagination.value.rowsPerPage,
            }
        })
    } else {
        notifyError(result.message)
    }
}

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

.q-chip__content {
    display: block;
    text-align: center;
}
</style>