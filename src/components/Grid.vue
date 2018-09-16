<template>
  <div>
     <div class='row'>
      <Square :color="color" v-bind:key='index' class='uk-width-1-7' v-for='(color, index) in squares' />
    </div>
     <div class='row'>
      <Square :color="color" v-bind:key='index' class='uk-width-1-7' v-for='(color, index) in squares' />
    </div>
  </div>
</template>

<script>
import Square from './Square.vue';

export default {
  name: 'Grid',
  props: {
      squares: {
          type: Array,
          default() { return [
              'red', 'blue', 'red',
              'blue', 'red', 'blue', 'blue'
          ]}
      }
  },
  components: {
    Square
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .uk-width-1-7 {
      margin: 0px;
      padding: 0px;
      width: 12%; 
  }
  .row {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding-bottom: 1px;
  }
</style>
