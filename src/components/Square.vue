<template>
  <span v-on:click="move(tile)" class='square uk-flex uk-flex-center'>
    <div
      :class="{[tile.color]: tile.color, highlight: highlight}"
      class="circle middle fall-in"
    />
    <div
      class="circle lens"
      :class="{[tile.color]: tile.color, highlight: highlight, taken: tile.taken}" 
    />

    <div
      class="circle bottom white"
    />

  </span>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Square',
  props: {
      tile: { type: Object, default: null} 
  },
  methods: {
      move(tile) {
          const move = this.currentPlayer.plotMove(tile, this.grid);
          if (move) {
              this.endRound({move, player: this.currentPlayer});
          }
      },
      ...mapActions(['endRound'])
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
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    background-color: yellow;
    height: 100%;
    min-height: 25px;
    min-width: 25px;
    height: 8vmax;
  }

  div.bottom {
      z-index: 0;
      background-color: white;
  }

  div.lens {
      z-index: 2;
      background-color: rgba(248,248,248,0.5);
  }

  div.lens.highlight, div.lens.taken {
      z-index: 2;
      background-color: rgba(255,255,255,0);
  }

  .circle {
      position: absolute;
      z-index: 1;
      width: 8vmax;
      height: 8vmax;
      border-radius: 100%;
  }

  .white {
      background-color: #fbeeee;
  }

  .red.fall-in, .blue.fall-in {
      animation-name: slideInDown;
      animation-duration: 1s;
      animation-fill-mode: both;
  }

  .red {
      background-color: red;
  }

  .blue {
      background-color: blue;
  }

  div.highlight {
      background-color: white;
  }

  @keyframes slideInDown {
    from {
      transform: translate3d(0, -100vmax, 0);
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
