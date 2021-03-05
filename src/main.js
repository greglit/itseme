import Vue from 'vue'
import App from './App.vue'

import { 
  LayoutPlugin,
  CardPlugin,
} from 'bootstrap-vue'

Vue.use(LayoutPlugin)
Vue.use(CardPlugin)

import { BIcon } from 'bootstrap-vue'
Vue.component('b-icon', BIcon)
import { BIconstack } from 'bootstrap-vue'
Vue.component('b-iconstack', BIconstack)
import { BIconEnvelopeFill } from 'bootstrap-vue'
Vue.component('b-icon-envelope-fill', BIconEnvelopeFill)
import { BIconCircle } from 'bootstrap-vue'
Vue.component('b-icon-circle', BIconCircle)
import { BIconGithub } from 'bootstrap-vue'
Vue.component('b-icon-github', BIconGithub)
import { BIconHeartFill } from 'bootstrap-vue'
Vue.component('b-icon-heart-fill', BIconHeartFill)
import { BIconChevronDoubleRight } from 'bootstrap-vue'
Vue.component('b-icon-chevron-double-right', BIconChevronDoubleRight)
import { BIconChevronDoubleDown } from 'bootstrap-vue'
Vue.component('b-icon-chevron-double-down', BIconChevronDoubleDown)

Vue.prototype.$parseAppId = 'jnJ1v8blNVzH58Um0ifHpO1NquRsQ2nne5ZYJjZM';
Vue.prototype.$parseAPIKey = 'iQQHiG5864NCtiwQoTET4wRRqm4hj2Wnse8NoqCp';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
