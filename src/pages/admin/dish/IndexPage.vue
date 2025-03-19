<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat bordered class="">
      <q-card-section class="row">
        <span class="text-weight-bold text-h6">Platillos</span>
      </q-card-section>

      <q-separator inset></q-separator>

      <q-card-section>
        <DishTable />
      </q-card-section>
    </q-card>
  </div>
  <CreateDishDialog />
  <EditDishDialog />
</template>

<script setup>
// import { useTableStore } from 'src/stores/table/table-store';
import CreateDishDialog from 'src/components/admin/dish/CreateDishDialog.vue';
import DishTable from 'src/components/admin/dish/DishTable.vue';
import EditDishDialog from 'src/components/admin/dish/EditDishDialog.vue';

// const storeTable = useTableStore()
</script>