<template>
  <div class="results-root">
    <div class="details-card">
      <div class="details-card-left">
        <p class="result-name">{{ this.$route.params.id }}</p>
        <p class="details-title" v-if="type === 'films'">OPENING CRAWL</p>
        <p class="details-title" v-if="type === 'people'">DETAILS</p>
        <div class="details-wrapper">
          <ul class="details-list" v-if="type === 'people' && resultsLoaded">
            <li class="details-list-item">Birth Year: {{ searchResult[0].birth_year }}</li>
            <li class="details-list-item">Gender: {{ searchResult[0].gender }}</li>
            <li class="details-list-item">Eye Color: {{ searchResult[0].eye_color }}</li>
            <li class="details-list-item">Hair Color: {{ searchResult[0].hair_color }}</li>
            <li class="details-list-item">Height: {{ searchResult[0].height }}</li>
            <li class="details-list-item">Mass: {{ searchResult[0].mass}}</li>
          </ul>
          <div class="opening-crawl-text" v-if="type === 'films' && resultsLoaded">
            <div>{{ searchResult[0].opening_crawl }}</div>
          </div>
          <div class="details-loading" v-else-if="!resultsLoaded">
            <p class="loading-text">Loading...</p>
          </div>
        </div>
        <button class="back-to-search-button">
          <router-link v-bind:to="'/'">BACK TO SEARCH</router-link>
        </button>
      </div>
      <div class="details-card-right">
        <p class="details-right" v-if="type === 'films'">CHARACTERS</p>
        <p class="details-right" v-else>MOVIES</p>
        <div class="right-list-container">
          <div v-on:click="resetAll">
            <router-link
              v-bind:to="`/people/${item.name}`"
              v-if="type === 'films' && detailsLoaded"
              v-for="(item, index) in details"
              v-bind:key="index"
            >{{ item.name }},&nbsp;</router-link>
          </div>
          <div v-on:click="resetAll">
            <router-link
              v-bind:to="`/films/${item.title}`"
              v-if="type === 'people' && detailsLoaded"
              v-for="(item, index) in details"
              v-bind:key="index"
            >{{ item.title }},&nbsp;</router-link>
          </div>
          <div class="details-loading" v-if="!detailsLoaded">
            <p class="loading-text">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'results',
  beforeMount () {
    this.resetAll()
  },
  data () {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapState(['searchResult', 'resultsLoaded', 'details', 'detailsLoaded']),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations([
      'SET_DETAILS',
      'SET_DETAILS_LOADED',
      'SET_RESULTS',
      'SET_RESULTS_LOADED'
    ]),
    ...mapActions(['fetchData', 'getDetails']),

    setResults: function (payload) {
      this.fetchData(payload)
    },
    fetchDetails: function (payload) {
      this.getDetails(payload)
    },
    clearDetails: function () {
      this.SET_DETAILS([])
      this.setDetailsLoaded(false)
    },
    clearResults: function () {
      this.SET_RESULTS([])
      this.setResultsLoaded(false)
    },
    setDetailsLoaded: function (bool) {
      this.SET_DETAILS_LOADED(bool)
    },
    setResultsLoaded: function (bool) {
      this.SET_RESULTS_LOADED(bool)
    },
    resetAll: function () {
      console.log('here')
      const { type, id } = this.$route.params
      this.type = type
      this.id = id
      this.clearDetails()
      this.clearResults()
      this.setResults([type, id])
    }
  }
}
</script>

<style scoped>
.results-root {
}
</style>
