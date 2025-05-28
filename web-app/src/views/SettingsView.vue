<script setup>
import { ref, onMounted } from 'vue';
import { AppMenu, ChevronLeftIcon } from '@/components';
import { useRouter } from 'vue-router';
import { Stan } from '@/composables/stan';

const router = useRouter();
const cacheCleared = ref(false);
const appVersion = ref('1.0.0'); 
const clearingCache = ref(false);

const clearCache = async () => {
    clearingCache.value = true;

    await new Promise(resolve => setTimeout(resolve, 500));
    Stan.clearCache();
    cacheCleared.value = true;
    clearingCache.value = false;
    
    setTimeout(() => {
        cacheCleared.value = false;
    }, 3000);
};

onMounted(() => {
});
</script>

<template>
    <div class="min-h-screen bg-gray-100 pb-20">
        <header class="sticky top-0 z-10 shadow-md bg-gray-700">
            <div class="flex items-center justify-between h-20 px-4">
                <button @click="router.back()" class="text-white p-2">
                    <ChevronLeftIcon class="size-6" />
                </button>
                <h1 class="text-xl font-bold text-white">Paramètres</h1>
                <div class="w-10"></div>
            </div>
        </header>

        <div class="container mx-auto px-4 mt-6">

            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">Gestion du cache</h2>
                <p class="text-gray-600 mb-4">
                    L'application stocke les données des lignes et arrêts en cache pour améliorer les performances pendant 24h.
                    Vous pouvez vider le cache si vous rencontrez des problèmes ou si vous souhaitez forcer un rafraîchissement complet.
                </p>
                <div class="flex flex-col">
                    <button 
                        @click="clearCache" 
                        :disabled="clearingCache" 
                        class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        :class="{ 'opacity-70 cursor-not-allowed': clearingCache }"
                    >
                        <span v-if="clearingCache">Suppression en cours...</span>
                        <span v-else>Vider le cache</span>
                    </button>
                    <div 
                        v-if="cacheCleared" 
                        class="mt-4 bg-green-100 text-green-700 p-3 rounded-md flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        Cache vidé avec succès !
                    </div>
                </div>
            </div>

            <!-- About Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">À propos</h2>
                <div class="text-gray-600">
                    <p class="mb-2">Version: {{ appVersion }}</p>
                    <p class="mb-2">Cette application web non officielle vous permet d'accéder aux horaires du réseau STAN en temps réel.</p>
                    <p>Les données sont récupérées depuis le site reseau-stan.com.</p>
                </div>
            </div>

            <!-- Contact / Support Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-semibold mb-4">Assistance</h2>
                <p class="text-gray-600 mb-4">
                    Si vous rencontrez des problèmes avec l'application, vous pouvez effectuer les actions suivantes :
                </p>
                <ul class="list-disc pl-5 text-gray-600 mb-2">
                    <li class="mb-2">Vider le cache de l'application (option ci-dessus)</li>
                    <li class="mb-2">Rafraîchir la page</li>
                    <li class="mb-2">Vérifier votre connexion internet</li>
                </ul>
            </div>
        </div>
    </div>

    <AppMenu />
</template>

<style scoped>
/* Any scoped styles can go here */
</style>