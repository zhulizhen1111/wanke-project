<template>
  <div class="legend">
    <div > 
      <i class="line" :style="`width: ${width}; background: linear-gradient(${colors});`"></i>
      <span class="unit" v-html="unitText"></span> 
    </div>
    <ul>
      <li v-for="(item, index) in referList" :key="index" :style="`left: ${space * index}px`">{{item.value}}</li>
    </ul>       
  </div> 
</template>

<script>
export default {
  components: {},
  props: {
    width: {
      type: String,
      default: "260px"
    },
    unitText: {
      type: String,
      default: ""
    },
    referList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },

  computed: {
    space() {
      return `${parseFloat(this.width) / (this.referList.length - 1)}`;
    },
    colors() {
      const str = this.referList.map(i => i.color).toString();
      return `to right,${str}`;
    }
  },

  mounted() {},

  methods: {}
};
</script>

<style scoped lang="less" style="text/less">
.legend {
  > div {
    display: flex;
    align-items: center;
    .line {
      display: inline-block;
      height: 10px;
      border-radius: 5px;
      margin-left: 7px;
    }
    .unit {
      padding-left: 3px;
    }
  }
  ul {
    position: relative;
    margin-top: 3px;
    li {
      position: absolute;
    }
  }
}
</style>
