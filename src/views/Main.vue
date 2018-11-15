<template>
  <div class="main-root">
    <div class="content-wrapper">
      <div class="search-div">
        <div class="search-content-wrapper">
          <p class="What-are-you-searching-for">
                What are you searching for?
          </p>

          <form class="radio-group">
            <input type="radio"
                    name="type"
                    class="Ellipse"
                    defaultChecked
            />
            <label htmlFor="People" class="People">
                 People
            </label>
              <input type="radio"
                name="type"
                class="Ellipse"
              />
              <label htmlFor="Movies" class="Movies">
              Movies
              </label>
          </form>

                <input class="search-input"
                  type="text"
                  placeholder= "test"
                />
                <button class="SearchButton">
                  search or searching
                </button>
              </div>
            </div>

            <div class="results-div">
              <div class="results">
                Results
              </div>
                   <ul class="results-list">

                   </ul>
              <div class="resutls-feedback-container">
              <div class="results-feedback-message">
                <p class="results-feedback-text">
                 There are no matches.
                </p>
                <p class="results-feedback-text">
                 Use the form to search for People or Movies.
                </p>
              </div>
              <div class="resutls-feedback-message">
                <p>Searching...</p>
              </div>
              </div>
            </div>

          </div>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped>
.main-root {
}
</style>
