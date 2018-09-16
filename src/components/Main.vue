<template>
   <div>
     <Header :msg="msg" />
     <Grid />
   </div>
</template>

<script>

import Header from './Header.vue'
import Grid from './Grid.vue'

export default {
  name: 'Main',
  props: ['msg'],
  components: {
    Header,
    Grid
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
