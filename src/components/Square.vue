<template>
  <span class='square uk-flex uk-flex-center'>
    <div :class="color" class="circle" />
  </span>
</template>

<script>

export default {
  name: 'Square',
  props: { color: { type: String, default: 'white' } }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .square {
    flex-grow: 1;
    flex-shrink: 1;
    background-color: yellow;
    height: 100%;
    min-height: 25px;
    min-width: 25px;
  }
  .circle {
      width: 64px;
      height: 64px;
      border-radius: 100%;
      background-color: white;
  }
  .white {
      background-color: white;
  }
  .red {
      background-color: red;
  }
  .blue {
      background-color: blue;
  }
</style>
