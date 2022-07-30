import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieBrowseViewVue from '@/views/movie/MovieBrowseView.vue'
import MovieNewViewVue from '@/views/movie/MovieNewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/browse',
      name: 'movieBrowse',
      component: MovieBrowseViewVue
    },
    {
      path: '/movie/new',
      name: 'movieNew',
      component: MovieNewViewVue
    },
  ]
})

export default router
