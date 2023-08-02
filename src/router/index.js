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
      component: Contact
    },
    {
      path: '/contact/:id',
      name: 'contact.show',
      component: Contact,
      props: true
    },
    {
      path: '/contact/:id/edit',
      name: 'contact.edit',
      component: Contact,
      props: true
    }
  ]
})

export default router
