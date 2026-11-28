import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExerciceView from '../views/ExerciceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/exercice',
      name: 'exercice',
      component: ExerciceView,
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: () => import('../views/MentionsLegalesView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, top: 70 }
    }
    return { top: 0 }
  },
})

export default router