<template>
  <div class="info-sumary">
      <p class="accumulation">月累计工单数量 <span class="my-size">{{billData.orderTotal}}</span> 个   <span class="ratio">工单按时完成率 </span>
      <span class="my-size">{{billData.timeFinishedRate}}</span></p>
      <div class="picture">
        <span class="remark-icon"></span><p class="my-title">本月5类工单数量</p>
         <i-Select v-model="model1" style="width:140px;float:right;margin-right:40px;margin-top:20px" @on-change="getChartData()">
            <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-Select>
        <i-Select v-model="model2" style="width:140px;float:right;margin-right:40px;margin-top:20px" @on-change='getChartData()'>            
            <Option v-for="item in years" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-Select>
        <div id="bill-charts">
           
        </div>
        <div class="legend">
           <div style="background:#4A9EF9"></div>运行类工单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <div style="background:#6ECAF7"></div>巡检类工单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <div style="background:#73DA99"></div>维保类工单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <div style="background:#F3E171"></div>维修类工单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <div style="background:#DFE7F0"></div>当日完成工单数量&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
      <div class="my-bottom">
        <div class="pie">
           <span class="remark-icon"></span><p class="my-title">工单数量</p>
           <div class="tt-echarts">
              <div id="tt_bill"> </div>
              <div class="tt-legend">
                <div><div class="square"></div>运行类工单<span class="num">{{billData.runOrderNum}}</span><span class="rat">({{billData.runOrderRate}})</span></div>
                <div><div class="square" style="border:1px solid #6ECAF7"></div>巡检类工单<span class="num">{{billData.inspectOrderNum}}</span><span class="rat">({{billData.inspectOrderRate}})</span></div>
                <div><div class="square" style="border:1px solid #73DA99"></div>维保类工单<span class="num">{{billData.maintainOrderNum}}</span><span class="rat">({{billData.maintainOrderRate}})</span></div>
                <div><div class="square" style="border:1px solid #F3E171"></div>维修类工单<span class="num">{{billData.repairOrderNum}}</span><span class="rat">({{billData.repairOrderRate}})</span></div>
              </div>
           </div>
        </div>
        <div class="my-table">
          <span class="remark-icon"></span><p class="my-title">已完成工单数量</p>
          <div class="tt-v">
            <i-Table stripe  :columns="columns1" :data="data2" size="large"></i-Table>
          </div>  
        </div>
      </div>
  </div>
</template>
 
