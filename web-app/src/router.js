import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory("/stan-webapp/"),
  routes: [
    {
      name: 'acceuil',
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      name: 'ligne-detail',
      path: '/ligne/:osmid_ligne',
      component: () => import('@/views/LigneDetailView.vue'),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router