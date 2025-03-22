<template>
  <transition appear enter-active-class="animated zoomIn slow" leave-active-class="animated zoomOut slow">

    <q-page class="q-pa-sm">
      <q-toolbar class="q-pa-sm row items-center q-gutter-md" style="flex-wrap: wrap;">
        <!-- Título -->
        <div class="col-auto">
          <span class="text-weight-bold text-h6">Ordenes</span>
        </div>

        <q-space /> <!-- Empuja los botones a la derecha -->

        <div class="row q-gutter-sm items-center col-auto" style="flex-wrap: wrap;">
          <!-- Filtros -->
          <q-btn @click="showFilter" color="white" text-color="dark" icon="mdi-filter"
            :label="$q.screen.gt.xs ? 'Filtros' : ''" class="q-mb-xs" />
          <!-- Exportar -->
          <q-btn color="white" text-color="dark" icon="mdi-export-variant" :label="$q.screen.gt.sm ? 'Exportar' : ''"
            class="q-mb-xs" />
        </div>
      </q-toolbar>


      <q-card class="full-width">
        <OrderTable />
      </q-card>

      <FilterDialog v-model="isVisible"></FilterDialog>
    </q-page>
  </transition>
</template>

<script setup>
import OrderTable from 'src/components/admin/Order/OrderTable.vue';
import FilterDialog from 'src/components/admin/Order/FilterDialog.vue';
import { ref } from 'vue';

const isVisible = ref(false)

const showFilter = () => {
  isVisible.value = true
}
</script>
<style></style>
