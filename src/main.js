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
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
