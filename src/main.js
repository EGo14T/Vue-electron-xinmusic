import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'


import {getRequest ,postRequest, oauthRequest} from './api/api'
import {getDataName} from './utils/utils'

import vuescroll from 'vuescroll'

import 'hls.js'

import './plugins/element.js'

import './assets/iconfont/icon.css'

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.oauthRequest = oauthRequest;

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
});

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



