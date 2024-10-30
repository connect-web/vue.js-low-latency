import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Leaderboards from "@/views/Leaderboards.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresProfileCSS: false } // Home doesn't need profile.css
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresProfileCSS: true } // Other pages need profile.css
  },
  {
    path: '/leaderboards',
    name: 'leaderboards',
    component: Leaderboards,
    meta: { requiresProfileCSS: true } // Other pages need profile.css
  },
  ,
  {
    path: '/ml-leaderboards',
    name: 'ml-leaderboards',
    component: Dashboard,
    meta: { requiresProfileCSS: true } // Other pages need profile.css
  },


  // Add other routes that also need profile.css
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
