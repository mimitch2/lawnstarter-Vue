<template>
  <transition name="fade">
    <div class="search-root" v-show="show">
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
                :placeholder="this.type === 'people' ? 'e.g. Chewbacca, Yoda, Boba Fett' : 'e.g. A New Hope, Phantom Menace'"
                v-model="searchInput"
              >
              <div class="button-wrapper">
                <BasicButton
                  v-bind:clickMethod="setResults"
                  v-bind:activeProp="searchInput.length > 0"
                  v-bind:labelStatus="searchStatus"
                  v-bind:label="{primary: 'SEARCH', secondary: 'SEARCHING...'}"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="results-div">
          <div class="results">Results</div>
          <ul class="results-list">
            <!-- ****************************** -->
            <transition-group name="list-fade" tag="li">
              <li
                class="result-item"
                v-if="type === 'films'"
                v-for="(item, index) in searchResult"
                v-bind:key="index"
              >
                {{ item.title }}
                <div class="detail-button-wrapper">
                  <BasicButton
                    v-bind:clickMethod="() => clickRoute(`/films/${item.title}`)"
                    v-bind:activeProp="true"
                    v-bind:hoverProp="true"
                    v-bind:labelStatus="true"
                    v-bind:label="{ secondary: 'SEE DETALS' }"
                  />
                </div>
              </li>
            </transition-group>
            <!-- ****************************** -->
            <transition-group name="list-fade" tag="li">
              <li
                class="result-item"
                v-if="type === 'people'"
                v-for="(item, index) in searchResult"
                v-bind:key="index"
              >
                {{ item.name }}
                <div class="detail-button-wrapper">
                  <BasicButton
                    v-bind:clickMethod="() => clickRoute(`/people/${item.name}`)"
                    v-bind:activeProp="true"
                    v-bind:hoverProp="true"
                    v-bind:labelStatus="true"
                    v-bind:label="{ secondary: 'SEE DETALS' }"
                  />
                </div>
              </li>
            </transition-group>
          </ul>
          <!-- ****************************** -->
          <div class="resutls-feedback-container">
            <div class="results-feedback-message" v-if="searchResult.length === 0 && !searchStatus">
              <p class="results-feedback-text">There are no matches.</p>
              <p class="results-feedback-text">Use the form to search for People or Movies.</p>
            </div>
            <div class="resutls-feedback-message" v-if="searchStatus">
              <p>Searching...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BasicButton from './Button.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'search',
  components: {
    BasicButton
  },
  beforeMount () {
    this.show = true
    this.clearResults()
  },
  beforeDestroy () {
    this.show = true
  },
  data () {
    return {
      show: false,
      searchInput: '',
      type: 'people',
      placeholder:
        this.type === 'people' ? 'e.g Chewbaca,...' : 'e.g. A New Hope...',
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
    },
    searchInput () {
      if (!this.searchInput) {
        this.SET_RESULTS([])
        this.SET_RESULTS_LOADED(false)
      }
    },
    type () {
      this.SET_RESULTS([])
      this.SET_RESULTS_LOADED(false)
    }
  },
  methods: {
    ...mapMutations(['SET_RESULTS', 'SET_RESULTS_LOADED']),
    ...mapActions(['fetchData']),
    setResults: function () {
      if (this.searchInput) {
        this.SET_RESULTS([])
        this.SET_RESULTS_LOADED(false)
        this.fetchData([this.type, this.searchInput])
        this.searchStatus = true
      }
    },
    clearResults: function () {
      this.SET_RESULTS([])
      this.SET_RESULTS_LOADED(false)
    },
    clickRoute: function (url) {
      console.log(url)
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.list-fade-enter-active {
  transform: translateX(0px);
  transition: all 0.5s;
}
.fade-enter,
.list-fade-enter,
.fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
.search-root {
  margin-top: 80px;
}
input[type='radio'] {
  color: #0094ff;
  width: 16px;
  height: 16px;
}
input::placeholder {
  color: #c4c4c4;
}
a {
  color: #ffffff;
  text-decoration: none;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
.content-wrapper {
  display: flex;
  justify-content: center;
}
.search-div {
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(132, 132, 132, 0.75);
  border: solid 1px #dadada;
  background-color: #ffffff;
  width: 410px;
  height: 230px;
}
.search-content-wrapper {
  margin-left: 30px;
}
.What-are-you-searching-for {
  margin-top: 30px;
  font-size: 14px;
  font-weight: 600;
  color: #383838;
}
.radio-group {
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  display: flex;
  align-items: center;
}
.People {
  margin-right: 26px;
}
.People,
.Movies {
  width: 51px;
  height: 18px;
  margin-left: 6px;
}
.search-input {
  margin-top: 20px;
  padding-left: 10px;
  box-sizing: border-box;
  width: 350px;
  height: 40px;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px 0 rgba(132, 132, 132, 0.75);
  border: solid 1px #c4c4c4;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  color: #383838;
}
.button-wrapper {
  width: 350px;
  height: 34px;
  margin-top: 24px;
}
.SearchButton {
  margin-top: 24px;
  width: 350px;
  height: 34px;
  border-radius: 20px;
  border: solid 1px #c4c4c4;
  background-color: #c4c4c4;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}

.SearchButton.active {
  background-color: #0ab463;
  cursor: pointer;
}
.results-div {
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(132, 132, 132, 0.75);
  border: solid 1px #dadada;
  background-color: #ffffff;
  width: 582px;
  height: 582px;
  margin-left: 30px;
}
.results {
  width: 522px;
  height: 32px;
  margin-left: 30px;
  padding-top: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  border-bottom: 1px solid #c4c4c4;
}

.results-list {
  list-style: none;
  margin-top: 0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  width: 522px;
  margin-left: -10px;
  border-bottom: 1px solid #c4c4c4;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.detail-button {
  z-index: 100;
  width: 134px;
  height: 34px;
  border-radius: 17px;
  background-color: #0ab463;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}

.detail-button-wrapper {
  width: 134px;
  height: 34px;
}
.detail-button:hover {
  background: #089954;
  cursor: pointer;
}
.resutls-feedback-container {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 212px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #c4c4c4;
}
@media screen and (max-width: 1024px) {
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .search-div {
    margin-left: -142px;
    margin-bottom: 30px;
  }
  .results-div {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 720px) {
  .results-div {
    width: 410px;
    overflow-x: hidden;
    margin-left: 0px;
  }
  .results {
    width: 350px;
  }
  .result-item {
    width: 350px;
  }
  .results-feedback-container {
    width: 410px;
    overflow-x: hidden;
    margin-left: 0px;
  }
  .search-div {
    margin-left: 0px;
  }
}
</style>
