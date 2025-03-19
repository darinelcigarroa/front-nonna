<template>
    <!-- status -->
    <div class="col-12 flex flex-center">
        <q-toggle v-model="storeDish.dish.status" checked-icon="check" color="green" :label="$t('status')"
            unchecked-icon="clear" />
    </div>
    <!-- Name -->
    <div class="col-sm-6 col-12">
        <q-input v-model="storeDish.dish.name" :label="$t('name')" outlined>
            <template v-slot:append>
                <q-icon name="mdi-food-drumstick" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
    <!-- price -->
    <div class="col-sm-6 col-12">
        <q-input v-model="storeDish.dish.price" type="number" :label="$t('price')" outlined>
            <template v-slot:append>
                <q-icon name="mdi-currency-usd" class="cursor-pointer" />
            </template>
        </q-input>
    </div>
    <!-- Tipo de platillo -->
    <div class="col-md-6 col-12">
        <q-select outlined v-model="storeDish.dish.dish_type_id" :options="typeDishes" label="Tipo de platillo"
            emit-value map-options option-value="id" option-label="name">
            <template v-if="storeDish.dish.dish_type_id" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="storeDish.dish.dish_type_id = null" class="cursor-pointer" />
            </template>
        </q-select>
    </div>
    <div class="col-12">
        <q-input :label="$t('description')" outlined v-model="storeDish.dish.description" autogrow>
            <template v-slot:append>
                <q-icon name="mdi-text-box" />
            </template>
        </q-input>
    </div>

</template>
<script setup>
import dishTypeService from 'src/services/dishTypeService';
import { useDishStore } from 'src/stores/catalogs/dish-store';
import { onMounted, ref } from 'vue';

const storeDish = useDishStore()
const typeDishes = ref([])

onMounted(async () => {
    const response = await dishTypeService.index()
    if (response.success) {
        typeDishes.value = response.data.dishTypes
    }
})

</script>