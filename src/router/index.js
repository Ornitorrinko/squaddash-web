import Vue from 'vue'
import Router from 'vue-router'
import localstorage from '../utils/localstorage'
import axios from 'axios'
import routes from './routes'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (localstorage.get('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localstorage.get('token')}`
    next()
  } else {
    if (to.path !== '/login') {
      next({ path: '/login' })
    }
    next()
  }
})
export default router
