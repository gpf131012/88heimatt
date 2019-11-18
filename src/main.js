import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
// 第三方包的文件不需要写具体路径
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
axios.defaults.transformResponse = [function (data, headers) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    return {}
  }
}]
Vue.config.productionTip = false
Vue.use(elementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
  // 通行的规则，在请求拦截器中的config 是本次请求相关的配置对象，config就是最后发给后端的那个配置对象
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// axios响应拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
