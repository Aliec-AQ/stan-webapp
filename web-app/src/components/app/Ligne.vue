<script setup lang="ts">
import type { Ligne } from '@/types';
import { getColor } from '@/utils/stan';
import { BusIcon, ChevronRightIcon } from '@/components/icons';
import t from '@/i18n';

const props = defineProps({
    ligne: {
        type: Object as () => Ligne,
        required: true
    }
});

const emit = defineEmits(['lineSelected']);
const goToLineDetail = (ligne: Ligne) => {
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
                    <BusIcon class="size-4 text-white" />
                </div>
            </div>
        </div>
        
        <div class="px-4 py-4">
            <div class="flex items-center">
                <img 
                        :src="ligne.image" 
                        alt="Ligne Icon" 
                        class="w-12 h-12 object-contain mr-3 flex-shrink-0"
                    />
                <div class="flex-1">
                    <p class="font-medium text-gray-900 line-clamp-1">
                        {{ ligne.libelle }}
                    </p>
                </div>
            </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 flex items-center justify-between">
            <span class="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-200 flex items-center">
                {{ t('ligne.detail') }}
            </span>
            <ChevronRightIcon class="size-5 text-blue-600" />
        </div>
        
        <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-opacity duration-300"></div>
    </div>
</template>

<style scoped>
.line-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
}

.line-card:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>