<template>
  <div class="row q-pa-lg">
    <!-- Sección de Fecha y Saludo -->
    <div class="col-12 column q-gutter-md">
      <div class="row items-center">
        <q-icon color="secondary" name="mdi-white-balance-sunny" size="md" />
        <div class="date-now column q-pa-md">
          <span class="q-mx-sm">{{ date }}</span>
          <span class="q-mx-sm">{{ currentTime }}</span>
        </div>
      </div>
      <div>
        <span class="text-h5 text-weight-bolder">Hi, Darinel!</span>
      </div>
    </div>

    <!-- Tarjeta de Consejo -->
    <q-card bordered class="col-12 q-mt-md" style="border-radius: 15px;">
      <q-card-section class="row items-center no-wrap q-gutter-md">
        <!-- Contenedor del GIF -->
        <div class="gif-container">
          <q-img src="/home/star.svg" alt="GIF" class="gif-img rotating-star" />
        </div>

        <!-- Contenedor del Texto -->
        <div class="col column justify-center">
          <span class="text-body1" style="font-size: 1em;">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis omnis sequi libero.
          </span>
        </div>
      </q-card-section>
    </q-card>

    <!-- Sección de Funciones -->
    <div class="col-12 q-mt-sm">
      <span class="text-h6">Funciones:</span>

      <!-- Contenedor de las tarjetas -->
      <div class="grid-container">
        <q-card v-for="(card, index) in cards" :key="index" class="grid-item" @click="navigateTo(card.path)">
          <q-card-section>
            <span class="text-body1 text-weight-bold">{{ $t(card.name) }}</span>
          </q-card-section>

          <!-- Imagen dentro de su contenedor -->
          <q-card-section class="image-container">
            <q-img :src="getImagePath(card.image)" alt="SVG" fit="contain" class="card-image" />
          </q-card-section>

          <q-card-section>
            <span class="text-caption text-body1">{{ $t(card.description) }}</span>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'vue-router';

const now = ref(new Date());
const router = useRouter();

const currentTime = computed(() => format(now.value, 'HH:mm a', { locale: es }));
const date = computed(() => format(now.value, "EEEE d 'de' MMMM", { locale: es }));

const updateTime = () => {
  now.value = new Date();
};

let intervalId = null;

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId)
});

const cards = [
  { name: 'create_order', description: 'Crear un pedido para enviar al chef', image: 'create_order.svg', path: '/create-order' },
  { name: 'active_services', description: 'Revisa las mesas que están a tu cargo', image: 'active_tables.svg', path: '/active-tables' },
  { name: 'kitchen_orders', description: 'Seguimiento de platillos en proceso para el chef', image: '328.svg', path: '/kitchen-orders' },
  { name: 'profile', description: 'Ver tu información', image: '481.svg', path: '/profile' },
];

const navigateTo = (path) => {
  if (path) {
    router.push(path);
  } else {
    console.log('No hay ruta definida para esta tarjeta');
  }
};

const getImagePath = (imageName) => {
  return `/home/${imageName}`;
};

</script>

<style scoped>
/* Estilos generales */
.date-now {
  font-family: 'Prompt', serif;
  font-weight: 450;
  font-size: 20px;
}

.grid-item:hover {
  transform: scale(1.02);
}

/* Contenedor de imagen */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

/* Imagen dentro de la tarjeta */
.card-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Estilos para la animación del GIF */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  justify-content: center;
  align-items: center;
  height: auto;
}

/* Tarjetas */
.grid-item {
  max-width: auto;
  display: flex;
  flex-direction: column;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.gif-img {
  max-width: 100%;
  height: auto;
}

.rotating-star {
  animation: spin 2s linear infinite;
}

.gif-container {
  width: 120px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

@media (max-width: 700px) {
  .card-image {
    height: 15%;
  }
}
</style>
