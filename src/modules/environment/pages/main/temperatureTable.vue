<template>
  <div class="temperatureTable">
      <span class="remark-icon"></span><p class="my-title">温度统计表</p>
      <i-Table stripe  size="large" :columns="columns1" :data="tableData"></i-Table>
  </div>
</template>

<script>
export default {
  components: {},

  mixins: [],

  props: ['tableData'],

  data() {
    return {
      columns1: [
        {
          title: "楼层",
          key: "FloorLocalName"
        },
        {
          title: "测量点个数",
          key: "count"
        },
        {
          title: "20℃以下的个数",
          key: "to20"
        },
        {
          title: "20℃~24℃的个数",
          key: "to24"
        },
        {
          title: "24℃~26℃的个数",
          key: "to26"
        },
        {
          title: "26℃~28℃的个数",
          key: "to28",
          className: "table-info-column"
        },
        {
          title: "28℃以上的个数 ",
          key: "from28"
        }
      ],
      data1: []
    };
  },

  computed: {},

  mounted() {

  },

  methods: {
   
  }
};
</script>

<style scoped lang="less" >
.my-title {
  height: 40px;
  font-size:18px;
  font-weight: bold;
  display: inline-block;
}
.remark-icon {
  padding: 7px 3px;
  display: inline-block;
  background: #4a9ef9;
  margin: 20px 10px 0 20px;
}
.temperatureTable {
  width: 65%;
  border: 1px solid #dbdde4;
  border-radius: 3px;
  padding: 0 20px;
}
</style>
<style lang="less">
.ivu-table-wrapper {
  border: none;
}
</style>