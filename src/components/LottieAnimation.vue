<template>
    <div ref="lottieContainer" :style="{ width, height }"></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import lottie from 'lottie-web';

const props = defineProps({
    animationData: {
        type: Object,
        required: true
    },
    width: {
        type: String,
        default: '40px'
    },
    height: {
        type: String,
        default: '40px'
    },
    loop: {
        type: Boolean,
        default: true
    },
    autoplay: {
        type: Boolean,
        default: true
    }
});

const lottieContainer = ref(null);
let animationInstance = null;

onMounted(() => {
    animationInstance = lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg', // Usa 'canvas' para mejor rendimiento si es necesario
        loop: props.loop,
        autoplay: props.autoplay,
        animationData: props.animationData
    });
});

onUnmounted(() => {
    if (animationInstance) {
        animationInstance.destroy(); // Elimina la animación al desmontar el componente
    }
});
</script>

<style scoped>
div {
    display: inline-block;
}
</style>