import { defineStore } from 'pinia'
import type { Arret as ArretType } from '@/types'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteArrets: [] as ArretType[]
  }),
  
  actions: {
    addFavorite(arret: ArretType) {
      if (!this.isFavorite(arret.osmid)) {
        this.favoriteArrets.push({
          ...arret
        });
      }
    },

    removeFavorite(arretId: string) {
      this.favoriteArrets = this.favoriteArrets.filter((arret: ArretType) => arret.osmid !== arretId);
    },

    toggleFavorite(arret: ArretType) {
      if (this.isFavorite(arret.osmid)) {
        this.removeFavorite(arret.osmid);
        return false;
      } else {
        this.addFavorite(arret);
        return true;
      }
    }
  },
  
  getters: {
    isFavorite: (state) => (arretId: string) => {
      return state.favoriteArrets.some((arret: ArretType) => arret.osmid === arretId);
    },
    
    getFavorites: (state) => {
      return state.favoriteArrets;
    }
  },
  
    persist: {
        storage: localStorage,
        pick: ['favoriteArrets'],
    }
});
