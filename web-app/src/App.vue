<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import PWAInstallButton from './plugins/PWA/components/PWAInstallButton.vue';

const pwa = inject('pwa');


onMounted(pwa.setup);
onUnmounted(pwa.cleanup);

</script>

<template>
  <div>
    <PWAInstallButton customClass="fixed bottom-20 right-2 z-50" :showError="false" />
    <RouterView />
  </div>
</template>

<style>
</style>