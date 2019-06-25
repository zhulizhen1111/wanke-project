<template>
  <div class="e-home">
    <!-- <aside-mune class="aside"></aside-mune>
    <div class="e-content">
      <router-view>
      </router-view>
    </div> -->
  </div>
</template>

<script>

import AsideMune from '../asideMenu'

export default {
  components: {
    AsideMune
  },

  mixins: [],

  props: {

  },

  data () {
    return {

    }
  },

  computed: {

  },

  mounted() {

  },

  methods: {

  },

}
</script>

<style scoped lang="less" >
.e-home {
  .aside {
    position: fixed;
    z-index: 999;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 80px;
    border-right: 1px solid #ebecf0;
    transition: all 0.3s ease-in-out;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .e-content {
    margin-left: 80px;
    transition: all 0.3s ease-in-out;
    background: #ccc;
  }
  &>.aside:hover {
    width: 300px;
  }
  &>.aside:hover + .e-content {
    margin-left: 300px;
  }
}
</style>
