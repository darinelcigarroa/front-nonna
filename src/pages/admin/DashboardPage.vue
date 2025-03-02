<template>
  <transition appear enter-active-class="animated fadeInLeft slower" leave-active-class="animated zoomOut slower">
    <q-page class="q-pt-xs q-ma-md">
      <div class="row q-my-md shadow">
        <div v-for="(stat, index) in stats" :key="stat.label" class="col-md-3 col-lg-3 col-sm-12 col-xs-12"
          :class="stat.iconClass">
          <StatCard :value="stat.value" :label="stat.label" :icon="stat.icon" :iconClass="stat.iconClass"
            :progress="stat.progress" :index="index" />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <ChartCard title="Most Used Tables" :chartOptions="TableOptions" chartRefName="chartTables" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <ChartCard title="Monthly Income Trend" :chartOptions="areaChartOption" chartRefName="chartSales" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-pt-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <ChartCard title="Top Waiters by Number of Tables Served" :chartOptions="waiterOptions"
            chartRefName="charWaiter" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <ChartCard title="Trends in Dish Sales" :chartOptions="foodOptions" chartRefName="charDishes" />
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script setup>
import ChartCard from '@/components/admin/ChartCard.vue';
import { ref, onMounted, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { useQuasar } from 'quasar';
import StatCard from '@/components/admin/StatCard.vue';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, LineChart, PieChart]);

const stats = [
  { value: 900, label: "Total Sales", icon: "mdi-currency-usd", iconClass: "box_1", progress: 70 },
  { value: 1050, label: "Total Dishes", icon: "mdi-food-turkey", iconClass: "box_2", progress: 40 },
  { value: 80, label: "Total Employees", icon: "mdi-account-group", iconClass: "box_3", progress: 80 },
  { value: 720, label: "New Customers", icon: "mdi-silverware-fork-knife", iconClass: "box_4", progress: 30 }
];

const $q = useQuasar();
const isReady = ref(false);
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

const ingresosActual = ref(generarIngresos());
const ingresosPasado = ref(generarIngresos());

const actualizarIngresos = () => {
  ingresosActual.value = generarIngresos();
  ingresosPasado.value = generarIngresos();
};
const sortedMesas = mesas.value.sort((a, b) => b.uso - a.uso)

const areaChartOption = computed(() => ({
  silent: true,
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
}))

const TableOptions = computed(() => ({
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
}))

const waiterOptions = computed(() => (
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
    color: ['#eb2757', '#eb2757', '#fff'],
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
))

const foodOptions = computed(() => (
  {
    tooltip: {
      show: true
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      width: 300,
      textStyle: {
        color: $q.dark.isActive ? 'white' : '#676767'
      }
    },
    color: ['#66e398', '#cc9dd1', '#f0d377'],
    series: [
      {
        name: 'Competitor',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        emphasis: {
          show: true,
        },
        label: {
          show: true,
          position: 'inner',
          formatter: function (param) {
            return param.value + ' %'
          },
          fontSize: '20',
          fontWeight: 'bold'

        },
        labelLine: {
          show: false
        },
        selectedMode: 'single',
        data: [
          { value: 40, name: 'Product 1', selected: true },
          { value: 20, name: 'Competitor 1', selected: false },
          { value: 15, name: 'Competitor 2', selected: false },
        ]
      }
    ]
  }
))

onMounted(() => {
  isReady.value = true
  actualizarIngresos()

});




</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}

.progress-base {
  height: 8px;
  border-radius: 3px;
  background-color: #e9ecef;
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
