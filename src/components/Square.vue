<template>
  <span v-on:click="move(tile)" class='square uk-flex uk-flex-center'>
    <div :class="{[tile.color]: tile.color, highlight: highlight}" class="circle" />
  </span>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'Square',
  props: {
      tile: { type: Object, default: null} 
  },
  methods: {
      move(tile) {
          const move = this.currentPlayer.plotMove(tile, this.grid);
          if (move) {
              this.makeMove(move);
              this.incrementRound();
          }
      },
      ...mapMutations(['makeMove', 'incrementRound'])
  },
  computed: {
      ...mapGetters(['currentPlayer']),
      ...mapState({
          grid: state => state.board
      }),
      highlight() {
          return !this.tile.taken && this.tile.legal;
      }
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
      width: 12vmax;
      height: 12vmax;
      border-radius: 100%;
  }
  .white {
      background-color: #fbeeee;
  }
  .red {
      background-color: red;
      animation-name: slideInDown;
      animation-duration: 1s;
      animation-fill-mode: both;
  }
  .blue {
      background-color: blue;
      animation-name: slideInDown;
  }
  div.highlight {
      background-color: white;
  }

  @keyframes slideInDown {
    from {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

.slideInDown {
  animation-name: slideInDown;
}
</style>
