<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LineLoader, Arret, RefreshIcon, ChevronLeftIcon, FancyModal, MapIcon, AppMenu } from '@/components';
import { Stan } from '@/composables/stan';
import { getColor } from '@/utils/stan';
import { useFavoritesStore } from '@/stores/favorites';

const route = useRoute();
const router = useRouter();
const favoritesStore = useFavoritesStore();

const showFancyModal = ref(false);

const arrets = ref([]);
const ligne = ref(null);

const loading = ref(true);
const refreshing = ref(false);

const selectedArret = ref(null);
const arretPassages = ref({});
const loadingPassages = ref(false);

const loadingArretId = ref(null);
const autoRefreshInterval = ref(null);

onMounted(async () => {
  await loadData();
});

onBeforeUnmount(() => {
  clearAutoRefresh();
});

const clearAutoRefresh = () => {
  if (autoRefreshInterval.value) {
    clearInterval(autoRefreshInterval.value);
    autoRefreshInterval.value = null;
  }
};

const loadData = async (forceRefresh = false) => {
  loading.value = true;
  try {
    ligne.value = await Stan.getLigne(route.params.osmid_ligne, forceRefresh);
    arrets.value = await Stan.getArrets(ligne.value, forceRefresh);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
};

const refreshData = async () => {
  refreshing.value = true;
  await loadData(true);
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
};

const hasSoonArrival = (passages) => {
  return passages?.some(passage => passage.temps_min < 5);
};

const updateSelectedArretPassages = async () => {
  if (!selectedArret.value || loadingArretId.value) return;
  
  try {
    const arret = arrets.value.find(a => a.osmid === selectedArret.value);
    if (arret) {
      const passages = await Stan.getProchainsPassages(arret);
      arretPassages.value = { ...arretPassages.value, [selectedArret.value]: passages };
      
      setupAutoRefreshIfNeeded(passages);
    }
  } catch (error) {
    console.error('Error updating passages:', error);
  }
};

const setupAutoRefreshIfNeeded = (passages) => {
  clearAutoRefresh();
  
  if (hasSoonArrival(passages)) {
    autoRefreshInterval.value = setInterval(updateSelectedArretPassages, 60000);
  } else if (passages && passages.length > 0) {

    const closestBusTime = Math.min(...passages.map(p => p.temps_min));
    
    if (closestBusTime > 5) {

      const timeUntilRefresh = (closestBusTime - 5) * 60 * 1000;
      

      autoRefreshInterval.value = setTimeout(() => {
        autoRefreshInterval.value = setInterval(updateSelectedArretPassages, 60000);
        updateSelectedArretPassages();
      }, timeUntilRefresh);
    }
  }
};

const handleSelectArret = async (arret) => {
  if (selectedArret.value === arret.osmid) {
    selectedArret.value = null;
    clearAutoRefresh();
    return;
  }
  
  clearAutoRefresh();
  selectedArret.value = arret.osmid;
  
  loadingArretId.value = arret.osmid;
  
  try {
    const passages = await Stan.getProchainsPassages(arret);
    arretPassages.value = { ...arretPassages.value, [arret.osmid]: passages };
    
    setupAutoRefreshIfNeeded(passages);
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

const handleToggleFavorite = (arret) => {
  favoritesStore.toggleFavorite(arret);
};

watch(() => route.path, () => {
  clearAutoRefresh();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <LineLoader v-if="loading"/>

    <div v-else class="pb-20">

      <header :class="[getColor(ligne), 'sticky top-0 z-10 shadow-md']">
        <div class="flex items-center justify-between h-20 px-4">
            <button @click="router.push('/')" class="text-white p-2">
              <ChevronLeftIcon class="size-6" />
            </button>
            <h1 class="text-xl font-bold text-white">Ligne {{ ligne.numlignepublic }}</h1>
            <div>
              <button 
              @click="refreshData" 
              class="text-white p-2"
              :disabled="refreshing"
            >
              <RefreshIcon :class="{ 'animate-spin': refreshing }" class="size-6" />
            </button>
            <button 
              @click="showFancyModal = true" 
              class="text-white p-2"
              :disabled="!ligne"
            >
              <MapIcon class="size-6" />
            </button>
            </div>
          </div>
      </header>

      <div class="container mx-auto px-4 mt-4">
        <div class="bg-white rounded-lg shadow-md p-4 flex items-center">
          <img v-if="ligne?.image" :src="ligne.image" alt="Line icon" class="h-12 mr-4">
          <div>
            <h2 class="font-bold text-lg">{{ ligne?.libelle }}</h2>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 mt-6">
        <h2 class="text-xl font-semibold mb-3">Arrêts</h2>
        <div class="bg-white rounded-lg shadow-md">
          <ul class="divide-y divide-gray-200">
            <Arret
              v-for="(arret, index) in arrets"
              :key="arret.osmid"
              :color="getColor(ligne)"
              :arret="arret"
              :index="index"
              :passages="getPassagesForArret(arret)"
              :loading="isArretLoading(arret)"
              :is-selected="selectedArret === arret.osmid"
              @select-arret="handleSelectArret"
              @toggle-favorite="handleToggleFavorite"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>

  <AppMenu />

  <FancyModal :show="showFancyModal" @close="showFancyModal = false">
      <iframe
      v-if="ligne"
      :src="Stan.getPlan(ligne)"
      class="size-full"
      frameborder="0"
      allowfullscreen
      ></iframe>
  </FancyModal>
</template>

<style scoped>
</style>
