<template>
    <ChartCard :title="$t('monthly_income_trend')" :chartOptions="areaChartOption" chartRefName="chartSales" />
</template>

<script setup>
import { useQuasar } from 'quasar';
import { computed, ref, onMounted } from 'vue';
import ChartCard from '@/components/admin/ChartCard.vue';
import chartService from 'src/services/chartService';

const $q = useQuasar();
const data = ref([])

// Computed para obtener solo los meses en un array
const months = computed(() => data.value.map(item => item.mes));

// Computed para obtener ingresos del mes pasado
const previousMonthIncome = computed(() =>
    data.value.map(item => item.ingresos_mes_pasado)
);

// Computed para obtener ingresos del mes actual
const currentMonthIncome = computed(() =>
    data.value.map(item => item.ingresos_mes_actual)
);

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
        data: months.value,
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
            color: $q.dark.isActive ? 'white' : '#676767',
            formatter: (value) => `$${value.toLocaleString()}`
        }
    },
    series: [
        {
            name: 'Ingresos Mes Actual',
            data: currentMonthIncome.value,
            type: 'line',
            areaStyle: {},
            smooth: true,
            color: '#e4a3e2'
        },
        {
            name: 'Ingresos Mes Pasado',
            data: previousMonthIncome.value,
            type: 'line',
            areaStyle: {},
            smooth: true,
            color: '#25c0ea'
        }
    ]
}))

onMounted(async () => {
    const response = await chartService.getMonthlyIncomeTrend()
    data.value = response.data.result
});

</script>