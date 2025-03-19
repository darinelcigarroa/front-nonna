<template>
    <transition appear enter-active-class="animated zoomIn slow" leave-active-class="animated zoomOut slow">
        <q-page class="q-pa-sm">
            <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
                <IndexPageTable />
                <IndexPageDish />
            </div>
        </q-page>
    </transition>
</template>

<script setup>
import IndexPageTable from './table/IndexPage.vue';
import IndexPageDish from './dish/IndexPage.vue';
</script>