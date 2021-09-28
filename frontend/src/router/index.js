import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/users.vue'),
  },
  {
    path: '/gifts',
    name: 'Gifts',
    component: () => import('../views/gifts.vue'),
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: () => import('../views/user-list.vue'),
  },
  {
    path: '/mains/:id',
    name: 'UserDetail',
    component: () => import('../views/user-detail.vue'),
  },
  {
    path: '/gift-list',
    name: 'GiftList',
    component: () => import('../views/gift-list.vue'),
  },
  {
    path: '/gifts/:id',
    name: 'GiftDetails',
    component: () => import('../views/gift-detail.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
