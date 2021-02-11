import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//following imports moved to App.vue style section
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Parse from 'parse'
Vue.prototype.$parseAppId = 'jnJ1v8blNVzH58Um0ifHpO1NquRsQ2nne5ZYJjZM';
Vue.prototype.$parseJsKey = '87uBadGLwY3klaO8mt0PhBOiSP9QLg0GGRgOEQoY';
Vue.prototype.$parseServerURL = 'parseapi.back4app.com';
Parse.initialize(Vue.prototype.$parseAppId, Vue.prototype.$parseJsKey);
Parse.serverURL = 'https://' + Vue.prototype.$parseServerURL
Vue.prototype.$Parse = Parse 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
