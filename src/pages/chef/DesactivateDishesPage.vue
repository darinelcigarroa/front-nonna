<template>
    <transition appear enter-active-class="animated  delay-1s zoomIn slower"
        leave-active-class="animated zoomOut slower">
        <q-page class="q-pa-md">

            <q-card class="row">
                <q-card-section class="full-width">
                    <q-input v-model="search" outlined :label="$t('search_dish')">
                        <template v-slot:append>
                            <q-btn flat round icon="search" @click="onRequest" :loading="loading" />
                        </template>
                    </q-input>

                </q-card-section>

                <q-card-section v-for="(typeDish) in typesDishes" :key="typeDish.id" class="row full-width q-gutter-xs">
                    <div class="flex justify-between col-12 q-px-sm q-my-xs">
                        <span class="text-h6">{{ typeDish.dishes.length }} platillos</span>
                        <span class="text-h6">{{ typeDish.name }}</span>
                    </div>

                    <div class="dish-container full-width">
                        <q-card v-for="(dish, index) in typeDish.dishes" :key="dish.id">
                            <q-card-section style="padding: 0;">
                                <q-toggle v-model="dish.status" color="secondary" @click="desactivateDish(dish.id)" />
                            </q-card-section>

                            <q-card-section class="flex flex-center">
                                <q-avatar size="100px" font-size="52px" :class="[`box_button_${(index % 4) + 1}`]"
                                    text-color="white" :icon="getStatusDishIcon(typeDish.name)" />
                            </q-card-section>

                            <q-card-section class="column text-dark">
                                <span class="text-weight-medium">{{ dish.name }}</span>
                                <span style="font-size: 16px;" class="text-weight-bold">${{ dish.price }}</span>
                            </q-card-section>
                        </q-card>
                    </div>
                </q-card-section>

            </q-card>
        </q-page>
    </transition>
</template>

<script setup>
import dishService from 'src/services/catalogs/dishService';
import { getStatusDishIcon } from '@/constants/status.js'
import { onMounted, ref, watch } from 'vue';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const typesDishes = ref([])
const search = ref(null)
const loading = ref(false)

const desactivateDish = async (id) => {
    const result = await dishService.toggleDishStatus(id)
    if (result.success) {
        notifySuccess(result.message)
    } else {
        notifyError(result.message)
    }
}
const onRequest = async () => {
    loading.value = true;
    const response = await dishService.getMenuDishes(search.value);
    typesDishes.value = response.data.typesDishes;
    loading.value = false
}
onMounted(async () => {
    $q.loading.show()
    await onRequest()
    $q.loading.hide()
})

watch(search, () => {
    onRequest()
})
</script>
<style scoped>
/* style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px" */
.dish-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
}
</style>