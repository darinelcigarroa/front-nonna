<template>
    <!-- status -->
    <div class="col-12 flex flex-center">
        <q-toggle v-model="storeTable.table.status" checked-icon="check" color="green" :label="$t('status')"
            unchecked-icon="clear" />
    </div>
    <!-- Name -->
    <div class="col-sm-6 col-12">
        <q-input v-model="storeTable.table.name" :label="$t('name')" outlined>
            <template v-slot:append>
                <q-icon name="table_bar" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
    <!-- capacity -->
    <div class="col-sm-6 col-12">
        <q-input v-model="storeTable.table.capacity" type="number" :label="$t('capacity')" outlined>
            <template v-slot:append>
                <q-icon name="mdi-human-capacity-decrease" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
</template>
<script setup>
import { useTableStore } from '@/stores/catalogs/table-store'
const storeTable = useTableStore()

</script>