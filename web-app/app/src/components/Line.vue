<script setup>
import { getColor } from '@/utils/stan';
const props = defineProps({
    ligne: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['lineSelected']);
const goToLineDetail = (ligne) => {
    emit('lineSelected', ligne);
};
</script>

<template>
    <div 
        :key="ligne.id" 
        class="line-card relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
        @click="goToLineDetail(ligne)"
    >
        <div :class="['px-4 py-2', getColor(ligne)]">
            <div class="flex items-center justify-between">
                <span class="text-white font-bold text-lg">{{ ligne.numlignepublic }}</span>
                <div class="h-6 w-6 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-9a1 1 0 00-.384-.77l-3-2A1 1 0 0016 3H4a1 1 0 00-1 1z" />
                    </svg>
                </div>
            </div>
        </div>
        
        <div class="px-4 py-4">
            <div class="flex items-center">
                <div class="line-icon mr-3 flex-shrink-0 p-2 rounded-full">
                    <img 
                        :src="ligne.image" 
                        alt="Ligne Icon" 
                        class="w-12 h-12 object-contain"
                    />
                </div>
                <div class="flex-1">
                    <p class="font-medium text-gray-900 line-clamp-1">
                        {{ ligne.libelle }}
                    </p>
                </div>
            </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 flex items-center justify-between">
            <span class="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-200 flex items-center">
                Voir détails
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </div>
        
        <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-opacity duration-300"></div>
    </div>
</template>

<style scoped>
.line-icon {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    background-color: rgba(255, 255, 255, 0.8);
}

.line-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
}

.line-card:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Clip text to one line */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>