<template>
  <div id='grid'>
     <div class='row' v-bind:key='index' v-for='(row, index) in grid'>
         <Square
             v-bind:key='index'
             class='uk-width-1-7'
             v-for='(tile, index) in row'
             :tile="tile" 
         />
     </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Square from './Square.vue';
export default {
  name: 'Grid',
  computed: {
      ...mapState({
          grid: state => state.board
      })
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
      width: 100%;
      width: 12%; 
  }
  .row {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding-bottom: 1px;
  }
// https://stackoverflow.com/questions/13637106/what-are-the-best-width-ranges-for-media-queries

  @media only screen 
  and (min-device-width: 0px) 
  and (max-device-width: 480px) {
      
  }
  @media only screen 
  and (min-device-width: 480px) 
  and (max-device-width: 1080px) {
      #grid {
          margin-right: 5rem;
          margin-left: 5rem;
      }
  }

  @media only screen
  and (min-width: 1824px) {

  }

</style>
