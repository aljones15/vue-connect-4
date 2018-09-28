<template>
  <vk-grid class="game-options" divided>
     <div class="uk-width-1-5">
         <vk-icon
           v-on:click="swapPlayers"
           class='glow'
           icon='users'
         />
         <span class='bump-right'>
           <PlayerAvatar
             :player='player'
             v-bind:key="player.color"
             v-for='player in players'
           />
         </span>       
     </div>
     <div class="uk-width-1-5">
       <vk-icon icon="play-circle" /> <span class='bump-right'>{{round}}</span>
     </div>
     <div class="uk-width-1-5">
       <vk-icon icon="bolt" />
       <span class='bump-right'>Wins {{winners.length}}</span>
     </div>
     <div class="uk-width-1-5">
       <vk-icon icon="refresh" v-on:click="reset" />
     </div>
  </vk-grid>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import PlayerAvatar from './PlayerAvatar.vue';
import Player from '../models/Player';
import playerTypes from '../constants/playerTypes';

export default {
  name: 'GameOptions',
  computed: {
      ...mapState({
          round: state => state.round,
          players: state => state.players,
          winners: state => state.winners,
      }),
  },
  methods: {
      swapPlayers() {
          const [one, two] = this.players;
          if (two.type === playerTypes.AI) {
              const newP = new Player(playerTypes.HUMAN);
              return this.selectPlayer([one, newP]);
          }
          const newP = new Player(playerTypes.AI);
          return this.selectPlayer([one, newP]);
      },
      ...mapMutations(['selectPlayer', 'reset'])
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
    .bump-right {
        margin-left: 1rem;
    }
    .glow {
        box-shadow: 0px 0px 0px 1px black;
    }
    span {
        vertical-align: bottom;
    }
  @media only screen 
  and (min-device-width: 0px) 
  and (max-device-width: 480px) {
        .uk-width-1-5 > span {
            display: block;
            width: 100%;
            margin-left: 0px;
            box-shadow: 0px 0px 0px 0px black;
        }
  }

  @media only screen 
  and (min-device-width: 480px) 
  and (max-device-width: 800px) {
        .uk-width-1-5 > span {
            display: block;
            width: 100%;
            margin-left: 0px;
        }
  }

</style>
