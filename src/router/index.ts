import { createRouter, createWebHistory } from 'vue-router'
import MovieBrowseViewVue from '@/views/movie/MovieBrowseView.vue'
import MovieNewViewVue from '@/views/movie/MovieNewView.vue'
import LoginViewVue from '@/views/user/LoginView.vue'
import RegistrationView from '@/views/user/RegistrationView.vue'
import ListView from '@/views/user/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieBrowseViewVue
    },
    {
      path: '/movie/new',
      name: 'movieNew',
      component: MovieNewViewVue
    },
    {
      path: '/user/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/user/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/user/list',
      name: 'list',
      component: ListView
    },
  ]
})

router.beforeEach((to, from, next) => {
  localStorage.setItem('route', to.name);
  next();
});
export default router
