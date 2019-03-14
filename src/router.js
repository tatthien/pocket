import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }

  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }

  next('/login')
}

let router = new VueRouter({
  routes: [
    { 
      path: '/',
      name: 'home',
      component: () => import('@/pages/Transactions'),
      beforeEnter: ifAuthenticated
    },
    { 
      path: '/reports', 
      name: 'report',
      component: () => import('@/pages/Reports'),
      beforeEnter: ifAuthenticated
    },
    { 
      path: '/login', 
      name: 'login',
      component: () => import('@/pages/Login'),
      beforeEnter: ifNotAuthenticated
    }
  ]
})

export default router