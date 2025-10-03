import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory("/stan-webapp/"),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: () => {
        const preferences = localStorage.getItem('preferences');

        if (!preferences) {
          localStorage.setItem('preferences', JSON.stringify({ home: 'accueil', language: 'fr' }));
        }

        const savedPreferences = JSON.parse(preferences ?? '{"home":"accueil","language":"fr"}');
        const savedHome = savedPreferences && savedPreferences.home ? savedPreferences.home : null;

        return { name: savedHome || 'accueil' };
      }
    },
    {
      name: 'accueil',
      path: '/home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      name: 'ligne-detail',
      path: '/ligne/:osmid_ligne',
      component: () => import('@/views/LigneDetailView.vue'),
    },
    {
      name: 'favorites',
      path: '/favorites',
      component: () => import('@/views/FavoritesView.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('@/views/SettingsView.vue'),
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _, next) => {
  const query = to.query
  if(query && query.vrrp) {
    const vrrp = query.vrrp

    const vrrpPath = Array.isArray(vrrp) ? vrrp[0] : vrrp;
    if (typeof vrrpPath === 'string') {
      const matchedRoute = router.resolve(vrrpPath);
      if (matchedRoute && matchedRoute.matched.length > 0) {
        to.query = {};
        router.push(vrrpPath);
        return;
      }
    }
  }
  next()
});

router.beforeEach((to, _, next) => {
  if (to.matched.length === 0) {
    next({ name: 'accueil' })
  } else {
    next()
  }
})

export default router