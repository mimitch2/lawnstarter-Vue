<template>
  <button
    v-bind:class="{ active: activeProp, hover: hoverProp }"
    class="basic-button"
    @click="clickMethod"
  >{{ labelStatus ? label.secondary : label.primary }}</button>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    clickMethod: Function,
    activeProp: Boolean,
    hoverProp: Boolean,
    labelStatus: Boolean,
    label: Object
  }
}
</script>

<style>
.basic-button {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  border: solid 1px #c4c4c4;
  background-color: #c4c4c4;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}
.basic-button.active {
  background: #0ab463;
  cursor: pointer;
}
.basic-button.hover:hover {
  background: #089954;
}
</style>
