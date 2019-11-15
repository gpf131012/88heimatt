import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout'
import Login from '../views/login'
import home from '@/views/home'
import article from '@/views/article'
import pubilish from '@/views/publish'
import comment from '@/views/comment'
import material from '@/views/material'
Vue.use(VueRouter)

const routes = [
//   {
//   path: '/',
//   redirect: '/layout'
// },
  {
    path: '/',
    // name: 'layout',
    component: layout,
    children: [
      {
        path: '',
        component: home
      }, {
        path: '/article',
        component: article
      },
      {
        path: '/publish',
        component: pubilish
      }, {
        path: '/comment',
        component: comment
      }, {
        path: '/material',
        component: material
      }

    ]
  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
