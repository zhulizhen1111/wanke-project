<template>
  <div class="fas-home">
    <aside-mune class="aside"></aside-mune>
    <div class="content">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<script>
import AsideMune from "../asideMenu";

export default {
  components: {
    AsideMune
  },

  mixins: [],

  props: {},

  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {}
};
</script>

<style scoped lang="less" >
.fas-home {
  .aside {
    position: fixed;
    z-index: 999;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 80px;
    border-right: 1px solid #ebecf0;
    transition: all 0.3s ease-in-out;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    padding-top: 20px;
  }
  .content {
    margin-left: 80px;
    padding: 70px 20px 20px 20px;
    transition: all 0.3s ease-in-out;
    background: #ebecf0;
    min-width: 1340px;
  }
  & > .aside:hover {
    width: 260px;
    background: #fff;
  }
}
</style>
