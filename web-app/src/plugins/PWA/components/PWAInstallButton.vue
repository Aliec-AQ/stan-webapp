<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePWA } from '@/plugins/PWA';
import { Teleport } from 'vue';

const props = defineProps<{
  customClass?: string;
  showError?: boolean;
}>();

const { canInstall, installPWA, deviceType, platformName, isInstalling, isFirefox } = usePWA();
const tutorialModal = ref(false);

const tutorialSteps = computed(() => {
  switch (deviceType.value) {
    case 'ios':
      return [
        { icon: 'pi-upload', text: 'Appuyez sur le bouton de partage' },
        { icon: 'pi-plus', text: 'Sélectionnez "Sur l\'écran d\'accueil"' },
        { icon: 'pi-check', text: 'Confirmez l\'ajout' }
      ];
    case 'android':
      return [
        { icon: 'pi-ellipsis-v', text: 'Appuyez sur le menu (3 points)' },
        { icon: 'pi-download', text: 'Sélectionnez "Ajouter à l\'écran d\'accueil"' },
        { icon: 'pi-check', text: 'Confirmez l\'ajout' }
      ];
    case 'desktop':
      return [
        { icon: 'pi-download', text: 'Cliquez sur l\'icône d\'installation dans la barre d\'adresse' },
        { icon: 'pi-check', text: 'Confirmez l\'installation' }
      ];
    default:
      return [
        { icon: 'pi-mobile', text: 'Utilisez le menu de votre navigateur' },
        { icon: 'pi-download', text: 'Recherchez "Installer" ou "Ajouter à l\'écran d\'accueil"' },
        { icon: 'pi-check', text: 'Suivez les instructions' }
      ];
  }
});

const install = () => {
  if (isFirefox.value) {
    console.warn('Firefox does not support PWA installation.');
    return;
  }
  if (canInstall.value && deviceType.value !== 'ios') {
    installPWA();
  } else {
    tutorialModal.value = true;
  }
};

const closeModal = () => {
  tutorialModal.value = false;
};
</script>

<template>
  <div :class="[customClass]">
    <button
      v-if="canInstall"
      @click="install"
      :disabled="isInstalling"
      class="inline-flex items-center gap-2 px-3 py-1 md:px-6 md:py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <slot>
        <i class="pi pi-download"></i>
        <span v-if="!isInstalling">Installer maintenant</span>
        <span v-else>Installation...</span>
      </slot>
    </button>
    <div v-else-if="showError && isFirefox">
      Firefox ne supporte pas l'installation de PWA. Veuillez utiliser un autre navigateur.
    </div>
    <div v-else-if="showError">
      Votre navigateur ne supporte pas l'installation de PWA. Veuillez utiliser un navigateur compatible. (Chrome, Safari, Edge, etc.)
    </div>
  </div>

  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="tutorialModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-900/75"
        @mousedown.self="closeModal"
        @keydown.esc="closeModal"
      >
        <div class="relative flex flex-col bg-white rounded-lg shadow-xl w-full m-4 max-w-5xl">
          <div class="p-3">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium">Instructions pour {{ platformName }}</h3>
              <button id="close-modal" type="button" @click="closeModal" title="Fermer la pop-up">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" id="mdi-close" fill="currentColor" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
              </button>
            </div>
            <div class="w-full max-h-[80vh] overflow-y-auto">
              <div class="space-y-3">
                <div
                  v-for="(step, index) in tutorialSteps"
                  :key="index"
                  class="flex items-start gap-3 p-3 bg-white rounded-md shadow-sm"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {{ index + 1 }}
                  </div>
                  <div class="flex items-center gap-2 flex-1">
                    <i :class="`pi ${step.icon} text-gray-600`"></i>
                    <span class="text-sm text-gray-700">{{ step.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
  }
}

#close-modal {
  @apply bg-white hover:bg-white text-black hover:text-black border-0 focus:outline-none;
}

button {
  animation: pulse 3s infinite;
}
</style>
