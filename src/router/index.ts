import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/404View.vue'
import Details from '../components/productLists/Details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/product/:id',
      name: 'details',
      component: Details
    },

    {
      path: '/*',
      name: '404',
      component: ErrorView
    }
  ]
})

export default router
