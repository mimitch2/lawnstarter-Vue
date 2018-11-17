import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultsLoaded: false,
    detailsLoaded: false,
    detailsListLoaded: false,
    searchResult: [],
    details: []
  },
  getters: {
    // countLinks: state => {
    //   return state.links.length
    // }
  },
  mutations: {
    SET_RESULTS: (state, result) => {
      state.searchResult = result
    },
    SET_RESULTS_LOADED: (state, bool) => {
      state.resultsLoaded = bool
      console.log(state.resultsLoaded)
    },
    SET_DETAILS: (state, result) => {
      state.filmOrChar = result
    },
    SET_DETAILS_LOADED: (state, bool) => {
      state.detailsLoaded = bool
    }
  },
  actions: {
    async fetchData (context, payload) {
      try {
        const getData = await fetch(
          `https://swapi.co/api/${payload[0]}/?search=${payload[1]}`
        )
        const result = await getData.json()
        context.commit('SET_RESULTS', result.results)
        context.commit('SET_RESULTS_LOADED', true)
      } catch (error) {
        console.log(error)
      }
    },
    async getDetails (context, payload) {
      try {
        const getData = await fetch(
          `https://swapi.co/api/${payload[0]}/${payload[1]}`
        )
        const result = await getData.json()
        context.commit('SET_DETAILS', result)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
