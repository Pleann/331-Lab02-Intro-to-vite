import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '@/views/StudentView.vue'
import EventDetailsView from '@/views/events/DetailView.vue'
import EventRegisterView from '@/views/events/RegisterView.vue'
import EventEditView from '@/views/events/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
    },
    {
      path: '/event/5928101',
      name: 'event-detail-view',
      component: EventDetailsView,
      props: true,
    },
    {
      path: '/event/:id/register',
      name: 'event-register-view',
      component: EventRegisterView,
      props: true,
    },
    {
      path: '/event/:id/edit',
      name: 'event-edit-view',
      component: EventEditView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView,
    },
  ],
})

export default router
