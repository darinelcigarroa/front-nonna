<template>
  <transition appear enter-active-class="animated zoomIn slow" leave-active-class="animated zoomOut slow">

    <q-page class="q-pa-sm">
      <q-toolbar class="q-pa-sm row items-center q-gutter-md" style="flex-wrap: wrap;">
        <!-- Título -->
        <div class="col-auto">
          <span class="text-weight-bold text-h6">Empleados</span>
        </div>

        <q-space /> <!-- Empuja los botones a la derecha -->

        <!-- Botones (bajan automáticamente al colapsar) -->
        <div class="row q-gutter-sm items-center col-auto" style="flex-wrap: wrap;">
          <q-btn color="white" text-color="dark" icon="mdi-filter" :label="$q.screen.gt.xs ? 'Filtros' : ''"
            class="q-mb-xs" />
          <q-btn color="white" text-color="dark" icon="mdi-export-variant" :label="$q.screen.gt.sm ? 'Exportar' : ''"
            class="q-mb-xs" />
          <q-btn @click="employeeCreate = true" color="primary" icon="mdi-plus"
            :label="$q.screen.gt.xs ? 'Agregar empleado' : ''" class="q-mb-xs" />
        </div>
      </q-toolbar>


      <q-card class="full-width">
        <EmployeeTable :key="tableKey"></EmployeeTable>
      </q-card>
      <CreateEmployeeDialog @newEmployee="addNewEmployee" v-model:employeeCreate="employeeCreate">
      </CreateEmployeeDialog>
    </q-page>
  </transition>
</template>

<script setup>
import EmployeeTable from 'src/components/admin/employee/EmployeeTable.vue';
import CreateEmployeeDialog from 'src/components/admin/employee/CreateEmployeeDialog.vue';
import { ref } from 'vue'
const employeeCreate = ref(false)
const tableKey = ref(0)

const addNewEmployee = () => {
  tableKey.value++
}
</script>
<style></style>
