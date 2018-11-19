<template>
  <transition name="fade">
    <div class="results-root" v-show="show">
      <div class="details-card" id="details" v-bind:class="{ grow: type === 'films'}">
        <div class="details-card-left">
          <p class="result-name">{{ this.$route.params.id }}</p>
          <p class="details-title">{{ type === 'films' ? 'Opening Crawl' : 'Details'}}</p>
          <div class="details-wrapper">
            <!-- <transition name="details-fade"> -->
            <ul class="details-list" v-if="type === 'people' && resultsLoaded">
              <li class="details-list-item">Birth Year: {{ searchResult[0].birth_year }}</li>
              <li class="details-list-item">Gender: {{ searchResult[0].gender }}</li>
              <li class="details-list-item">Eye Color: {{ searchResult[0].eye_color }}</li>
              <li class="details-list-item">Hair Color: {{ searchResult[0].hair_color }}</li>
              <li class="details-list-item">Height: {{ searchResult[0].height }}</li>
              <li class="details-list-item">Mass: {{ searchResult[0].mass}}</li>
            </ul>
            <!-- </transition> -->
            <!-- <transition name="details-fade"> -->
            <div class="opening-crawl-text" v-if="type === 'films' && resultsLoaded">
              <div>{{ searchResult[0].opening_crawl }}</div>
            </div>
            <!-- </transition> -->
            <div class="details-loading" v-if="!resultsLoaded">
              <p class="loading-text">Loading...</p>
            </div>
          </div>
          <div class="back-button-wrapper">
            <BasicButton
              v-bind:clickMethod="() => clickRoute('/')"
              v-bind:activeProp="true"
              v-bind:hoverProp="true"
              v-bind:labelStatus="true"
              v-bind:label="{ secondary: 'BACK TO SEARCH' }"
            />
          </div>
        </div>
        <div class="details-card-right">
          <p class="details-right" v-if="type === 'films'">Characters</p>
          <p class="details-right" v-else>Movies</p>
          <div class="right-list-container">
            <div v-on:click="resetAll">
              <transition-group name="details-fade">
                <router-link
                  v-if="detailsLoaded"
                  v-bind:to=" type === 'films' ? `/people/${item.name}` : `/films/${item.title}`"
                  v-for="(item, index) in details"
                  v-bind:key="index"
                >{{ type === 'films' ? item.name : item.title }}{{ index !== details.length - 1 ? ', ' : ''}}</router-link>
              </transition-group>
            </div>
            <div class="details-loading-right" v-if="!detailsLoaded">
              <p class="loading-text">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BasicButton from './Button.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'results',
  components: {
    BasicButton
  },
  beforeMount () {
    this.resetAll()
    this.show = true
  },
  beforeDestroy () {
    this.show = true
  },
  data () {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      show: false
    }
  },
  computed: {
    ...mapState(['searchResult', 'resultsLoaded', 'details', 'detailsLoaded'])
  },
  watch: {
    $route: function (to, from) {
      this.resetAll()
    }
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
    },
    clickRoute: function (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.details-fade-enter-active {
  opacity: 1;
  transition: all 0.5s;
}
.details-fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transform: translateX(0px);
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
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
  max-height: 417px;
  overflow: hidden;
  transition: max-height 0.5s linear;
  margin-top: 80px;
  width: 804px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(132, 132, 132, 0.75);
  border: solid 1px #dadada;
  background-color: #ffffff;
  display: flex;
}
.details-card.grow {
  max-height: 900px;
  transition: max-height 0.5s linear;
}
.details-card-left {
  min-height: 206px;
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
  height: 206px;
  list-style: none;
  padding: 0;
  margin: 0px;
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
  min-height: 206px;
  white-space: pre;
  width: 220px;
  font-size: 14px;
  font-weight: normal;
  color: #000000;
}
.details-loading {
  padding: 0;
  margin: 0px;
  height: 206px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #c4c4c4;
}
.back-button-wrapper {
  width: 187px;
  height: 34px;
  margin-top: 30px;
  margin-bottom: 30px;
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
  min-height: 206px;
  margin-top: 16px;
  width: 322px;
  font-size: 14px;
  font-weight: normal;
  color: #0094ff;
}
.details-loading-right {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #c4c4c4;
}

@media screen and (max-width: 960px) {
  .details-card {
    max-height: 900px;
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
    /* margin-top: -60px; */
    margin-bottom: 30px;
  }
  .back-button-wrapper {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
