<script setup lang="ts">
import type { Ligne as LigneType } from '@/types';
import { onMounted, computed, ref } from 'vue';
import { Stan } from '@/composables/stan';
import { Ligne, ItemSelector, SadIcon, SearchIcon, AppMenu, LineLoader } from '@/components';
import { useRouter } from 'vue-router';
import t from '@/i18n';

const loading = ref(true);
const lignes = ref<LigneType[]>([]);
const router = useRouter();
const showMobileMenu = ref(false);
const refreshing = ref(false);

onMounted(async () => {
  await loadData();
});

const loadData = async (forceRefresh = false) => {
  loading.value = true;
  try {
    lignes.value = await Stan.getLignes(forceRefresh);
  } catch (error) {
    console.error('Error loading lignes:', error);
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

const categorizedLignes = computed(() => {
  const categories: Record<string, LigneType[]> = {
    'Tempo': [],
    'Corol': [],
    'Express': [],
    'Standard': [],
    'Citadine': [],
    'Autres': []
  };
  
  lignes.value.forEach(ligne => {
    if (ligne.numlignepublic.startsWith('T')) {
      categories['Tempo'].push(ligne);
    } else if (ligne.numlignepublic === 'Corol') {
      categories['Corol'].push(ligne);
    } else if (ligne.libelle.includes('Express') || ligne.numlignepublic === 'Brabois Express') {
      categories['Express'].push(ligne);
    } else if (ligne.numlignepublic.startsWith('Citadine')) {
      categories['Citadine'].push(ligne);
    } else if (!isNaN(Number(ligne.numlignepublic))) {
      categories['Standard'].push(ligne);
    } else {
      categories['Autres'].push(ligne);
    }
  });
  
  categories['Standard'].sort((a, b) => Number(a.numlignepublic) - Number(b.numlignepublic));
  
  return categories;
});

const goToLigneDetail = (ligne: LigneType) => {
  router.push(`/ligne/${ligne.osmid}`);
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<template>
  <main class="min-h-screen bg-gray-100">
    <header class="sticky top-0 z-20 shadow-md bg-white py-3 px-4 border-t">
      <div class="pl-10 max-w-7xl mx-auto relative">
            <SearchIcon class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <ItemSelector
              class="w-full shadow-sm z-10"
              :items="lignes"
              :label="t('home.search')"
              @select="goToLigneDetail"
            />
          </div>
  </header>
  
  <LineLoader v-if="loading"/>

  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <div id="lignes" class="space-y-16">
      <div v-for="(lines, category) in categorizedLignes" :key="category" class="category-section" v-show="lines.length > 0">
        <div class="category-header mb-6 relative">
          <h2 class="text-2xl font-bold text-gray-800 inline-block pb-2 border-b-4 border-blue-500">{{ category }}</h2>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
        </div>
        <div class="lines-container">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Ligne v-for="ligne in lines" :key="ligne.id" :ligne="ligne" @lineSelected="goToLigneDetail(ligne)" 
                  class="transform transition-all duration-300 hover:-translate-y-2" />
          </div>
        </div>
      </div>
      
      <div v-if="Object.values(categorizedLignes).every(arr => arr.length === 0)" class="text-center py-16">
        <SadIcon class="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <p class="text-gray-500 text-lg">{{ t('home.notFound') }}</p>
      </div>
    </div>
  </div>
  </main>

    <AppMenu />
</template>

<style scoped>
.category-section {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-section:nth-child(1) { animation-delay: 0.1s; }
.category-section:nth-child(2) { animation-delay: 0.2s; }
.category-section:nth-child(3) { animation-delay: 0.3s; }
.category-section:nth-child(4) { animation-delay: 0.4s; }
.category-section:nth-child(5) { animation-delay: 0.5s; }
.category-section:nth-child(6) { animation-delay: 0.6s; }

.loader-container {
  width: 80%;
  max-width: 300px;
  padding: 10px 0;
}

.loader-line {
  position: relative;
  height: 6px;
  width: 100%;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.loader-highlight {
  position: absolute;
  height: 100%;
  width: 40%;
  background-color: #00b1e7;
  border-radius: 3px;
  animation: moveHighlight 1.5s ease-in-out infinite;
}

@keyframes moveHighlight {
  0% {
    left: -40%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -40%;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.2s ease-out forwards;
}
</style>