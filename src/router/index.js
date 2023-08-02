import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/contact/create',
      name: 'contact.create',
      component: () => import('@/views/Contact.vue')
    },
    {
      path: '/contact/:id',
      name: 'contact.show',
      component: () => import('@/views/ContactShow.vue'),
      props: true
    },
    {
      path: '/contact/:id/edit',
      name: 'contact.edit',
      component: () => import('@/views/Contact.vue'),
      props: true
    }
  ]
})

export default router
