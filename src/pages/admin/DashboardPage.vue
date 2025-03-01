<template>
  <q-page class="q-pt-xs q-ma-md">

    <div class="row q-my-md shadow" style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_1">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">900</q-item-label>
              <q-item-label :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" style="letter-spacing: 1px;">Total
                sales</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="mdi-currency-usd" class="box_1" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-1" style="width:70%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_2" style="border-left: 1px solid #efefef;"
        v-bind:class="{ 'border-top': $q.platform.is.mobile }">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">1050</q-item-label>
              <q-item-label :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" style="letter-spacing: 1px;">total
                dishes</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="mdi-food-turkey" class="box_2" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-2" style="width:40%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3" style="border-left: 1px solid #efefef;"
        v-bind:class="{ 'border-top': $q.platform.is.mobile }">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">80 %</q-item-label>
              <q-item-label :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" style="letter-spacing: 1px;">Total
                employees</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="mdi-account-group" class="box_3" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-3" style="width:80%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_4" style="border-left: 1px solid #efefef;"
        v-bind:class="{ 'border-top': $q.platform.is.mobile }">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">720</q-item-label>
              <q-item-label :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" style="letter-spacing: 1px;">New
                Customers</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="mdi-silverware-fork-knife" class="box_4" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-4" style="width:30%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" class="text-h6 col-12">Sales vs Goals
              <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('sales_goals')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>
          <q-card-section>
            <v-chart v-if="isReady" ref="chartRef" :option="TableOptions" style="height: 400px;" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" class="text-h6 col-12">Market Share &
              Growth
              <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('market_share')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>

            <v-chart v-if="isReady" ref="chartRef" :option="areaChartOption" style="height: 400px;" />

          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-md q-pt-md">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="shadow q-pa-none q-ma-none">
          <q-card-section>
            <div :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" class="text-h6">Sales Pipeline by Sales Rep
              <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('sales_pipeline')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <v-chart v-if="isReady" ref="chartRef" :option="chartOptions" style="height: 400px;" />
            <!-- <IEcharts ref="sales_pipeline" :option="stackedBarOptions" :resizable="true" style="height:270px" /> -->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card flat bordered class="shadow q-pa-none q-ma-none">
          <q-card-section>
            <div :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'" class="text-h6">Sales Pipeline by Sales Rep
              <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('sales_pipeline')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <v-chart v-if="isReady" ref="chartRef" :option="foodOptions" style="height: 400px;" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { useQuasar } from 'quasar';

const $q = useQuasar();

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, LineChart]);

const isReady = ref(false);
const chartRef = ref(null);

const mesas = ref([
  { mesa: "Mesa 1", uso: 50 },
  { mesa: "Mesa 2", uso: 120 },
  { mesa: "Mesa 3", uso: 90 },
  { mesa: "Mesa 4", uso: 30 },
  { mesa: "Mesa 5", uso: 80 }
]);
const generarIngresos = () => {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * (1500 - 200) + 200));
};

// Datos simulados de ingresos
const ingresosActual = ref(generarIngresos());
const ingresosPasado = ref(generarIngresos());

// Función para actualizar los ingresos cada vez que se actualice el gráfico
const actualizarIngresos = () => {
  ingresosActual.value = generarIngresos();
  ingresosPasado.value = generarIngresos();
};
// Ordenamos las mesas de mayor a menor uso
const sortedMesas = mesas.value.sort((a, b) => b.uso - a.uso);
// Configuración del gráfico de área
const areaChartOption = computed(() => ({
  legend: {
    textStyle: {
      color: $q.dark.isActive ? 'white' : '#676767'
    }
  },
  grid: {
    bottom: '9%',
    left: '9%',
    top: '10%',
    right: '5%',
    show: true
  },
  tooltip: { show: true },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: $q.dark.isActive ? 'white' : '#676767'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: $q.dark.isActive ? 'white' : '#676767'
    }
  },
  series: [
    {
      name: 'Ingresos Mes Actual',
      data: ingresosActual.value,
      type: 'line',
      areaStyle: {},
      smooth: true,
      color: '#e4a3e2'
    },
    {
      name: 'Ingresos Mes Pasado',
      data: ingresosPasado.value,
      type: 'line',
      areaStyle: {},
      smooth: true,
      color: '#25c0ea'
    }
  ]
}));
const TableOptions = ref({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: sortedMesas.map(m => m.mesa), // Nombres de las mesas
    axisLabel: { color: '#676767' }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#676767' }
  },
  series: [{
    name: 'Veces usada',
    type: 'bar',
    data: sortedMesas.map(m => m.uso), // Número de veces usada
    color: '#3bb2b8'
  }]
});

