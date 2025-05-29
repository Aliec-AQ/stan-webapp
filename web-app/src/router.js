import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: to => {
      const landingPage = JSON.parse(localStorage.getItem('stan-preferences'));
      if (!landingPage || !landingPage.landingPage) {
        return '/home';
      }
      return `/${landingPage.landingPage}`;
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('./views/FavoritesView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./views/SettingsView.vue')
  },
  {
    path: '/ligne/:ligneId',
    name: 'LigneDetail',
    component: () => import('./views/LigneDetailView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;