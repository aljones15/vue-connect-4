<template>
    <span v-bind:class="{ active: isActive }" class='spacey' v-if="human" >
      <vk-icon icon="user" />
      <span>{{wins}}</span>
    </span>
    <span v-bind:class="{ active: isActive}" class='spacey' v-else> 
      <RobotIcon />
      <span>{{wins}}</span>
    </span>
</template>

<script>
import RobotIcon from './RobotIcon.vue';
import playerTypes from '../constants/playerTypes';
import { mapGetters, mapState} from 'vuex';

export default {
  name: 'PlayerAvatar',
  props: ['player'],
  computed: {
      human() {
          if (!this.player.type) return false;
          return this.player.type === playerTypes.HUMAN;
      },
      isActive() {
          const active = this.player.color === this.currentPlayer.color;
          return active;
      },
      wins() {
          return this.winners.filter(p => p.color === this.player.color).length;
      },
      ...mapGetters(['currentPlayer']),
      ...mapState(['winners']),
  },
  components: {
      RobotIcon
  }
}

</script>
<style scoped>
    .spacey {
        margin-right: 1rem;
    }
    .active {
        background-image: radial-gradient(rgba(0,50,0,0.3), rgba(0,100,0,0.5), rgba(0,255,0.5));
    }
</style>