// Datos de los meseros
const chartOptions = ref(
  {
    tooltip: {
      trigger: 'axis',
      axisPointer:
      {
        type: 'shadow'
      },
      backgroundColor: 'rgba(50,50,50,0.9)',

    },
    legend: {
      textStyle: {
        color: $q.dark.isActive ? 'white' : '#676767'
      }
    },
    color: ['#cc9dd1', '#9cebaf', '#41eff7'],
    grid:
    {
      bottom: '3%',
      left: '15%',
      top: '18%',
      right: '5%',
      show: true
    },
    calculable: true,
    xAxis:
    {
      type: 'value',
      position: 'top',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (value,) {
          return '$' + value;
        },
        color: $q.dark.isActive ? 'white' : '#676767'
      }
    },
    yAxis: [
      {
        type: 'category',
        data: ['Alex Morrow', 'Joanna Carter', 'Jimmy Joanna', 'Mack Hales'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: 12,
          color: $q.dark.isActive ? 'white' : '#676767'
        }
      }
    ],
    series: [{
      name: 'Ventas',
      type: 'bar',
      data: [500, 650, 850, 700], // 🔥 Un solo conjunto de datos
      barWidth: 30, // 🔥 Tamaño de barra ajustado
    }]
  }
);
const foodOptions = ref(
  {
    tooltip: {
      trigger: 'axis',
      axisPointer:
      {
        type: 'shadow'
      },
      backgroundColor: 'rgba(50,50,50,0.9)',

    },
    legend: {
      textStyle: {
        color: $q.dark.isActive ? 'white' : '#676767'
      }
    },
    color: ['#cc9dd1', '#9cebaf', '#41eff7'],
    grid:
    {
      bottom: '3%',
      left: '15%',
      top: '18%',
      right: '5%',
      show: true
    },
    calculable: true,
    xAxis:
    {
      type: 'value',
      position: 'top',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (value,) {
          return '$' + value;
        },
        color: $q.dark.isActive ? 'white' : '#676767'
      }
    },
    yAxis: [
      {
        type: 'category',
        data: ['Alex Morrow', 'Joanna Carter', 'Jimmy Joanna', 'Mack Hales'],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: 12,
          color: $q.dark.isActive ? 'white' : '#676767'
        }
      }
    ],
    series:
      [{
        name: 'Qualification',
        type: 'bar',
        stack: 'A',
        data: [300, 350, 400, 500]

      }, {
        name: 'Discovery',
        type: 'bar',
        stack: 'A',
        data: [100, 180, 250, 300]

      }, {
        name: 'Quote',
        type: 'bar',
        stack: 'A',
        data: [100, 120, 200, 220]

      }]
  }
);
// Renderiza el gráfico cuando el DOM esté listo
onMounted(() => {
  actualizarIngresos();
  nextTick(() => {
    isReady.value = true;
  });
});

// Función para descargar la imagen del gráfico
// const saveImage = () => {
//   if (!chartRef.value) return;
//   const linkSource = chartRef.value.getDataURL();
//   const downloadLink = document.createElement('a');
//   document.body.appendChild(downloadLink);
//   downloadLink.href = linkSource;
//   downloadLink.download = 'meseros_grafico.png';
//   downloadLink.click();
// };
</script>

<style scoped>
.box_1 {
  color: #15ca20;
}

.box_2 {
  color: #fe434f;
}

.box_3 {
  color: #0dceec;
}

.box_4 {
  color: #ff9700;
}

.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}

.progress-base {
  height: 8px;
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar-1 {
  height: 8px;
  border-radius: 3px;
  background: #17ead9;
  background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
  background: linear-gradient(45deg, #17ead9, #6078ea) !important;
}

.progress-bar-2 {
  height: 8px;
  border-radius: 3px;
  background: #f54ea2;
  background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
  background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
}

.progress-bar-3 {
  height: 8px;
  border-radius: 3px;
  background: #42e695;
  background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
  background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
}

.progress-bar-4 {
  height: 8px;
  border-radius: 3px;
  background: #ffdf40;
  background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
  background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}

.border-top {
  border-top: 1px solid #efefef;
}

.chip_pending {
  background: #ffdf40;
  background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
  background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}

.chip_completed {
  background: #42e695;
  background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
  background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
}
</style>
