<template>
    <ChartCard :title="$t('trends_in_dish_sales')" :chartOptions="foodOptions" chartRefName="charDishes" />

</template>

<script setup>
import { useQuasar } from 'quasar';
import ChartCard from '@/components/admin/ChartCard.vue';
import chartService from 'src/services/chartService';
import { computed, onMounted, ref } from 'vue';

const $q = useQuasar();
const chartData = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const rowsPerPage = 5;

// Paleta de colores personalizada (puedes cambiarla)
const colorPalette = ['#66e398', '#cc9dd1', '#f0d377', '#ff8c66', '#6699ff', '#116595'];

// Función para obtener colores dinámicos
const getColors = () => {
    return chartData.value.map((_, index) => colorPalette[index % colorPalette.length]);
};

const onRequest = async () => {
    const response = await chartService.getTrendsMainCourseSales({ page: currentPage.value, rowsPerPage });
    if (response.success) {
        console.log('response', response.data.result);
        chartData.value = response.data.result;
        totalPages.value = response.data.result.last_page;
    }
};

onMounted(() => {
    onRequest();
});

const foodOptions = computed(() => ({
    tooltip: {
        show: true
    },
    legend: {
        orient: 'horizontal',
        bottom: 0,
        width: 'auto',
        textStyle: {
            color: $q.dark.isActive ? 'white' : '#676767'
        }
    },
    color: getColors(), // Asigna colores dinámicos
    series: [
        {
            name: 'Platillo',
            type: 'pie',
            radius: ['40%', '65%'],
            // radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            emphasis: {
                show: true
            },
            label: {
                show: true,
                position: 'outside',
                formatter: function (param) {
                    return param.value + ' %';
                },
                fontSize: '14',
                fontWeight: 'bold'
            },
            labelLine: {
                show: true
            },
            legend: {
                orient: 'horizontal',
                bottom: 0,
                itemGap: 30, // Aumenta el espacio entre elementos de la leyenda
                textStyle: {
                    color: $q.dark.isActive ? 'white' : '#676767',
                    fontSize: 14,
                    padding: [5, 10, 5, 10], // Agrega más margen alrededor del texto
                    margin: 10
                }
            },
            selectedMode: 'single',
            data: chartData.value
        }
    ]
}));
</script>
