// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Tracker from "@/components/Tracker.vue"

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/tracker',
        name: 'Tracker',
        component: Tracker, 
      }
      // path: '/certificates',
      // name: 'Certificates',
      // component: CertificatesIndex,
      // meta: { requiresAuth: true, accessibility: ['client.use'] },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
