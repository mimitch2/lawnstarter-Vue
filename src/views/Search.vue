<template>
  <div class="search-root">
    <div class="content-wrapper">
      <div class="search-div">
        <div class="search-content-wrapper">
          <p class="What-are-you-searching-for">What are you searching for?</p>
          <form class="radio-group">
            <input
              type="radio"
              name="type"
              value="people"
              class="Ellipse"
              defaultChecked
              v-model="type"
            >
            <label for="People" class="People">People</label>
            <input type="radio" name="type" class="Ellipse" value="films" v-model="type">
            <label for="Movies" class="Movies">Movies</label>
          </form>
          <form @submit.prevent="setResults">
            <input
              class="search-input"
              type="text"
              :placeholder="placeholder"
              v-model="searchInput"
            >
            <button class="SearchButton" v-on:click="setResults" v-if="searchStatus">SEARCHING</button>
            <button class="SearchButton" v-on:click="setResults" v-if="!searchStatus">SEARCH</button>
          </form>
        </div>
      </div>
      <div class="results-div">
        <div class="results">Results</div>
        <ul class="results-list">
          <li
            v-if="type === 'films' && resultsLoaded"
            v-for="(item, index) in searchResult"
            v-bind:key="index"
          >
            {{ item.title }}
            <button v-on:click="setResultsLoaded(false)">
              <router-link v-bind:to="`/films/${item.title}`">DETAILS</router-link>
            </button>
          </li>
          <li v-if="type === 'people'" v-for="(item, index) in searchResult" v-bind:key="index">
            {{ item.name }}
            <button v-on:click="setResultsLoaded(false)">
              <router-link v-bind:to="`/people/${item.name}`">DETAILS</router-link>
            </button>
          </li>
        </ul>
        <div class="resutls-feedback-container">
          <div class="results-feedback-message">
            <p
              class="results-feedback-text"
              v-if="searchResult.length === 0 && resultsLoaded && !searchStatus"
            >There are no matches.</p>
            <p
              class="results-feedback-text"
              v-if="!resultsLoaded && !searchStatus"
            >Use the form to search for People or Movies.</p>
          </div>
          <div class="resutls-feedback-message" v-if="searchStatus">
            <p>Searching...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'search',
  beforeMount () {
    this.clearResults()
    this.setResultsLoaded(false)
  },
  data () {
    return {
      searchInput: '',
      type: 'people',
      placeholder: 'e.g Chewbaca,...',
      searchStatus: false
    }
  },
  computed: {
    ...mapState(['searchResult', 'resultsLoaded']),
    ...mapGetters([])
  },

  watch: {
    resultsLoaded () {
      if (this.resultsLoaded) {
        this.searchStatus = false
      }
    }
  },
  methods: {
    ...mapMutations(['SET_RESULTS', 'SET_RESULTS_LOADED']),
    ...mapActions(['fetchData']),
    setResults: function () {
      this.SET_RESULTS([])
      this.SET_RESULTS_LOADED(false)
      this.fetchData([this.type, this.searchInput])
      this.searchStatus = true
    },
    clearResults: function () {
      this.SET_RESULTS([])
    },
    setResultsLoaded: function (bool) {
      this.SET_RESULTS_LOADED(bool)
    }
  }
}
</script>

<style scoped>
.search-root {
}
</style>
