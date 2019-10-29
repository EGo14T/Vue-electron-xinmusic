import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'hls.js'
import '../src/assets/icon/musiclistIcon/iconfont.css'
import '../src/assets/icon/playbarbtn/iconfont.css'
import '../src/assets/icon/leftbar/iconfont.css'

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
