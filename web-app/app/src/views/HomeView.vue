<script setup>
import { onMounted, computed, ref } from 'vue';
import { useGetLignes } from '@/composables/stan';
import Line from '@/components/Line.vue';
import ItemSelector from '@/components/ItemSelector.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { lignes, loading, refetch } = useGetLignes();
const showMobileMenu = ref(false);

onMounted(() => {
  refetch.value();
});

const categorizedLignes = computed(() => {
  const categories = {
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
    } else if (!isNaN(ligne.numlignepublic)) {
      categories['Standard'].push(ligne);
    } else {
      categories['Autres'].push(ligne);
    }
  });
  
  categories['Standard'].sort((a, b) => Number(a.numlignepublic) - Number(b.numlignepublic));
  
  return categories;
});

const goToLineDetail = (ligne) => {
  router.push(`/ligne/${ligne.id}/${ligne.numlignepublic}`);
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<template>
  <header class="sticky top-0 z-20 shadow-md bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Logo Section -->
        <div class="flex items-center">
          <img src="@/assets/logo.png" alt="Logo STAN" class="h-14 md:h-16">
          <div class="ml-3 hidden md:block">
            <h1 class="text-xl font-semibold text-blue-800">Lignes de bus stan</h1>
          </div>
        </div>
        
        <!-- Navigation Links - Desktop -->
        <nav class="hidden md:flex items-center space-x-6">
          <a href="#" class="text-blue-700 font-medium flex items-center pb-1 border-b-2 border-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Accueil
          </a>
        </nav>
        
        <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-show="showMobileMenu" class="md:hidden border-t border-gray-200 py-3 px-4 space-y-3 animate-slideDown">
        <a href="#" class="flex items-center py-2 px-4 bg-blue-50 text-blue-700 rounded-md font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Accueil
        </a>
      </div>
    </div>
    
    <!-- Search Bar Banner -->
    <div class="bg-blue-50 py-3 px-4 border-t border-blue-100">
      <div class="max-w-7xl mx-auto">
        <p class="text-sm text-blue-700 font-medium mb-1">Trouvez votre ligne</p>
        <div id="search-container" class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <ItemSelector
            class="w-full pl-10 z-10 shadow-sm"
            :items="lignes"
            @select="goToLineDetail"
          />
        </div>
      </div>
    </div>
  </header>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div id="loading" v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="loader-container">
        <div class="loader-line">
          <div class="loader-highlight"></div>
        </div>
      </div>
      <p class="text-gray-600 animate-pulse mt-4">Chargement des lignes...</p>
    </div>
    
    <div id="lignes" v-else class="space-y-16">
      <div v-for="(lines, category) in categorizedLignes" :key="category" class="category-section" v-show="lines.length > 0">
        <div class="category-header mb-6 relative">
          <h2 class="text-2xl font-bold text-gray-800 inline-block pb-2 border-b-4 border-blue-500">{{ category }}</h2>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
        </div>
        <div class="lines-container">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Line v-for="ligne in lines" :key="ligne.id" :ligne="ligne" @lineSelected="goToLineDetail(ligne)" 
                  class="transform transition-all duration-300 hover:-translate-y-2" />
          </div>
        </div>
      </div>
      
      <div v-if="Object.values(categorizedLignes).every(arr => arr.length === 0)" class="text-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-500 text-lg">Aucune ligne ne correspond à votre recherche</p>
      </div>
    </div>
  </div>
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