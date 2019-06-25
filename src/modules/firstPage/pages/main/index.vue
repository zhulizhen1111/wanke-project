<template>

  <div class="first-page"> 

    <div class="top">
        <base-info></base-info>
        <new-active></new-active>
    </div>

    <div class="bottom">
      <equipment></equipment>
      <energy></energy>
      <enviromentAndSafe></enviromentAndSafe>
      <staff></staff>
    </div>

  </div>
</template>

<script>
import baseInfo from "./baseInfo.vue";
import equipment from "./equipment.vue";
import enviromentAndSafe from "./enviromentAndSafe.vue";
import energy from "./Energy.vue";
import staff from "./Staff.vue";
import newActive from "./newActive.vue";
export default {
  components: {
    baseInfo,
    equipment,
    enviromentAndSafe,
    energy,
    staff,
    newActive
  },

  mixins: [],

  props: {},

  data() {
    return {
     
    };
  },

  computed: {},

  mounted() {
    
  },

  methods: {}
};
</script>

<style scoped lang="less" >
.first-page {
  min-width: 1390px;
  font-family:"Microsoft YaHei";
  .top {
    display: flex;
    margin-bottom: 10px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;

    > * {
      width: 24.5%;
    }
  }
}
</style>
