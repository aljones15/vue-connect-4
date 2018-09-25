<template>
    <vk-icon v-bind:class="{ active: isActive }" class='spacey' icon="user" v-if="human" /> 
    <RobotIcon v-bind:class="{ active: isActive }" class='spacey' v-else />
</template>

<script>
import RobotIcon from './RobotIcon.vue';
import playerTypes from '../constants/playerTypes';
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerAvatar',
  props: ['player'],
  computed: {
      human() {
          if (!this.player.type) return false;
          return this.player.type === playerTypes.HUMAN;
      },
      isActive() {
          return this.player.color === this.currentPlayer.color;
      },
      ...mapGetters(['currentPlayer']),
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
        fill: red;
    }
</style>
