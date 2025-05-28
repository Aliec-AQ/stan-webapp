<script setup>
import { computed, ref, nextTick } from 'vue';
import { ChevronDownIcon, SearchIcon } from '@/components/icons';

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
</script>

<template>
  <div class="custom-dropdown relative" v-click-outside="handleClickOutside">
    <!-- Dropdown trigger button -->
    <button 
      type="button"
      @click="toggleDropdown"
      class="w-full bg-stone-50 border border-gray-600 rounded-md px-3 py-2 text-white flex items-center justify-between"
    >
      <span class="text-gray-900">{{ props.label || 'Sélectionner une ligne' }}</span>
      <ChevronDownIcon
        class="size-5 text-gray-400"
        :class="{ 'transform rotate-180': isOpen }"
      />
    </button>
    
    <!-- Dropdown menu -->
    <div v-if="isOpen" class="absolute z-10 mt-1 w-full bg-stone-50 shadow-lg max-h-60 text-base overflow-auto border border-gray-500 dropdown-menu">
      <!-- Search input -->
      <div class="sticky top-0 px-3 py-2 bg-stone-50 border-b border-gray-700">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon class="size-4 text-gray-400" />
          </div>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            class="w-full pl-10 pr-3 py-1 bg-stone-200 border border-gray-600 rounded-md text-sm text-black"
            :placeholder="'Rechercher...'"
            @click.stop
          />
        </div>
      </div>
      
      <!-- Item list -->
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        @click="selectItem(item)"
        class="flex items-center px-3 py-2 cursor-pointer hover:bg-stone-300"
      >
        <img 
          :src="item.image" 
          :alt="item.libelle"
          class="w-8 h-8 mr-3 object-contain"
        />
        <span class="text-black">{{ item.libelle }}</span>
      </div>
      
      <!-- Empty state -->
      <div v-if="filteredItems.length === 0" class="px-3 py-4 text-center text-gray-400">
        Aucune ligne trouvée
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-dropdown {
  user-select: none;
}

.dropdown-menu {
  scrollbar-width: thin;
  scrollbar-color: #747474 #ffffff;
}
</style>
