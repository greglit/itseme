import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Impressum from '../views/Impressum.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/impressum',
    component: Impressum
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
