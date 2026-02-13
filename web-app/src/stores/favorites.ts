import { defineStore } from 'pinia'
import type { Arret as ArretType, Favoris } from '@/types'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoritesLignes: [] as Favoris[]
  }),
  
  actions: {
    addFavorite(arret: ArretType) {
      if (!this.isFavorite(arret.osmid, arret.ligne.osmid)) {
        const existingLigne = this.favoritesLignes.find((favoris: Favoris) => favoris.ligne.osmid === arret.ligne.osmid);
        if (existingLigne) {
          existingLigne.arrets.push(arret);
        } else {
          this.favoritesLignes.push({
            ligne: arret.ligne,
            arrets: [arret]
          });
        }
      }
    },

    removeFavorite(arretId: string, ligneId: string) {
      this.favoritesLignes = this.favoritesLignes.map((favoris: Favoris) => {
        if (favoris.ligne.osmid === ligneId) {
          return {
            ...favoris,
            arrets: favoris.arrets.filter((arret: ArretType) => arret.osmid !== arretId)
          };
        }
        return favoris;
      }).filter((favoris: Favoris) => favoris.arrets.length > 0);
    },

    toggleFavorite(arret: ArretType) {
      if (this.isFavorite(arret.osmid, arret.ligne.osmid)) {
        this.removeFavorite(arret.osmid, arret.ligne.osmid);
        return false;
      } else {
        this.addFavorite(arret);
        return true;
      }
    },

    wipeFavorites() {
      this.favoritesLignes = [];
    }
  },
  
  getters: {
    isFavorite: (state) => (arretId: string, ligneId: string) => {
      const ligne = state.favoritesLignes.find((favoris: Favoris) => favoris.ligne.osmid === ligneId);
      if (ligne) {
        return ligne.arrets.some((arret: ArretType) => arret.osmid === arretId);
      }
      return false;
    },
    
    getFavorites: (state) => {
      return state.favoritesLignes;
    }
  },
  
    persist: {
        storage: localStorage,
        pick: ['favoritesLignes'],
    }
});
