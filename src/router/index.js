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
      path: '/create',
      name: 'contact.create',
      component: Contact
    },
    {
      path: '/:id',
      name: 'contact.edit',
      component: Contact
    }
  ]
})

export default router
