// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Http from './utils/http'
import api from './utils/api'
import './utils/filter'
import './utils/extend'
import FastClick from 'fastclick'
import Mint from 'mint-ui'
import MyToast from './plugin/toast/toast'
// import MyLoading from './plugin/loading/loading'
import { Indicator } from 'mint-ui';
import './assets/css/reset.css'
import 'mint-ui/lib/style.css'
import './assets/css/mint-ui@2dpr.css'
// import 'font-awesome/css/font-awesome.min.css'
import 'lib-flexible/flexible.js'
// import './assets/js/resizeIpad'
import NP from 'number-precision'

// import VConsole from 'vconsole'
// var vConsole = new VConsole()

Vue.config.productionTip = false

Vue.use(Mint)
Vue.use(MyToast)
// Vue.use(MyLoading)
Vue.prototype.$myLoading = Indicator

var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", null, options);
} catch(err) {}

Vue.prototype.$passiveSupported = passiveSupported;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    FastClick.prototype.focus = function(targetElement) {
      let length
      if (isiOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length
        targetElement.focus()
        targetElement.setSelectionRange(length, length)
      } else {
        targetElement.focus()
      }
    }
  }, passiveSupported ? { passive: true } : false)
}

Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}

Vue.prototype.$http = new Http(store, api);
Vue.prototype.API = api;
Vue.prototype.NP = NP;

store.dispatch('get_common_data',router)
store.dispatch('get_user_data',router)
store.dispatch('get_common_positioning',router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