<script>
import axios from "axios";
var echarts = require("echarts");
export default {
  components: {},
 
  mixins: [],
 
  props: {},
 
  data() {
    return {
      columns1: [
        {
          title: "时间",
          key: "name"
        },
        {
          title: "合计",
          key: "orderTotal"
        },
        {
          title: "运行",
          key: "runOrderNum"
        },
        {
          title: "巡检",
          key: "inspectOrderNum"
        },
        {
          title: "维保",
          key: "maintainOrderNum"
        },
        {
          title: "维修",
          key: "repairOrderNum",
          className: "table-info-column"
        }
      ],
      data2: [],
      data1: [
        { name: "上月" },
        { name: "本月" },
        { name: "上周" },
        { name: "本周" },
        { name: "昨日" }
      ],
      monthList: [
        {
          value: "1",
          label: "一月"
        },
        {
          value: "2",
          label: "二月"
        },
        {
          value: "3",
          label: "三月"
        },
        {
          value: "4",
          label: "四月"
        },
        {
          value: "5",
          label: "五月"
        },
        {
          value: "6",
          label: "六月"
        },
        {
          value: "7",
          label: "七月"
        },
        {
          value: "8",
          label: "八月"
        },
        {
          value: "9",
          label: "九月"
        },
        {
          value: "10",
          label: "十月"
        },
        {
          value: "11",
          label: "十一月"
        },
        {
          value: "12",
          label: "十二月"
        }
      ],
      model1: new Date().getMonth() + 1 + '',
      model2: new Date().getFullYear() + '',
       years: [
        {
          value: "2019",
          label: "2019年"
        },
        {
          value: "2018",
          label: "2018年"
        },
        {
          value: "2017",
          label: "2017年"
        },
       {
          value: "2016",
          label: "2016年"
        },
        {
          value: "2015",
          label: "2015年"
        },
       {
          value: "2014",
          label: "2014年"
        },
        {
          value: "2013",
          label: "2013年"
        },
        {
          value: "2012",
          label: "2012年"
        },
        {
          value: "2011",
          label: "2011年"
        },
        {
          value: "2010",
          label: "2010年"
        },
       {
          value: "2009",
          label: "2009年"
        },
        {
          value: "2008",
          label: "2008年"
        }
      ],
      orderTotal: 0,
      days:[],
      billData: {
        runOrderNum: "--",
        runOrderRate: "--",
        maintainOrderNum: "--",
        maintainOrderRate: "--",
        repairOrderNum: "--",
        repairOrderRate: "--",
        timeFinishedRate: "--",
        finishedNum: "--",
        inspectOrderRate: "--",
        inspectOrderNum: "--"
      }
    };
  },
 
  computed: {},
 
  mounted() {
    this.initBillData();
    this.initTable();
    this.getChartData();
  },
 
  methods: {
    //已完成工单数量
    initTable() {
      axios
        .get(
          `/info-mng-backend/saas/queryFinishedWorkOrderStatistics?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          let obj = {};
          this.data1.forEach(el => {
            if (el.name == "上月") {
              el = Object.assign(el, data.lastMonthStatistics);
              this.data2.push(el);
            }
            if (el.name == "本月") {
              el = Object.assign(el, data.currentMonthStatistics);
              this.data2.push(el);
            }
            if (el.name == "本周") {
              el = Object.assign(el, data.currentWeekStatistics);
              this.data2.push(el);
            }
            if (el.name == "上周") {
              el = Object.assign(el, data.lastWeekStatistics);
              this.data2.push(el);
            }
            if (el.name == "昨日") {
              el = Object.assign(el, data.yesterdayStatistics);
              this.data2.push(el);
            }
          });
        });
    },
    //工单数量数据
    getChartData() {
      let month = this.model1;
      let year = this.model2;
      axios
        .get(
          `/info-mng-backend/saas/queryMonthEverydayWorkOrderStatistics?projectId=${this.$store.state.projectId}&year=${year}&month=${month}`
        )
        .then(res => {
          let data = res.data.data;
          console.log(data)
          this.days = [];
          let runData = [],
            repairData = [],
            mainData = [],
            inspectData = [],
            lastData = [];
          data.forEach(el => {
            this.days.push(el.day)
            runData.push(el.runOrderNum);
            inspectData.push(el.inspectOrderNum);
            mainData.push(el.maintainOrderNum);
            repairData.push(el.repairOrderNum);
            lastData.push(el.lastMonthOrderTotal);
          });
          console.log(this.days)
          this.initCharts(runData, repairData, mainData, inspectData, lastData);
        });
    },
    //工单数量图
    initCharts(runData, repairData, mainData, inspectData, lastData) {
      var bill = echarts.init(document.getElementById("bill-charts"));
      bill.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
         xAxis: [
           {
             type: "category",
             data: this.days,
             boundaryGap: true,
             axisLabel: {
               show: true,
               interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "运行类工单",
            type: "bar",
            barWidth: 8,
            itemStyle: {
              color: "#4A9EF9"
            },
            stack: "搜索引擎",
            data: runData
          },
          {
            name: "巡检类工单",
            type: "bar",
            itemStyle: {
              color: "#6ECAF7"
            },
            stack: "搜索引擎",
            data: inspectData
          },
          {
            name: "维保类工单",
            type: "bar",
            itemStyle: {
              color: "#73DA99"
            },
            stack: "搜索引擎",
            data: mainData
          },
          {
            name: "维修类工单",
            type: "bar",
            itemStyle: {
              color: "#F3E171"
            },
            stack: "搜索引擎",
            data: repairData
          },
          {
            name: "当日完成工单数量",
            type: "bar",
            itemStyle: {
              color: "#DFE7F0"
            },
            data: lastData
          }
        ]
      });
      setTimeout(() => {
        window.onresize = function() {
          bill.resize();
        };
      }, 10);
    },
    //本月5类工单数量数据
    initBillData() {
      axios
        .get(
          `/info-mng-backend/saas/queryCurrentMonthWorkOrderStatistics?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          this.billData = res.data.data;
          this.orderTotal = this.billData.orderTotal;
          this.timeFinishedRate = this.billData.timeFinishedRate;
          this.draw();
        });
    },
    //本月5类工单数量图
    draw() {
      let _this = this;
      let orderTotal = this.billData.orderTotal;
      let myChart = echarts.init(document.getElementById("tt_bill"));
      var scaleData = [
        {
          name: "运行类工单",
          value: parseInt(this.billData.runOrderNum),
          itemStyle: {
              normal: {
                borderWidth: 15,
                borderColor: "#4A9EF9"
              }
          }
        },
        {
          name: "巡检类工单",
          value: parseInt(this.billData.inspectOrderNum),
           itemStyle: {
              normal: {
                borderWidth: 15,
                borderColor: "#6ECAF7"
              }
          }
        },
        {
          name: "维保类工单",
          value: parseInt(this.billData.maintainOrderNum),
          itemStyle: {
              normal: {
                borderWidth: 15,
                borderColor: "#73DA99"
              }
          }
        },
        {
          name: "维修类工单",
          value: parseInt(this.billData.repairOrderNum),
          itemStyle: {
              normal: {
                borderWidth: 15,
                borderColor: "#F3E171"
              }
          }
        }
      ];
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0
        }
      };
      var seriesObj = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [70, 70],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "center",
                color: "#3B4254",
                fontSize: 18,
                formatter: function(params) {
                  return `\n\工单总数\n\n ${orderTotal}`;
                }
              }
            }
          },
          data: scaleData
        }
      ];
 
      myChart.setOption({
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: true
        },
        series: seriesObj
      });
    }
  }
};
</script>
 
