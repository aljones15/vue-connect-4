<template>
  <vk-navbar-full>
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
}
</style>
