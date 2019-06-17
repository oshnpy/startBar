// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import head from "./components/Header"
import "./utils/flexible"
import "./utils/common.scss"
import "./font/iconfont.css"
import {DatePicker,TimePicker} from "element-ui"

Vue.config.productionTip = false
Vue.component("el-header",head)
Vue.component("el-timer",DatePicker)
Vue.component("el-picker",TimePicker)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
