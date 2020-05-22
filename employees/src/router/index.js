import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Employess from '../components/admin/employees/List.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employess
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
