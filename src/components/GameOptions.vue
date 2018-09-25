<template>
  <vk-grid class="game-options" divided>
     <div class="uk-width-1-4">
       <vk-icon icon="user" />
     </div>
     <vk-grid class="uk-width-1-4">
       <vk-icon icon="play-circle" /> <span>{{round}}</span>
     </vk-grid>
  </vk-grid>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'GameOptions',
  computed: {
      ...mapState({
          round: state => state.round
      }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .game-options {
        margin: 1rem;
    }
</style>
