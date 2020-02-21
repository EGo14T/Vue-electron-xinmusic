import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import vuescroll from 'vuescroll'

import 'hls.js'
import '../src/assets/icon/musiclistIcon/iconfont.css'
import '../src/assets/icon/playbarbtn/iconfont.css'
import '../src/assets/icon/leftbar/iconfont.css'
import '../src/assets/icon/comments/iconfont.css'
import './plugins/element.js'

Vue.use(VueAxios,axios);

Vue.use(vuescroll, {
  //滚动条设置
  ops: {
    vuescroll: {
      mode: "native",
      sizeStrategy: "percent",
      detectResize: true
    },
    scrollPanel: {},
    rail: {
      gutterOfEnds: "2px",
      gutterOfSide: "0px"
    },
    bar: {
      keepShow: true,
      background: "#2f3134"
    }
  },
  name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
});

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



