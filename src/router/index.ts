import { createRouter, createWebHistory } from 'vue-router'
import TinyMCE from '../views/TinyMCE.vue'

// Create and export the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tiny-mce',
      name: 'tiny-mce',
      component: TinyMCE
    },
    // Additional routes can be added here
  ]
})

export default router