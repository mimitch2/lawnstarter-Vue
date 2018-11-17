<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './views/Header.vue'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
html {
  background: #ededed;
}
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  overflow-x: hidden;
}
</style>
