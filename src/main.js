import Vue from 'vue'
import App from './render/App.vue'
import router from './render/router'
import store from './render/store/store'

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

import {getDataName} from './render/utils/utils'

import vuescroll from 'vuescroll'

import VueCropper from 'vue-xincropper'

import 'hls.js'

import './render/plugins/element.js'

import './render/assets/iconfont/icon.css'



import axiosplugin from './render/api/AxiosPlugin'

Vue.prototype.getDataName = getDataName;


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
})
.use(axiosplugin)
.use(contentmenu)
.use(VueCropper);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



