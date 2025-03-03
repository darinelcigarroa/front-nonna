<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center column error-page">
        <div class="error-container">
          <svg xmlns="http://www.w3.org/2000/svg" id="robot-error" viewBox="0 0 260 118.9" role="img">
            <title>403 Error</title>
            <defs>
              <clipPath id="white-clip">
                <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="23.7" />
              </clipPath>
              <text id="text-s" class="error-text" y="106"> 404 </text>
            </defs>
            <path class="alarm" fill="#7fc7dc" d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6" />
            <use xlink:href="#text-s" x="-0.5px" y="-1px" fill="black"></use>
            <use xlink:href="#text-s" fill="#2b2b2b"></use>
            <g id="robot">
              <g id="eye-wrap">
                <use xlink:href="#white-eye"></use>
                <circle id="eyef" class="eye" clip-path="url(#white-clip)" fill="#000" stroke="#2aa7cc" stroke-width="2"
                  stroke-miterlimit="10" :cx="eyeX" :cy="eyeY" r="11" />
              </g>
              <circle class="lightblue" cx="105" cy="32" r="2.5" id="tornillo" />
              <use xlink:href="#tornillo" x="50"></use>
              <use xlink:href="#tornillo" x="50" y="60"></use>
              <use xlink:href="#tornillo" y="60"></use>
            </g>
          </svg>
          <span class="text-h1 text-center q-mt-md block">Oops! Page not found</span>
          <span class="text-h4 text-center block">
            <router-link :to="{ name: 'home' }">Go Home!</router-link>
          </span>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";

const eyeX = ref(130);
const eyeY = ref(65);

const updateEyePosition = (x, y) => {
  eyeX.value = 115 + 30 * x;
  eyeY.value = 50 + 30 * y;
};

onMounted(() => {
  document.addEventListener("mousemove", (evt) => {
    let x = evt.clientX / window.innerWidth;
    let y = evt.clientY / window.innerHeight;
    updateEyePosition(x, y);
  });

  document.addEventListener("touchmove", (touchHandler) => {
    let x = touchHandler.touches[0].clientX / window.innerWidth;
    let y = touchHandler.touches[0].clientY / window.innerHeight;
    updateEyePosition(x, y);
  });
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Bungee");

.error-page {
  background: #1b1b1b;
  color: white;
  font-family: "Bungee", cursive;
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  color: #2aa7cc;
  text-decoration: none;
}

a:hover {
  color: white;
}

svg {
  width: 50vw;
}

/* Media Queries para pantallas pequeñas */
@media (max-width: 768px) {
  svg {
    width: 80vw;
  }

  .text-h1 {
    font-size: 1.7rem;
    /* Reducimos el tamaño en móviles */
  }

  .text-h4 {
    font-size: 1.2rem;
  }
}

.lightblue {
  fill: #444;
}

#eye-wrap {
  overflow: hidden;
}

.error-text {
  font-size: 120px;
}

.alarm {
  animation: alarmOn 0.5s infinite;
}

@keyframes alarmOn {
  to {
    fill: #2aa7cc;
  }
}
</style>
