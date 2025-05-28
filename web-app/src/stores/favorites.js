import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteArrets: []
  }),
  
  actions: {
    addFavorite(arret) {
      if (!this.isFavorite(arret.osmid)) {
        this.favoriteArrets.push({
          ...arret,
          addedAt: new Date()
        });
      }
    },
    
    removeFavorite(arretId) {
      this.favoriteArrets = this.favoriteArrets.filter(arret => arret.osmid !== arretId);
    },
    
    toggleFavorite(arret) {
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
    isFavorite: (state) => (arretId) => {
      return state.favoriteArrets.some(arret => arret.osmid === arretId);
    },
    
    getFavorites: (state) => {
      return state.favoriteArrets;
    }
  },
  
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['favoriteArrets'] }
    ]
  }
});
