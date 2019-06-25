<template>
  <div class="fp-home">
    <aside-mune class="aside"></aside-mune>
    <div class="fp-content">
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

  mounted() {
  },

  methods: {}
};
</script>

<style scoped lang="less" >
.fp-home {
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
  .fp-content {
    margin-left: 80px;
    padding: 70px 20px 20px 20px;
    transition: all 0.3s ease-in-out;
    background: #eeeff3;
    min-width: 1344px;
  }
  & > .aside:hover {
    width: 300px;
    background: #fff;
  }
}
</style>
