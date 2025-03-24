<template>
    <ChartCard :title="$t('most_used_tables')" :chartOptions="TableOptions">
        <template #actions>
            <q-btn flat dense @click="prevPage('chartTables')" round color="primary" icon="mdi-arrow-left" />
            <q-btn flat dense @click="nextPage('chartTables')" round color="primary" icon="mdi-arrow-right" />
        </template>
    </ChartCard>
</template>

<script setup>
import ChartCard from '@/components/admin/ChartCard.vue';
import chartService from 'src/services/chartService';
import { computed, onMounted, ref } from 'vue';

const chartTables = ref([])
const currentPage = ref(1);
const totalPages = ref(1);
const rowsPerPage = 5;

const mostUsedTables = async () => {
    const response = await chartService.getMostUsedTables({ page: currentPage.value, rowsPerPage });

    if (response.success) {
        chartTables.value = response.data.tables.data;
        totalPages.value = response.data.tables.last_page;
    }
};

const TableOptions = computed(() => ({
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: chartTables.value.map((item) => item.table.name),
        axisLabel: { color: '#676767' }
    },
    yAxis: {
        type: 'value',
        axisLabel: { color: '#676767' }
    },
    series: [{
        name: 'Veces usada',
        type: 'bar',
        data: chartTables.value.map((item) => item.total_uses),
        color: '#3bb2b8'
    }]
}))

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        mostUsedTables();
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        mostUsedTables();
    }
};

onMounted(() => {
    mostUsedTables()
});
</script>