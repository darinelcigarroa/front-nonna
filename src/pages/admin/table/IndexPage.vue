<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat bordered>
      <q-card-section class="row">
        <span class="text-weight-bold text-h6">Mesas</span>
      </q-card-section>

      <q-separator inset></q-separator>

      <q-card-section>
        <DataTable />
      </q-card-section>
    </q-card>
  </div>
  <CreateTableDialog />
  <EditTableDialog />
</template>

<script setup>
// import { useTableStore } from 'src/stores/table/table-store';
import DataTable from 'src/components/admin/table/DataTable.vue';
import CreateTableDialog from 'src/components/admin/table/CreateTableDialog.vue';
import EditTableDialog from 'src/components/admin/table/EditTableDialog.vue';

// const storeTable = useTableStore()
</script>