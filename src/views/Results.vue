<template>
  <div class="results-root">
         <div className="details-card">
            <div className="details-card-left">
              <p className="result-name">

              </p>
              <p className="details-title">
              details or oppening crawl
              </p>
              <div className="details-wrapper"
              >

            <ul className="details-list">
              <li className="details-list-item">
                Birth Year
              </li>
              <li className="details-list-item">
                Gender</li>
              <li className="details-list-item">
                Eye Color
              </li>
              <li className="details-list-item">
                Hair Color
              </li>
              <li className="details-list-item">
                Height
              </li>
              <li className="details-list-item">
                Mass
              </li>
            </ul>

              <div className="opening-crawl-text">
                <div>Opening crawl </div>
              </div>

              <div className="details-loading">
                <p className="loading-text">Loading...</p>
              </div>

              </div>

              <button className="back-to-search-button">
                BACK TO SEARCH
              </button>

            </div>

            <div className="details-card-right">
              <p className="details-right">
                  movies or chracters
              </p>
              <div className="right-list-container">

                  movies or char list

                 <div className="details-loading">
                   <p className="loading-text">Loading...</p>
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
    // const { type, id } = this.$route.params
    this.setResults([this.$route.params.type, this.$route.params.id])
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['searchResult', 'resultsLoaded', 'details', 'detailsLoaded']),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations(['SET_DETAILS', 'SET_DETAILS_LOADED']),
    ...mapActions(['fetchData', 'getDetails']),

    setResults: function (payload) {
      this.fetchData(payload)
    },

    fetchDetails: function (payload) {
      this.getDetails(payload)
    }
  }
}
</script>

<style scoped>
.results-root {
}
</style>
