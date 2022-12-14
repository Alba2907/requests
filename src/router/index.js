import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    // добавляем динамический айди чтобы открывать именно ту заявку по которой кликнули
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/Request.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})


// хук до загрузки для определения защищенных авторизацией роутов
router.beforeEach((to, from, next) => {

  const requiredAuth = to.meta.auth


// если у странцы есть мета ауф И геттер исауф ТРУ, то
  if(requiredAuth && store.getters["auth/isAuthenticated"]) {
    next()
  } else if(requiredAuth && !store.getters["auth/isAuthenticated"]) {
    next('/auth?message=auth')
  } else  {
    next()
  }

})

export default router
