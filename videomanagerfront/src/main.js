// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from './routes'
import Vuex from 'vuex'
import StoreData from './store'
import Notification from 'vue-notification'
import 'vuetify/dist/vuetify.min.css'

Vue.use(require('vue-moment'))
Vue.use(Vuetify)
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history'
})



Vue.use(Notification)
Vue.use(Vuex)
const store = new Vuex.Store(StoreData)

Vue.config.productionTip = false
window.eventBus = new Vue({})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  }  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem('token')) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
