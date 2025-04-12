<template>
  <LoadingComponent :loading="isLoading" />
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
          <q-btn @click="showFilterDialog" color="white" text-color="dark" icon="mdi-filter"
            :label="$q.screen.gt.xs ? 'Filtros' : ''" class="q-mb-xs" />
          <!-- Exportar -->
          <q-btn color="white" @click="exportDialog" text-color="dark" icon="mdi-export-variant"
            :label="$q.screen.gt.sm ? 'Exportar' : ''" class="q-mb-xs" />
          <!-- Agrgar empleado -->
          <q-btn @click="employeeStore.createModal = true" color="primary" icon="mdi-plus"
            :label="$q.screen.gt.xs ? 'Agregar empleado' : ''" class="q-mb-xs" />
        </div>
      </q-toolbar>


      <q-card class="full-width">
        <!-- <EmployeeTable /> -->
        <EmployeeTable @update:loading="isLoading = $event" />
      </q-card>
      <CreateEmployeeDialog @update:loading="isLoading = $event" />
      <EditEmployeeDialog @update:loading="isLoading = $event" />
      <FilterDialog v-model="isVisible" />
      <ExportDialog v-model="showExportDialog" />

    </q-page>
  </transition>
</template>

<script setup>
import EmployeeTable from 'src/components/admin/employee/EmployeeTable.vue';
import CreateEmployeeDialog from 'src/components/admin/employee/CreateEmployeeDialog.vue';
import EditEmployeeDialog from 'src/components/admin/employee/EditEmployeeDialog.vue';
import FilterDialog from 'src/components/admin/employee/FilterDialog.vue';
import ExportDialog from 'src/components/admin/employee/ExportsExcel/ExportDialog.vue';
import LoadingComponent from '@/components/utils/LoadingComponent.vue';

import { useEmployeeStore } from 'src/stores/employee/employee-store';
import { ref } from 'vue';

const showExportDialog = ref(false)
const employeeStore = useEmployeeStore()
const isVisible = ref(false)
const isLoading = ref(false)

const showFilterDialog = () => {
  isVisible.value = true
}

const exportDialog = () => {
  showExportDialog.value = true
}
</script>
<style></style>
