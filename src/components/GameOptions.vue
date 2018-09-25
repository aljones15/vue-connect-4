<template>
  <vk-grid class="game-options" divided>
     <div class="uk-width-1-5">
         <PlayerAvatar :type='player.type' v-for='player in players' />         
     </div>
     <div class="uk-width-1-5">
       <vk-icon icon="play-circle" class='float-left' /> <span class='float-right'>{{round}}</span>
     </div>
     <div class="uk-width-1-5">
       <vk-icon icon="bolt" class='float-left' /> <span class='float-right'>Wins</span>
     </div>
  </vk-grid>
</template>

<script>
import { mapState } from 'vuex';
import PlayerAvatar from './PlayerAvatar.vue';

export default {
  name: 'GameOptions',
  computed: {
      ...mapState({
          round: state => state.round,
          players: state => state.players,
      }),
  },
  components: {
      PlayerAvatar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .game-options {
        margin: 1rem;
    }
    .float-left {
        float: left;
    }
    .float-right {
        float: right;
    }
</style>
