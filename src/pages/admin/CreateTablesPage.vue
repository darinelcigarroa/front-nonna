<template>
  <q-page class="q-pa-sm">
    <q-card class="full-width">
      <q-table flat bordered wrap-cells :title="$t('tables')" :rows="data" :columns="columns" row-key="serial_no"
        :grid="mode == 'grid'" :filter="filter" v-model:pagination="pagination" :hide-header="mode === 'grid'"
        :rows-per-page-options="[5, 10, 20]" card-class="my-custom-grid">
        <template v-slot:top-right="props">
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" v-if="mode === 'list'">
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{ props.inFullscreen ? 'Exit Fullscreen' :
              'Toggle Fullscreen' }}
            </q-tooltip>
          </q-btn>

          <q-btn flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen">
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{ mode === 'grid' ? 'List' : 'Grid' }}
            </q-tooltip>
          </q-btn>

          <q-btn color="primary" icon-right="archive" label="Export to csv" no-caps @click="exportTable" />
        </template>
        <template v-slot:body-cell-stage="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.stage == 'Draft') ? 'green' : (props.row.stage == 'Cheques' ? 'orange' : 'secondary')"
              text-color="white" dense class="text-weight-bolder" square style="width: 85px"> {{ props.row?.stage ||
                'N/A' }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="blue-9" icon="edit" />
              <q-btn dense color="red" icon="delete" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { exportFile } from "quasar";

onMounted(() => {
  console.log(data.value)
  console.log(columns)
})
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}
const filter = ref("")
const mode = ref("list")
const columns = ref([
  {
    name: "serial_no",
    align: "left",
    label: "Serial No.",
    field: "serial_no",
    sortable: true
  },
  {
    name: "account",
    align: "left",
    label: "Account",
    field: "account",
    sortable: true
  },
  {
    name: "subject_name",
    required: true,
    label: "Subject Name",
    align: "left",
    field: "subject_name",
    sortable: true
  },
  {
    name: "amount",
    align: "left",
    label: "Amount",
    field: "amount",
    sortable: true
  },
  {
    name: "entry_date",
    align: "left",
    label: "Entry Date",
    field: "entry_date",
    sortable: true
  },
  {
    name: "expired_date",
    align: "left",
    label: "Expired Date",
    field: "expired_date",
    sortable: true
  },
  {
    name: "stage",
    align: "left",
    label: "Stage",
    field: "stage",
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

const data = ref([
  {
    serial_no: "01",
    subject_name: "Design",
    account: "Leslie Tecklenburg",
    amount: "$ 4200",
    entry_date: "05/01/2020",
    expired_date: "05/02/2020",
    stage: "Draft",
  },
  {
    serial_no: "02",
    subject_name: "Networking",
    account: "Lia Whitledge",
    amount: "$ 2550",
    entry_date: "15/12/2019",
    expired_date: "15/04/2020",
    stage: "Cheques",
  },
  {
    serial_no: "03",
    subject_name: "Networking",
    account: "Sam Wileman",
    amount: "$ 3800",
    entry_date: "12/11/2019",
    expired_date: "15/04/2020",
    stage: "Draft",
  },
  {
    serial_no: "06",
    subject_name: "Technology",
    account: "John Rozelle",
    amount: "$ 3200",
    entry_date: "10/11/2019",
    expired_date: "12/03/2020",
    stage: "Transfer",
  },
  {
    serial_no: "04",
    subject_name: "Technology",
    account: "Edgar Colmer",
    amount: "$ 4000",
    entry_date: "11/09/2019",
    expired_date: "25/01/2020",
    stage: "Cheques",
  },
  {
    serial_no: "05",
    subject_name: "Networking",
    account: "Kaiden Rozelle",
    amount: "$ 1200",
    entry_date: "10/11/2019",
    expired_date: "15/03/2020",
    stage: "Transfer",
  },
  {
    serial_no: "07",
    subject_name: "Technology",
    account: "Jacob Firtado",
    amount: "$ 2200",
    entry_date: "09/10/2019",
    expired_date: "23/03/2020",
    stage: "Draft",
  },
  {
    serial_no: "05",
    subject_name: "Design",
    account: "John Doe",
    amount: "$ 900",
    entry_date: "12/11/2019",
    expired_date: "06/03/2020",
    stage: "Transfer",
  }
])
const pagination = ref({
  rowsPerPage: 10, // Predeterminado en 10
  page: 1, // Asegurar que siempre inicie en la página 1
  rowsNumber: 0 // Se llenará dinámicamente
});
const exportTable = (() => {
  const content = [columns.value.map(col => wrapCsvValue(col.label))]
    .concat(
      data.value.map(row =>
        columns.value
          .map(col =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile("quotes.csv", content, "text/csv");

  if (status !== true) {
    this.$q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning"
    });
  }
})
</script>
<style>
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
