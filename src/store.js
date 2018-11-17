import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultsLoaded: false,
    detailsLoaded: false,
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
      state.details = result
    },
    SET_DETAILS_LOADED: (state, bool) => {
      state.detailsLoaded = bool
      console.log(state.detailsLoaded)
    }
  },
  actions: {
    async fetchData (context, payload) {
      console.log(payload)
      try {
        const getData = await fetch(
          `https://swapi.co/api/${payload[0]}/?search=${payload[1]}`
        )
        const result = await getData.json()
        context.commit('SET_RESULTS', result.results)
        context.commit('SET_RESULTS_LOADED', true)
        if (payload[0] === 'films' && result.length > 0) {
          context.dispatch('getDetails', result.results[0].characters)
        } else if (payload[0] === 'people' && result.length > 0) {
          context.dispatch('getDetails', result.results[0].films)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getDetails (context, array) {
      let tempArr = []
      for (let i = 0; i < array.length; i++) {
        try {
          const getData = await fetch(array[i])
          const result = await getData.json()
          tempArr.push(result)
        } catch (error) {
          console.log(error)
        }
      }
      context.commit('SET_DETAILS', tempArr)
      context.commit('SET_DETAILS_LOADED', true)
    }
  }
})
