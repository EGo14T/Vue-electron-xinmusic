import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'hls.js'
import '../src/assets/icon/musiclistIcon/iconfont.css'
import '../src/assets/icon/playbarbtn/iconfont.css'
import '../src/assets/icon/leftbar/iconfont.css'
import './plugins/element.js'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.use(VueAxios,axios);
