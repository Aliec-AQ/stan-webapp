<script setup lang="ts">
import type { Arret as ArretType, Passage } from '@/types';
import { ref, computed, onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import { Arret, AppMenu, LineLoader } from '@/components';
import { Stan } from '@/composables/stan';
import { getColor } from '@/utils/stan';
import t from '@/i18n';

const favorites = useFavoritesStore();
const favoriteArrets = computed(() => favorites.getFavorites);

const loading = ref(true);
const selectedArret = ref<string | null>(null);
const arretPassages = ref<Record<string, Passage[]>>({});
const loadingArretId = ref<string | null>(null);

onMounted(async () => {
  loading.value = false;
});

const handleSelectArret = async (arret: ArretType) => {
  if (selectedArret.value === arret.osmid+'-'+arret.ligne.osmid) {
    selectedArret.value = null;
    return;
  }

  selectedArret.value = arret.osmid+'-'+arret.ligne.osmid;
  loadingArretId.value = arret.osmid+'-'+arret.ligne.osmid;

  try {
    const passages = await Stan.getProchainsPassages(arret);
    arretPassages.value = { ...arretPassages.value, [arret.osmid]: passages };
  } catch (error) {
    console.error('Error loading passages:', error);
  } finally {
    loadingArretId.value = null;
  }
};

const getPassagesForArret = (arret: ArretType) => {
  return selectedArret.value === arret.osmid+'-'+arret.ligne.osmid ? arretPassages.value[arret.osmid] || [] : [];
};

const isArretLoading = (arret: ArretType) => {
  return loadingArretId.value === arret.osmid+'-'+arret.ligne.osmid;
};

const handleRemoveFavorite = (arret: ArretType) => {
  favorites.removeFavorite(arret.osmid, arret.ligne.osmid);
  if (selectedArret.value === arret.osmid+'-'+arret.ligne.osmid) {
    selectedArret.value = null;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <LineLoader v-if="loading" />
    
    <div v-else class="pb-20">
      <header class="sticky top-0 z-10 shadow-md bg-gray-700">
        <div class="flex items-center justify-center h-20 px-4">
          <h1 class="text-xl font-bold text-white">{{t('favorites.title')}}</h1>
        </div>
      </header>

      <div class="container mx-auto px-4 mt-6">
        <div v-if="favoriteArrets.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-500">{{ t('favorites.empty') }}</p>
          <p class="text-gray-500 mt-2">{{t('favorites.emptyDescription')}}</p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(favoris, index) in favoriteArrets" :key="index" class="bg-white rounded-lg shadow-md divide-y divide-gray-300">
            <div class="px-4 py-4">
              <div class="flex items-center">
                <img 
                    :src="favoris.ligne.image" 
                    alt="Ligne Icon" 
                    class="w-8 h-8 object-contain mr-3 flex-shrink-0"
                />
                <div class="flex-1">
                    <p class="font-medium text-gray-900 line-clamp-1">
                        {{ favoris.ligne.libelle }}
                    </p>
                </div>
              </div>
            </div>
            <ul>
              <Arret
                v-for="arret in favoris.arrets"
                :key="arret.osmid+'-'+favoris.ligne.osmid"
                :color="getColor(favoris.ligne)"
                :arret="arret"
                :passages="getPassagesForArret(arret)"
                :loading="isArretLoading(arret)"
                :is-selected="selectedArret === arret.osmid+'-'+favoris.ligne.osmid"
                :is-favorite="true"
                @select-arret="handleSelectArret"
                @toggle-favorite="handleRemoveFavorite(arret)"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AppMenu />
</template>