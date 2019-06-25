<template>
  <div class="global-home" v-if="show">
      <my-head class="my-head"></my-head>
      <div class="content" >
        <router-view>
        </router-view>
      </div>
  </div>
</template>

<script>
import MyHead from './Head.vue'
export default {
  components: {
    MyHead
  },

  mixins: [],

  props: {

  },

  data () {
    return {
      show:false
    }
  },

  computed: {

  },
  created(){  
  },
  mounted() {
    const pid = this.$route.query.id || localStorage.getItem('projectId') || this.$store.state.projectId;
    this.$store.commit('setProId', pid)
    localStorage.setItem('projectId', pid)
    this.show = true
  },

  methods: {
   
  },

}
</script>

<style scoped lang="less" >
.global-home {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  .my-head {
    height: 50px;
    line-height: 20px;
    position: fixed;
    top: 0;
    z-index: 999999;
  }

}
</style>
<style lang="less">
.global-home {
  .my-head{
    .ivu-select-dropdown {
      z-index:9999;
    }
    .ivu-select-selection {
      background: #374045;
      color: #fff;
      border: none;
      font-size: 18px;
      font-weight: bold;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      font-size: 18px;
    }
    .ivu-select-arrow {
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>

