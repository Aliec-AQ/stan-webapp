<script setup>
import { computed, ref, nextTick } from 'vue';
import { ChevronDownIcon, SearchIcon } from '@/components/icons';
import t from '@/i18n';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['select']);

const isOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);

const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => {
    return a.numlignepublic.localeCompare(b.numlignepublic);
  });
});

const filteredItems = computed(() => {
  if (!searchQuery.value) return sortedItems.value;
  
  const query = searchQuery.value.toLowerCase();
  return sortedItems.value.filter(item => 
    item.libelle.toLowerCase().includes(query) ||
    item.numlignepublic.toLowerCase().includes(query)
  );
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  
  if (isOpen.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  } else {
    searchQuery.value = '';
  }
};

const selectItem = (item) => {
  emit('select', item);
  isOpen.value = false;
  searchQuery.value = '';
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.custom-dropdown')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

// Prevent zoom on iOS devices
const preventZoom = (event) => {
  event.preventDefault();
  searchInput.value?.focus();
};
</script>

<template>
  <div class="custom-dropdown relative" v-click-outside="handleClickOutside">
    <!-- Dropdown trigger button -->
    <button 
      type="button"
      @click="toggleDropdown"
      class="w-full bg-stone-50 border border-gray-600 rounded-md px-4 py-3 text-white flex items-center justify-between transition-all duration-200 hover:bg-stone-100"
    >
      <span class="text-gray-900 text-base">{{ props.label || 'Sélectionner une ligne' }}</span>
      <ChevronDownIcon
        class="size-5 text-gray-500 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
      />
    </button>
    
    <!-- Dropdown menu -->
    <div 
      v-if="isOpen" 
      class="absolute left-0 right-0 z-50 mt-1 bg-stone-50 shadow-lg max-h-60 text-base overflow-auto border border-gray-500 dropdown-menu rounded-md transition-all duration-200 animate-dropdown"
    >
      <!-- Search input -->
      <div class="sticky top-0 px-3 py-2 bg-stone-50 border-b border-gray-700">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon class="size-5 text-gray-400" />
          </div>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="w-full pl-10 pr-3 py-2.5 bg-stone-200 border border-gray-600 rounded-md text-base text-black font-normal"
            :placeholder="t('ligne.search')"
            @click.stop="preventZoom"
            @touchstart.stop="preventZoom"
          />
        </div>
      </div>
      
      <!-- Item list -->
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        @click="selectItem(item)"
        class="flex items-center px-4 py-3 cursor-pointer hover:bg-stone-300 transition-colors duration-150"
      >
        <img 
          :src="item.image" 
          :alt="item.libelle"
          class="w-8 h-8 mr-3 object-contain"
        />
        <span class="text-black text-base truncate">{{ item.libelle }}</span>
      </div>
      
      <!-- Empty state -->
      <div v-if="filteredItems.length === 0" class="px-4 py-4 text-center text-gray-500">
        {{ t('ligne.notFound') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-dropdown {
  user-select: none;
  width: 100%;
  position: relative;
}

.dropdown-menu {
  scrollbar-width: thin;
  scrollbar-color: #747474 #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  max-width: 100%;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  left: 0;
  right: 0;
}

input {
  font-size: 16px; /* Prevents iOS zoom */
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-dropdown {
  animation: dropdownFade 0.2s ease-out forwards;
}

/* Mobile optimization */
@media (max-width: 640px) {
  input, button {
    font-size: 16px; /* Prevents iOS zoom */
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .dropdown-menu {
    width: 100%;
    left: 0;
  }
}
</style>
