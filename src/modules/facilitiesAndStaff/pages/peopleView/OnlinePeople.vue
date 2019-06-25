<template>
  <div class="peoples">
    <div class="career">
        
        <i-Select id="career" v-model="career" size="large" style="width:140px;height:36px" @on-change="initTable(career)">
            <Option v-for="item in cityList" :value="item.name" :key="item.name">{{ item.label }}</Option>
        </i-Select>
        <i-Input v-model="keyword" size="large" placeholder="输入关键字搜索" style="width:auto" @on-change="initTable()">
            <Icon type="ios-search" slot="suffix" @click="initTable()" style="color:#2d8cf0;cursor: pointer;"/>
        </i-Input>
    </div>
    <p style="padding-bottom:14px">近30天数据统计</p>
    <i-Table stripe  :columns="columns1" :data="data1" size="large"></i-Table>
  </div>
</template>

<script>
import axios from "axios";
var echarts = require("echarts");

export default {
  components: {},

  mixins: [],

  data() {
    return {
      keyword: "",
      columns1: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "职位",
          key: "personNum",
        },
        {
          title: "专业",
          key: "specialtyName",
          width:300
        },
        {
          title: "绩效指标",
          key: "performance",
        },
        {
          title: "本月日平均工时",
          key: "averageWorkHours",
        },
        {
          title: "工作评分",
          key: "averageWorkScore",
          render: (h, params) => {
            return h("Rate", {
              props: {
                value: parseFloat(params.row.averageWorkScore),
                allowHalf: true,
                disabled: true
              },
              style: {}
            });
          }
        },
        {
          title: "按时完成率 ",
          key: "ontimeFinishRate",
        },
        // {
        //   title: "当前在岗与否",
        //   key: "onWorkingStatus",
        // },
        {
          title: "操作",
          key: "operation",
          className: "table-btn-column",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "text",
                  size: "large"
                },
                on: {
                  click: () => {
                    this.$emit("showPeopleDetail", params.row.personId);
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ],
      cityList: [],
      career: "",
      majorMap: [
        { 给排水: "WS" },
        { 弱电: "WE" },
        { 安防: "SP" },
        { 强电: "SE" },
        { 消防: "FF" },
        { ccc: "CC" },
        { 空调: "AC" },
        { 其他: "OT" }
      ],
      timeList: [
        {
          value: "近30天",
          label: "近30天"
        },
        {
          value: "近7天",
          label: "近7天"
        }
      ],
      times: "近30天",
      data1: [],
    };
  },

  computed: {},

  mounted() {
    this.getMajor();
    this.initTable(this.career, this.keyword);
  },

  methods: {
    //获取专业
    getMajor() {
      axios.get(`/info-mng-backend/saas/queryGeneralDictByKey`).then(res => {
        if (res.data.result == "success") {
          let data = res.data.data;
          data.forEach(element => {
            element.label = element.name;
          });
          this.cityList = data;
        }
      });
    },
    //表格数据查找事件
    initTable(career) {
      let majorValue = "";
      let keywordValue = " ";
      for (let i of this.cityList) {
       if(i.label==career){
         majorValue=i.code;
       }
      }
      axios
        .get(
          `/info-mng-backend/saas/queryPersonList?projectId=${this.$store.state.projectId}&specialtyCode=${majorValue}&keyword=${
            this.keyword
          }`
        )
        .then(res => {
          this.data1 = res.data.data;
          this.$emit("showData", this.data1);
        });
    },
  }
};
</script>

<style scoped lang="less" >
.peoples {
  background: #fff;
  .career {
    margin: 22px 0 20px 0;
  }
}
</style>
<style lang="less">
.peoples {
  .ivu-tabs-nav-container{
    font-size:16px;
  }
  .ivu-table .ivu-table-tbody .table-info-column {
    color: #faba53;
  }
  .ivu-table-large {
    font-size:16px;
  }
  .ivu-table .ivu-table-tbody .ivu-btn-text {
    color: #57a4f7;
  }
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-select {
    padding-right: 10px;
  }
  .ivu-rate-star {
    margin-right: -4px;
  }
}
</style>
