<template>
  <div class="row q-pa-lg">
    <!-- Sección de Fecha y Saludo -->
    <div class="col-12 column q-gutter-md">
      <div class="row items-center">
        <q-icon color="primary" name="mdi-white-balance-sunny" size="md" />
        <div class="date-now column q-pa-md">
          <span class="q-mx-sm">{{ date }}</span>
          <span class="q-mx-sm">{{ currentTime }}</span>
        </div>
      </div>
      <div>
        <span></span>
        <span class="text-h5 text-weight-bolder">Hi, Darinel!</span>
      </div>
    </div>

    <!-- Tarjeta de Consejo -->
    <q-card bordered class="row col-12 q-mt-md" style="border-radius: 15px;">
      <q-card-section class="row items-center no-wrap q-gutter-md">
        <!-- Contenedor del GIF -->
        <q-img src="waiter/298.svg" alt="GIF" class="gif-img q-mr-md rotating-star" />

        <!-- Contenedor del Texto -->
        <div class="col column justify-center h-full">
          <!-- <div class="row items-center">
            <q-icon class="q-mr-sm" name="mdi-lightbulb-on" color="primary" size="sm"></q-icon>
            <span class="text-h6 text-weight-medium">Consejo</span>
          </div> -->
          <span class="text-body1">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Blanditiis omnis
            sequi
            libero.</span>
        </div>
      </q-card-section>
    </q-card>


    <!-- Contenedor en fila para que las tarjetas estén una al lado de otra -->
    <div class="column col-12 q-mt-sm">
      <span class="text-h6">Funciones:</span>

      <!-- Contenedor con CSS Grid para organizar las tarjetas -->
      <div class="grid-container q-mt-sm">
        <!-- Primera Card -->
        <q-card @click="navigateTo(card.path)" class="grid-item" v-for="(card, index) in cards" :key="index"
          style="border-radius: 15px;">
          <q-card-section>
            <span class="text-body1 text-weight-bold">{{ $t(card.name) }}</span>
          </q-card-section>

          <q-card-section class="flex justify-center items-center content-img">
            <q-img :src="`waiter/${card.image}`" alt="SVG" fit="contain" class="full-width" style="max-height: 100%;" />
          </q-card-section>

          <q-card-section class="column items-start">
            <span class="text-caption text-body1">{{ $t(card.description) }}</span>
            <!-- <q-btn :label="$t(card.action)" color="primary" flat class="q-pa-xs q-mt-sm" /> -->
            <!-- <q-btn class="q-mt-xs" round color="accent" icon="mdi-arrow-right-thin-circle-outline" size="xs" /> -->

          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useRouter } from 'vue-router';

const now = ref(new Date());
const router = useRouter(); // Importa el router correctamente

const currentTime = computed(() => format(now.value, 'HH:mm a', { locale: es }))
const date = computed(() => format(now.value, "EEEE d 'de' MMMM", { locale: es }))

const updateTime = () => {
  now.value = new Date();
};

let intervalId = null;

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});


const cards = [
  { name: 'create_order', description: 'create_an_order_to_send_to_the_chef', image: 'create_order.svg', action: 'create', path: '/create-order' },
  { name: 'active_tables', description: 'check_out_the_tables_they_are_in_charge_of', image: 'active_tables.svg', action: 'show', path: '/active-tables' },
  { name: 'profile', description: 'view_your_information', image: 'profile.svg', action: 'go_to_profile', path: '/create-order' }
]

const navigateTo = ((path) => {
  if (path) {
    router.push(path);
  } else {
    console.log('No hay ruta definida para esta tarjeta');
  }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.date-now {
  font-family: 'Prompt', serif;
  font-weight: 450;
  font-style: normal;
  font-size: 20px;
}

.content-img {
  height: 120px;
}

.gif-img {
  max-width: 100%;
  height: 100px;
  width: 100px;
  display: block;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.grid-item {
  flex: 1 1 250px;
  max-width: 400px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

.rotating-star {
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}
</style>
