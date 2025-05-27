<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LineLoader from '@/components/LineLoader.vue';
import { useGetArrets, useGetLignesById } from '@/composables/stan';
import { getColor } from '@/utils/stan';

const route = useRoute();
const router = useRouter();
const lineId = parseInt(route.params.id);
const lineNumber = route.params.numlignepublic;

const { arrets, fetchArrets, loading: loadingArrets } = useGetArrets();

const { ligne, loading, refetch } = useGetLignesById(lineId, {
  successHandler: (data) => {
    fetchArrets(data);
  },
});

onMounted(() => {
  refetch.value();
});

</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <LineLoader v-if="loading || loadingArrets"/>

    <div v-else class="pb-20">

      <div :class="[getColor(ligne), 'sticky top-0 z-10 shadow-md']">
        <div class="container mx-auto px-4 py-4 h-20">
          <div class="flex items-center justify-between">
            <button @click="router.back()" class="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-bold text-white">Ligne {{ lineNumber }}</h1>
            <div class="w-8"></div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 mt-4">
        <div class="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div class="flex-shrink-0 mr-4">
            <div :class="[getColor(ligne), 'text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold']">
              {{ lineNumber }}
            </div>
          </div>
          <div>
            <h2 class="font-bold text-lg">{{ ligne?.libelle }}</h2>
            <p class="text-gray-600 text-sm">ID: {{ ligne?.id }}</p>
          </div>
          <img v-if="ligne?.image" :src="ligne.image" alt="Line icon" class="ml-auto h-12">
        </div>
      </div>

      <div class="container mx-auto px-4 mt-6">
        <h2 class="text-xl font-semibold mb-3">Arrêts</h2>
        <div class="bg-white rounded-lg shadow-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="(arret, index) in arrets" :key="arret.osmid" class="p-4 flex items-center">
              <div :class="[getColor(ligne), 'w-8 h-8 rounded-full flex items-center justify-center mr-4 text-white font-bold']">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="font-medium">{{ arret.nom }}</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
