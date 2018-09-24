<template>
  <span v-on:click="move(tile)" class='square uk-flex uk-flex-center'>
    <div :class="tile.color" class="circle" />
  </span>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Square',
  props: {
      tile: { type: Object, default: null} 
  },
  methods: {
      move(tile) {
          const move = {key: tile.order, color: 'red'}; 
          this.makeMove(move);
          this.incrementRound();
      },
      ...mapMutations(['makeMove', 'incrementRound'])
  },
  computed: {
      ...mapGetters(['currentPlayer'])
  },
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
      width: 14vmax;
      height: 14vmax;
      border-radius: 100%;
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
