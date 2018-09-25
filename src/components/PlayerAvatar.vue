<template>
    <vk-icon icon="user" v-if="human" /> 
    <RobotIcon v-else />
</template>

<script>
import RobotIcon from './RobotIcon.vue';
import playerTypes from '../constants/playerTypes';

export default {
  name: 'PlayerAvatar',
  props: ['type'],
  computed: {
      human: function() {
          if (!this.type) return false;
          return this.type === playerTypes.HUMAN;
      }
  },
  components: {
      RobotIcon
  }
}

</script>
