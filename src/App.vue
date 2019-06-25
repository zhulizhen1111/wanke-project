<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.keep_alive"/>
    </keep-alive>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  created() {
    
  }
}
</script>
<style lang="less">
#app {
  position: relative;
  margin: 0 auto;
}
</style>
