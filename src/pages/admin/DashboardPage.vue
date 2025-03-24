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
          <TableChart />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <MonthlyIncomeTrend />
        </div>
      </div>

      <div class="row q-col-gutter-md q-pt-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <WaiterServicesChart />
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
import StatCard from '@/components/admin/StatCard.vue';
import TableChart from '../../components/admin/charts/TableChart.vue';
import MonthlyIncomeTrend from 'src/components/admin/charts/MonthlyIncomeTrendChart.vue';
import WaiterServicesChart from 'src/components/admin/charts/WaiterServicesChart.vue';
import { ref, onMounted, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { useQuasar } from 'quasar';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, LineChart, PieChart]);

const stats = [
  { value: 900, label: "Total Sales", icon: "mdi-currency-usd", iconClass: "box_1", progress: 70 },
  { value: 1050, label: "Total Dishes", icon: "mdi-food-turkey", iconClass: "box_2", progress: 40 },
  { value: 80, label: "Total Employees", icon: "mdi-account-group", iconClass: "box_3", progress: 80 },
  { value: 720, label: "New Customers", icon: "mdi-silverware-fork-knife", iconClass: "box_4", progress: 30 }
];

const $q = useQuasar();
const isReady = ref(false);

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
