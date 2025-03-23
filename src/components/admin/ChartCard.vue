<template>
  <q-card flat bordered class="shadow q-pa-none q-ma-none">
    <q-card-section class="row items-center justify-between">
      <!-- Título -->
      <div :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" class="text-h6">
        {{ title }}
      </div>

      <!-- Botones alineados a la derecha -->
      <div class="row q-gutter-x-sm">
        <q-btn flat dense icon="mdi-download-circle" @click="downloadChart"
          :color="!$q.dark.isActive ? 'primary' : 'white'">
          <q-tooltip>{{ $t('download') }}</q-tooltip>
        </q-btn>
        <slot name="actions"></slot>
      </div>
    </q-card-section>


    <q-separator class="full-width" inset></q-separator>

    <q-card-section>
      <v-chart v-if="isReady" ref="chartRef" autoresize :option="chartOptions" style="height: 400px;" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import VChart from 'vue-echarts';

const props = defineProps({
  title: String,
  chartOptions: Object,
  chartRefName: String
});

const chartRef = ref(null);
const isReady = ref(true);

const downloadChart = () => {
  if (!chartRef.value) return;

  const imageUrl = chartRef.value.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  });

  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `${props.chartRefName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}
</style>