<style scoped lang="less" >
.info-sumary {
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .accumulation {
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    .my-size {
      font-size: 20px;
      color: #4a9ef9;
      font-weight: bold;
    }
    .ratio {
      padding-left: 50px;
    }
  }
  .picture {
    margin: 20px 0;
    border: 1px solid #dbdde4;
    border-radius: 3px;
    position: relative;
    .my-title {
      height: 40px;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
    }
    .remark-icon {
      padding: 7px 3px;
      display: inline-block;
      background: #4a9ef9;
      margin: 20px 10px 0 20px;
    }
    #bill-charts {
      width: 100%;
      height: 390px;
    }
    .legend {
      position: absolute;
      right: 58px;
      top: 60px;
      > div {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 5px;
      }
    }
  }
  .my-bottom {
    display: flex;
    .pie {
      width: 25.7%;
      min-width: 400px;
      padding-right: 2%;
      border: 1px solid #dbdde4;
      .tt-echarts {
        #tt_bill {
          width: 200px;
          height: 200px;
          margin-left: 80px;
        }
        .tt-legend {
          margin: 10px 0 0 100px;
          > div {
            height: 30px;
          }
          .square {
            width: 8px;
            height: 8px;
            background: #fff;
            border: 1px solid #4A9EF9;
            border-radius: 50px;
            display: inline-block;
            margin-right: 10px;
          }
          .num {
            margin-left: 15px;
          }
          .rat {
            margin-left: 15px;
          }
        }
      }
      .my-title {
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
      }
      .remark-icon {
        padding: 7px 3px;
        display: inline-block;
        background: #4a9ef9;
        margin: 20px 10px 0 20px;
      }
    }
    .my-table {
      width: 75.2%;
      border: 1px solid #dbdde4;
      margin-left: 20px;
      .my-title {
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
      }
      .remark-icon {
        padding: 7px 3px;
        display: inline-block;
        background: #4a9ef9;
        margin: 20px 10px 0 20px;
      }
      .tt-v {
        padding: 0 20px 20px 20px;
      }
    }
  }
}
</style>
<style lang="less">
.ivu-table-wrapper {
  border: none;
}
.ivu-table:before {
  height: 0;
}
.ivu-table:after {
  width: 0;
}
.ivu-table td,
.ivu-table th {
  border: none;
}
</style>