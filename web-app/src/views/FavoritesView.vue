<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFavoritesStore } from '@/stores/favorites';
import { Arret, AppMenu, ChevronLeftIcon, LineLoader } from '@/components';
import { Stan } from '@/composables/stan';
import { getColor } from '@/utils/stan';

const router = useRouter();
const favorites = useFavoritesStore();
const favoriteArrets = computed(() => favorites.getFavorites);

const loading = ref(true);
const selectedArret = ref(null);
const arretPassages = ref({});
const loadingArretId = ref(null);

onMounted(async () => {
  loading.value = false;
});

const handleSelectArret = async (arret) => {
  if (selectedArret.value === arret.osmid) {
    selectedArret.value = null;
    return;
  }
  
  selectedArret.value = arret.osmid;
  loadingArretId.value = arret.osmid;
  
  try {
    const passages = await Stan.getProchainsPassages(arret);
    arretPassages.value = { ...arretPassages.value, [arret.osmid]: passages };
  } catch (error) {
    console.error('Error loading passages:', error);
  } finally {
    loadingArretId.value = null;
  }
};

const getPassagesForArret = (arret) => {
  return selectedArret.value === arret.osmid ? arretPassages.value[arret.osmid] || [] : [];
};

const isArretLoading = (arret) => {
  return loadingArretId.value === arret.osmid;
};

const handleRemoveFavorite = (arretId) => {
  favorites.removeFavorite(arretId);
  if (selectedArret.value === arretId) {
    selectedArret.value = null;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <LineLoader v-if="loading" />
    
    <div v-else class="pb-20">
      <header class="sticky top-0 z-10 shadow-md bg-gray-700">
        <div class="flex items-center justify-between h-20 px-4">
          <button @click="router.back()" class="text-white p-2">
            <ChevronLeftIcon class="size-6" />
          </button>
          <h1 class="text-xl font-bold text-white">Favoris</h1>
          <div class="w-10"></div>
        </div>
      </header>

      <div class="container mx-auto px-4 mt-6">
        <div v-if="favoriteArrets.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-500">Vous n'avez pas encore d'arrêts favoris.</p>
          <p class="text-gray-500 mt-2">Ajoutez des arrêts à vos favoris pour les retrouver ici.</p>
        </div>
        
        <div v-else class="bg-white rounded-lg shadow-md">
          <ul class="divide-y divide-gray-200">
            <Arret
              v-for="(arret, index) in favoriteArrets"
              :key="arret.osmid"
              :color="getColor(arret.ligne)"
              :arret="arret"
              :index="index"
              :passages="getPassagesForArret(arret)"
              :loading="isArretLoading(arret)"
              :is-selected="selectedArret === arret.osmid"
              :is-favorite="true"
              @select-arret="handleSelectArret"
              @toggle-favorite="handleRemoveFavorite(arret.osmid)"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>

  <AppMenu />
</template>