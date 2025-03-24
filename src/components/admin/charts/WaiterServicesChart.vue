<template>
    <ChartCard :title="$t('services_attended_by_a_waiter')" :chartOptions="waiterOptions" chartRefName="charWaiter">
        <template #actions>
            <q-btn flat dense @click="prevPage('chartTables')" round color="primary" icon="mdi-arrow-left" />
            <q-btn flat dense @click="nextPage('chartTables')" round color="primary" icon="mdi-arrow-right" />
        </template>
    </ChartCard>
</template>

<script setup>
import ChartCard from '@/components/admin/ChartCard.vue';
import { useQuasar } from 'quasar';
import chartService from 'src/services/chartService';
import { computed, onMounted, ref } from 'vue';

const $q = useQuasar();
const chartWaiter = ref([])
const currentPage = ref(1);
const totalPages = ref(1);
const rowsPerPage = 5;

onMounted(async () => {
    await onRequest()
})

const onRequest = async () => {
    const response = await chartService.getServicesAttendedWaiter({ page: currentPage.value, rowsPerPage })

    if (response.success) {
        chartWaiter.value = response.data.waiters.data;
        totalPages.value = response.data.waiters.last_page;
    }
}

const namesWaiters = computed(() => chartWaiter.value.map((item) => item.user.employee.name))
const totalServices = computed(() => chartWaiter.value.map((item) => item.total_services))

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        onRequest();
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        onRequest();
    }
};


const waiterOptions = computed(() => (
    {
        tooltip: {
            trigger: 'axis',
            axisPointer:
            {
                type: 'shadow'
            },
            backgroundColor: '#000',
            textStyle: {
                color: 'white' // Cambia el color del texto del tooltip a blanco
            }
        },
        legend: {
            textStyle: {
                color: $q.dark.isActive ? 'white' : '#000'
            }
        },
        color: ['#084565', '#951163', '#11957d'],
        grid:
        {
            bottom: '3%',
            left: '15%',
            top: '18%',
            right: '5%',
            show: true
        },
        calculable: true,
        xAxis: // Services number
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
                    return value;
                },
                color: $q.dark.isActive ? 'white' : '#000'
            }
        },
        yAxis: [ // Waiter names
            {
                type: 'category',
                data: namesWaiters.value,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    fontSize: 11,
                    color: $q.dark.isActive ? 'white' : '#000'
                }
            }
        ],
        series: [{
            name: 'Servicios tomados',
            type: 'bar',
            data: totalServices.value,
            barWidth: 30,
        }]
    }
))
</script>