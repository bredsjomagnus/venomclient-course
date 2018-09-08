import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8081/api'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
