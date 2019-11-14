import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
Vue.config.productionTip = false
Vue.use(elementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
