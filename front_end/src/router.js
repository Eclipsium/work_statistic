import Vue from 'vue'
import Router from 'vue-router'
import store from "./store";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'График нагрузки. Главная страница' },
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/reg',
      name: 'Reg',
      meta: { title: 'Регистрация нового пользователя' },
      beforeEnter: (to, from, next) => {
        if (!store.getters.getAuth) {
          next()
        } else {
          next('/dashboard')
        }
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Registration.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: 'Войти в кабинет' },
      beforeEnter: (to, from, next) => {
        if (!store.getters.getAuth) {
          next()
        } else {
          next('/dashboard')
        }
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: { title: 'Сумарная статистика' },
      beforeEnter: (to, from, next) => {
        if (store.getters.getAuth) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    },
    {
      path: '/config',
      name: 'Config',
      meta: { title: 'Настройки пользователя' },
      beforeEnter: (to, from, next) => {
        if (store.getters.getAuth) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Config.vue')
    },
    {
      path: '/graphic',
      name: 'Graphic',
      meta: { title: 'График нагрузки' },
      beforeEnter: (to, from, next) => {
        if (store.getters.getAuth) {
          next()
        } else {
          next('/login')
        }
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Graphic.vue')
    },
    {
      path: '/404PageNotFound',
      name: 'NotFound',
      meta: { title: 'Страница не найдена!' },
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound404.vue')
    },
    {
      path: '*',
      redirect: '/404PageNotFound',
    }
  ],
})

