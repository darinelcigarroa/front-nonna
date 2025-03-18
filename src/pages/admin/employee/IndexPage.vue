<template>
  <transition appear enter-active-class="animated zoomIn slow" leave-active-class="animated zoomOut slow">

    <q-page class="q-pa-sm">
      <q-toolbar class="q-pa-sm row items-center q-gutter-md" style="flex-wrap: wrap;">
        <!-- Título -->
        <div class="col-auto">
          <span class="text-weight-bold text-h6">Empleados</span>
        </div>

        <q-space /> <!-- Empuja los botones a la derecha -->

        <div class="row q-gutter-sm items-center col-auto" style="flex-wrap: wrap;">
          <!-- Filtros -->
          <q-btn color="white" text-color="dark" icon="mdi-filter" :label="$q.screen.gt.xs ? 'Filtros' : ''"
            class="q-mb-xs" />
          <!-- Exportar -->
          <q-btn color="white" text-color="dark" icon="mdi-export-variant" :label="$q.screen.gt.sm ? 'Exportar' : ''"
            class="q-mb-xs" />
          <!-- Agrgar empleado -->
          <q-btn @click="employeeStore.createModal = true" color="primary" icon="mdi-plus"
            :label="$q.screen.gt.xs ? 'Agregar empleado' : ''" class="q-mb-xs" />
        </div>
      </q-toolbar>


      <q-card class="full-width">
        <EmployeeTable />
      </q-card>
      <CreateEmployeeDialog />
      <EditEmployeeDialog />
    </q-page>
  </transition>
</template>

<script setup>
import EmployeeTable from 'src/components/admin/employee/EmployeeTable.vue';
import CreateEmployeeDialog from 'src/components/admin/employee/CreateEmployeeDialog.vue';
import EditEmployeeDialog from 'src/components/admin/employee/EditEmployeeDialog.vue';
import { useEmployeeStore } from 'src/stores/employee/employee-store';

const employeeStore = useEmployeeStore()
</script>
<style></style>
