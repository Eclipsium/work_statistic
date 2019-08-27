import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/reg',
      name: 'Reg',
      component: () => import(/* webpackChunkName: "about" */ './views/Registration.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import(/* webpackChunkName: "about" */ './views/Config.vue')
    },
    {
      path: '/graphic',
      name: 'Graphic',
      component: () => import(/* webpackChunkName: "about" */ './views/Graphic.vue')
    },
     {
       path: '*',
       component: () => import(/* webpackChunkName: "about" */ './views/NotFound404.vue')}

  ]
})
