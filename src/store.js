import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultsLoaded: false,
    detailsLoaded: false,
    detailsListLoaded: false,
    searchResult: [],
    filmOrChar: [],
    films: [],
    characters: []
  },
  getters: {
    // countLinks: state => {
    //   return state.links.length
    // }
  },
  mutations: {
    REMOVE_LINK: (state, link) => {
      state.links.splice(link, 1)
    }
  },
  actions: {
    removeLink: (context, link) => {
      context.commit('REMOVE_LINK', link)
    }
  }
})
