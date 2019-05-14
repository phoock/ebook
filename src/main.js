import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './assets/fonts/daysOne.css'

Vue.config.productionTip = false
//http://192.168.101.9:8080/#/ebook/Engineering|2014_Book_OpeningScience


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
