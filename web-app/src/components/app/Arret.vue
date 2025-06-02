<script setup>
import { ChevronDownIcon, ChevronUpIcon, BusIcon, StarIcon, StarOutlineIcon } from '@/components/icons';
import { computed } from 'vue';
import t from '@/i18n';
import { useFavoritesStore } from '@/stores/favorites';

const favorites = useFavoritesStore();

const props = defineProps({
    arret: {
        type: Object,
        required: true
    },
    color: {
        type: String,
        default: 'bg-gray-700'
    },
    passages: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['selectArret', 'toggleFavorite'])

const formatPassageTime = (passage) => {
    if (passage.temps_min === 0) {
        return t('arret.passageImediat');
    } else if (passage.temps_min < 60) {
        return `${passage.temps_min} min`;
    } else {
        const hours = Math.floor(passage.temps_min / 60);
        const minutes = passage.temps_min % 60;
        return `${hours}h${minutes < 10 ? '0' + minutes : minutes}`;
    }
}

const borderColor = computed(() => {
    return props.color?.replace('bg-', 'border-') || 'border-gray-700';
});

const passagesByDirection = computed(() => {
    const grouped = {};
    if (props.passages && props.passages.length > 0) {
        props.passages.forEach(passage => {
            if (!grouped[passage.direction]) {
                grouped[passage.direction] = [];
            }
            grouped[passage.direction].push(passage);
        });
        
        Object.keys(grouped).forEach(direction => {
            grouped[direction].sort((a, b) => a.temps_min - b.temps_min);
            grouped[direction] = grouped[direction].slice(0, 2);
        });
    }
    return grouped;
});

const isFavoriteArret = computed(() => {
    return props.isFavorite || favorites.isFavorite(props.arret.osmid);
});

const handleToggleFavorite = (e) => {
    e.stopPropagation();
    emit('toggleFavorite', props.arret);
};
</script>

<template>
    <li :key="arret.osmid">
        <div class="p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors" 
             @click="$emit('selectArret', arret)">
            <img :src="arret.ligne.image" class="size-6 mr-3">
            <div class="flex-grow">
                <h3 class="font-medium">{{ arret.libelle }}</h3>
            </div>
            <button 
                class="text-yellow-400 mr-2 p-1" 
                @click="handleToggleFavorite"
            >
                <StarIcon v-if="isFavoriteArret" class="size-5" />
                <StarOutlineIcon v-else class="size-5 text-gray-400" />
            </button>
            <div class="text-gray-500">
                <ChevronDownIcon v-if="!isSelected" class="size-5" />
                <ChevronUpIcon v-else class="size-5" />
            </div>
        </div>
        
        <div v-if="isSelected" class="px-4 py-4 bg-gray-50">

            <div v-if="loading" class="py-3">
                <div class="loader-container">
                    <div class="loader-line">
                        <div :class="[color, 'loader-highlight']"></div>
                    </div>
                </div>
                <p class="mt-2 text-center text-sm text-gray-600">{{ t('arret.loading') }}</p>
            </div>
            
            <div v-else>
                <div v-if="Object.keys(passagesByDirection).length === 0" class="text-sm text-gray-500 py-2">
                    {{ t('arret.noPassages') }}
                </div>
                <div v-else class="space-y-6">
                    <div v-for="(passages, direction) in passagesByDirection" :key="direction" class="py-4 relative">
                        <div class="font-semibold text-sm text-gray-700 mb-2">{{ direction }}</div>
                        <div class="relative h-[30px] ml-[20px]">
                            <div class="absolute top-[15px] left-0 right-[30px] h-1 dotted-line" :class="color"></div>
                            <div class="absolute top-[7px] left-[-10px] w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center z-10">
                                <div class="w-2 h-2 rounded-full" :class="color"></div>
                            </div>

                            <div v-if="passages.length > 0"
                                 class="absolute top-0 left-[30%] flex flex-col items-center transform -translate-x-1/2">
                                <BusIcon class="w-5 h-5" />
                                 <div class="px-1.5 py-0.5 bg-white text-xs font-semibold rounded-full shadow-sm" 
                                     :class="{'text-amber-500': passages[0].temps_theorique}">
                                    {{ formatPassageTime(passages[0]) }}
                                </div>
                            </div>
                            
                            <div v-if="passages.length > 1"
                                 class="absolute top-0 left-[70%] flex flex-col items-center transform -translate-x-1/2">
                                <BusIcon class="w-5 h-5" />
                                 <div class="px-1.5 py-0.5 bg-white text-xs font-semibold rounded-full shadow-sm"
                                     :class="{'text-amber-500': passages[1].temps_theorique}">
                                    {{ formatPassageTime(passages[1]) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<style scoped>
.loader-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px 0;
}

.loader-line {
  position: relative;
  height: 4px;
  width: 100%;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.loader-highlight {
  position: absolute;
  height: 100%;
  width: 40%;
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

/* Keep only the dotted line animation since Tailwind doesn't support this pattern animation */
.dotted-line {
  background: repeating-linear-gradient(
    to right,
    currentColor 0%,
    currentColor 50%,
    transparent 50%,
    transparent 100%
  );
  background-size: 10px 1px;
  animation: moveLine 30s linear infinite;
  opacity: 0.5;
}

@keyframes moveLine {
  from {
    background-position: 300px 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>