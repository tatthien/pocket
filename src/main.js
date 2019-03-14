import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notification from 'vue-notification'
import axios from 'axios'

Vue.use(Notification)

import '../node_modules/ladda/dist/ladda.min.css'
import '@/assets/css/tailwind.css'

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers['x-access-token'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
