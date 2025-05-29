import { defineStore } from 'pinia';

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    landingPage: 'home', // Default landing page is home
  }),
  
  actions: {
    setLandingPage(page) {
      this.landingPage = page;
    }
  },
  
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'stan-preferences',
        storage: localStorage
      }
    ]
  }
});
