<template>
  <vk-navbar-full class='uk-navbar-transparent'>
    <vk-navbar-logo slot="center">
      <h1>{{ msg }}</h1>
    </vk-navbar-logo> 
  </vk-navbar-full>
</template>

<script>
export default {
  name: 'Header',
  props: ['msg']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  padding-top: 1rem;
  margin: 0px;
}
</style>
