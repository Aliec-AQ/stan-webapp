<script setup>
import { onMounted, onUnmounted } from 'vue';
import { usePWA } from '@/plugins/PWA';
import { RouterView } from 'vue-router';
import PWAInstallButton from './plugins/PWA/components/PWAInstallButton.vue';

import { transferFavorites } from '@/utils/transfer';

const { setup, cleanup } = usePWA();


onMounted (() => {
  setup();

  // transfer the favorites to the old way to the new way
  transferFavorites();
});
onUnmounted(cleanup);

</script>

<template>
  <div>
    <PWAInstallButton customClass="fixed bottom-20 right-2 z-50" :showError="false" />
    <RouterView />
  </div>
</template>

<style>
</style>