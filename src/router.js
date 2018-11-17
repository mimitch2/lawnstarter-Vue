import Vue from 'vue'
import Router from 'vue-router'
import Results from './views/Results.vue'
import Search from './views/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-root',
      component: Search
    },
    {
      path: '/:type/:id',
      name: 'details-root',
      component: Results
    }
  ]
})
