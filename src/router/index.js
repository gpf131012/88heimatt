import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout'
import Login from '../views/login'
import home from '@/views/home'
import article from '@/views/article'
import pubilish from '@/views/publish'
import comment from '@/views/comment'
import commentDetail from '@/views/comment-detail'
import material from '@/views/material'
import NProgress from 'nprogress'
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
      },
      {
        path: '/publish/:articleId',
        component: pubilish
      },
      {
        path: '/comment',
        component: comment
      },
      {
        path: '/comment/:articleId',
        component: commentDetail,
        // 将路由参数映射到组建的props数据
        props: true
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
// 路由拦截器beforeEach方法，接收一个函数作为参数
// 参数1：to 表示要去哪里的路由信息
// 参数2：from 表示来自哪里的路由信息
// 参数3：next 是一个方法，表示路由放行

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 如果访问的是登录页面，直接放行
  if (to.path === '/login') {
    return next()
  }
  // 非登陆页面校验登录状态
  // 获取用户token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有token
  if (token) {
    next()
  } else {
    // 没有返回登录页
    next('/login')
    // 为了如果在非登陆状态下访问登录页面，手动终止进度条
    NProgress.done()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
