import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Profile from '../views/profile.vue'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '*',
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
        path: '/users/:id',
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
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        },
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/login')
          return next()
        },
      },
      {
        path: '/manage-profile',
        name: 'ManageProfile',
        component: () => import('../views/manage-profile.vue'),
      },
      {
        path: '/browse-gift',
        name: 'BrowseGift',
        component: () => import('../views/browse-gift.vue'),
      },
    ],
  })
}
