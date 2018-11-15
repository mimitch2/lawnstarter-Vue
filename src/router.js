import Vue from 'vue'
import Router from 'vue-router'
import Results from './views/Results.vue'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-root',
      component: Main
    },
    {
      path: '/:type/:id',
      name: 'details-root',
      component: Results
    }
  ]
})
