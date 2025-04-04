<template>
  <transition appear enter-active-class="animated fadeInLeft slower" leave-active-class="animated zoomOut slower">
    <q-page class="q-pa-md">
      <div class="row q-my-md shadow">
        <div v-for="(stat, index) in dashboardStats" :key="stat.label" class="col-md-3 col-lg-3 col-sm-12 col-xs-12"
          :class="stat.iconClass">
          <StatCard :value="+stat.value" :label="stat.label" :icon="stat.icon" :iconClass="stat.iconClass"
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
          <TrendsMainCourseSalesChart />
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script setup>
import StatCard from '@/components/admin/StatCard.vue';
import TableChart from '../../components/admin/charts/TableChart.vue';
import MonthlyIncomeTrend from 'src/components/admin/charts/MonthlyIncomeTrendChart.vue';
import WaiterServicesChart from 'src/components/admin/charts/WaiterServicesChart.vue';
import { ref, onMounted, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import TrendsMainCourseSalesChart from 'src/components/admin/charts/TrendsMainCourseSalesChart.vue';
import { useDashboardStatsStore } from 'src/stores/dashboard-stats-store';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, LineChart, PieChart]);

const dashboardStats = computed(() => [
  { value: stats.currentMonthTotal, label: "Total Sales", icon: "mdi-currency-usd", iconClass: "box_1", progress: 70 },
  { value: stats.totalDishesMonth, label: "Total Dishes", icon: "mdi-food-turkey", iconClass: "box_2", progress: 40 },
  { value: stats.totalCanceledOrders, label: "New Customers", icon: "mdi-file-cancel-outline", iconClass: "box_3", progress: 30 },
  { value: stats.totalEmployees, label: "Total Employees", icon: "mdi-account-group", iconClass: "box_4", progress: 80 },
]);

const stats = useDashboardStatsStore()

const isReady = ref(false);

const getDashboardStats = () => {
  stats.getStats()
}

onMounted(() => {
  getDashboardStats()
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
