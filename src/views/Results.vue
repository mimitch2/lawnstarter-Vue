<template>
  <div class="results-root">
    <div class="details-card">
      <div class="details-card-left">
        <p class="result-name">{{ this.$route.params.id }}</p>
        <p class="details-title" v-if="type === 'films'">Opening Crawl</p>
        <p class="details-title" v-if="type === 'people'">Details</p>
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
          <router-link class="button-link" v-bind:to="'/'">BACK TO SEARCH</router-link>
        </button>
      </div>
      <div class="details-card-right">
        <p class="details-right" v-if="type === 'films'">Characters</p>
        <p class="details-right" v-else>Movies</p>
        <div class="right-list-container">
          <div v-on:click="resetAll">
            <router-link
              v-bind:to="`/people/${item.name}`"
              v-if="type === 'films' && detailsLoaded"
              v-for="(item, index) in details"
              v-bind:key="index"
            >{{ item.name }}{{ index !== details.length - 1 ? ', ' : ''}}</router-link>
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
button:focus {
  outline: none;
}
a {
  color: #0094ff;
  text-decoration: none;
}
.button-link {
  color: #ffffff !important;
  text-decoration: none;
}

.results-root {
  display: flex;
  justify-content: center;
  overflow-y: hidden;
}
.details-card {
  /* max-height: 417px; */
  overflow: hidden;
  transition: max-height 1s linear;
  margin-top: 80px;
  width: 804px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(132, 132, 132, 0.75);
  border: solid 1px #dadada;
  background-color: #ffffff;
  display: flex;
}
.details-card {
  max-height: 900px;
}
.details-card-left {
  width: 322px;
  margin-left: 30px;
}
.result-name {
  margin-top: 30px;
  height: 22px;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}

.details-title {
  width: 322px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: normal;
  color: #000000;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 10px;
  margin-bottom: 5px;
}
.details-wrapper {
  margin-top: 16px;
  min-height: 206px;
}
.details-list {
  list-style: none;
  padding: 0;
}
.details-list-item {
  padding: 0;
  width: 220px;
  margin-left: 0px;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
}
.opening-crawl-text {
  white-space: pre-line;
  width: 220px;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
}
.details-loading {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #c4c4c4;
}
.back-to-search-button {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff !important;
  width: 187px;
  height: 34px;
  border-radius: 17px;
  border: solid 1px #089954;
  background-color: #089954;
}
.details-card-right {
  width: 322px;
  margin-left: 100px;
  margin-right: 30px;
  width: 132px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}
.details-right {
  margin-top: 70px;
  width: 322px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 10px;
  margin-bottom: 5px;
}
.right-list-container {
  margin-top: 16px;
  width: 322px;
  font-size: 14px;
  font-weight: normal;
  color: #0094ff;
}
.details-loading {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #c4c4c4;
}

@media screen and (max-width: 960px) {
  .details-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 422px;
    margin-bottom: 30px;
  }
  .details-card-left {
    margin-left: 0px;
  }
  .details-card-right {
    margin-left: -160px;
    margin-top: -60px;
    margin-bottom: 30px;
  }
}
</style>
