import Vue from 'vue'
import App from './App.vue'
// import "normalize.css";
import router from './router'
import store from './store'

import './styles/index.less'

// plugins
// import '@/plugins/mand'
import '@/plugins/vant'
import '@/plugins/animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
