<template>
  <div id="app">
    <SWHeader title="SWStarter"/>
    <router-view/>
  </div>
</template>

<script>
import SWHeader from './views/Header.vue'
export default {
  name: 'app',
  components: {
    SWHeader
  }
}
</script>

<style>
html {
  background: #ededed;
}
body {
  overflow-y: scroll;
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
