<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AppMenu } from '@/components';
import { useI18n } from 'vue-i18n';
import { Stan } from '@/composables/stan';

const { t, locale } = useI18n();
const cacheCleared = ref(false);
const appVersion = ref('1.0.3'); 
const clearingCache = ref(false);
const preferences = ref({
    language: 'fr',
    home: 'accueil'
});

// Load preferences from localStorage
onMounted(() => {
    const savedPreferences = localStorage.getItem('preferences');
    console.log('Loaded preferences:', savedPreferences);
    if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        preferences.value = {
            language: parsed.language || 'fr',
            home: parsed.home || 'accueil'
        };
    }
    console.log('Current preferences:', preferences.value);
});

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

const savePreferences = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences.value));
    locale.value = preferences.value.language;
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 pb-20">
        <header class="sticky top-0 z-10 shadow-md bg-gray-700">
            <div class="flex items-center justify-center h-20 px-4">
                <h1 class="text-xl font-bold text-white">{{ t('settings.title') }}</h1>
            </div>
        </header>

        <div class="container mx-auto px-4 mt-6">
            <!-- Preferences Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">{{ t('settings.preferences.title') }}</h2>
                
                <!-- Language Selection -->
                <div class="mb-4">
                    <h3 class="text-gray-700 font-medium mb-2">{{ t('settings.preferences.language') }}</h3>
                    <select 
                        v-model="preferences.language" 
                        @change="savePreferences" 
                        class="mt-3 p-2 border rounded-md w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    >
                        <option disabled value="">{{ t('settings.preferences.selectLanguage') }}</option>
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="es">Español</option>
                        <option value="it">Italiano</option>
                    </select>
                </div>
                
                <!-- Home Page Selection -->
                <div>
                    <h3 class="text-gray-700 font-medium mb-2">{{ t('settings.preferences.homePage') }}</h3>
                    <select 
                        v-model="preferences.home" 
                        @change="savePreferences" 
                        class="flex-1 p-2 border rounded-md w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    >
                        <option disabled value="">{{ t('settings.preferences.selectHomePage') }}</option>
                        <option value="accueil">{{ t('settings.preferences.homeOptions.home') }}</option>
                        <option value="favorites">{{ t('settings.preferences.homeOptions.favorites') }}</option>
                    </select>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">{{ t('settings.cache.title') }}</h2>
                <p class="text-gray-600 mb-4">
                    {{ t('settings.cache.description') }}
                </p>
                <div class="flex flex-col">
                    <button 
                        @click="clearCache" 
                        :disabled="clearingCache" 
                        class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        :class="{ 'opacity-70 cursor-not-allowed': clearingCache }"
                    >
                        <span v-if="clearingCache">{{ t('settings.cache.clearing') }}</span>
                        <span v-else>{{ t('settings.cache.clearButton') }}</span>
                    </button>
                    <div 
                        v-if="cacheCleared" 
                        class="mt-4 bg-green-100 text-green-700 p-3 rounded-md flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        {{ t('settings.cache.cleared') }}
                    </div>
                </div>
            </div>

            <!-- About Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">{{ t('settings.about.title') }}</h2>
                <div class="text-gray-600">
                    <p class="mb-2">{{ t('settings.about.version') }}: {{ appVersion }}</p>
                    <p class="mb-2">{{ t('settings.about.description') }}</p>
                    <p class="mb-2">{{ t('settings.about.dataSource') }} <a href="https://reseau-stan.com" class="text-blue-500 hover:underline" target="_blank">reseau-stan.com</a></p>
                </div>
            </div>

            <!-- Legal Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">{{ t('settings.legal.title') }}</h2>
                <div class="text-gray-600 text-sm">
                    <p class="mb-2"><strong>{{ t('settings.legal.copyright') }}</strong> : {{ t('settings.legal.copyrightText') }}</p>
                    
                    <p class="mb-2"><strong>{{ t('settings.legal.reproduction') }}</strong> : {{ t('settings.legal.reproductionText') }}</p>
                    
                    <p class="mb-2"><strong>{{ t('settings.legal.liability') }}</strong> : {{ t('settings.legal.liabilityText') }}</p>
                    
                    <p class="mb-2"><strong>{{ t('settings.legal.externalLinks') }}</strong> : {{ t('settings.legal.externalLinksText') }}</p>
                    
                    <p class="mb-2">{{ t('settings.legal.disclaimer') }}</p>
                </div>
            </div>

            <!-- Contact / Support Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-semibold mb-4">{{ t('settings.support.title') }}</h2>
                <p class="text-gray-600 mb-4">
                    {{ t('settings.support.description') }}
                </p>
                <ul class="list-disc pl-5 text-gray-600 mb-2">
                    <li class="mb-2">{{ t('settings.support.actions.clearCache') }}</li>
                    <li class="mb-2">{{ t('settings.support.actions.refresh') }}</li>
                    <li class="mb-2">{{ t('settings.support.actions.checkConnection') }}</li>
                </ul>
            </div>
        </div>
    </div>

    <AppMenu />
</template>

<style scoped>
/* Any scoped styles can go here */
</style>