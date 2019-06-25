<template>
  <div class="equipment">
      <p class="info">设备设施</p>
      <p class="eq-total">设备总量：<span style="padding-left:10px"> {{eqCount}}</span></p>
      <div id="pieImg" style="height:200px;width:368px;margin:10px 0" ref="mayPieCharts"></div>
      <table class="description">
      <tr class="normal" v-for="(item, index) in groupByMajor" :key="index">
          <td><i :style="`background-color: ${item.itemStyle.color}`"></i>{{item.name}}</td>
          <td>{{(item.value)}}</td>
      </tr>
      </table>
      <div class="normal-equipment">
        <p>完好的设备 <span>{{normalCount}}（{{namalRate}}%）</span></p>
        <i-Progress :percent="namalRate" :stroke-width="14" />
      </div>
      <div class="normal-equipment">
        <p>故障的设备 <span>{{repairCount}}（{{repairRate}}%）</span></p>
        <i-Progress :percent="repairRate" :stroke-width="14" />
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
      eqCount: "--",
      repairCount: "--",
      normalCount: "--",
      namalRate: 0,
      repairRate: 0,
      groupByMajor: [],
      colors: {
        SE: "#4A9EF9", // 强电
        WE: "#6ECAF7", // 弱电【key值待修改】
        AC: "#73DA99", // 空调
        WS: "#F3E171", // 给排水
        FF: "#FABA53", // 消防
        SP: "#EF8DCC", // 安防【key值待修改】
        OT: "#63ADE2" ,// 其他专业（接口里叫其他专业）
        CF:"#DEFB92",   //土建
        ID:"#E2F516",
        DW:"#BFEA2B"
      }
    };
  },

  computed: {},

  mounted() {
    this.getEqCount();
    this.getEqTotal();
  },

  methods: {
    //设备设施
    getEqCount() {
      axios
        .get(`/info-mng-backend/saas/getEqRepairCount?projectId=${this.$store.state.projectId}`)
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.eqCount = data.eqCount;
            this.repairCount = data.repairCount;
            this.normalCount = this.eqCount - this.repairCount;
            this.namalRate = Math.floor(
              this.normalCount == 0
                ? 0
                : (this.normalCount / this.eqCount) * 100
            );
            this.repairRate = Math.floor(
              this.repairCount == 0
                ? 0
                : (this.repairCount / this.eqCount) * 100
            );
          }
        });
    },
     //设备专业分类图
    drawPie() {
      let mayPieCharts = echarts.init(document.getElementById("pieImg"));
      mayPieCharts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "",
            data: this.groupByMajor,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                label: {
                  show: false //隐藏标示文字
                },
                labelLine: {
                  show: false //隐藏标示线
                }
              }
            }
          }
        ]
      });
      setTimeout(() => {
         window.onresize = function () {
          mayPieCharts.resize()
        }
      }, 10)
    },
    //设备专业分类数据
    getEqTotal() {
       this.groupByCate = [];
      axios
        .get(`/info-mng-backend/eq/getAll?projectId=${this.$store.state.projectId}`)
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.groupByCate = data.groupByCate;
            this.groupByMajor = this.formatMajor(data.groupByMajor);
            this.groupByMajorTotalValue = this.calculationMajorTotalValue(
              data.groupByMajor
            );
            this.drawPie();
          }
        });
    },
    formatMajor(groupByMajor) {
      return groupByMajor.map(item => {
        return {
          name: item.name,
          value: item.count,
          itemStyle: {
            color: this.colors[item.major]
          }
        };
      });
    },
    calculationMajorTotalValue(groupByMajor) {
      let total = 0;
      groupByMajor.forEach(i => {
        total += parseFloat(i.count);
      });
      return total;
    }
  }
};
</script>

<style scoped lang="less" >
.equipment {
  border: 1px solid #ebecf0;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  //font-size: 14px;
  .info {
    height: 50px;
    line-height: 50px;
    background: #f7f9fc;
    border: 0 solid #f2f2f2;
    padding-left: 20px;
    font-weight: bolder;
    font-size: 18px;
    color: #3b4254;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .state {
    display: inline-block;
    color: #3b4254;
    padding-top: 32px;
    padding-left: 20px;
    height: 18px;
    line-height: 18px;
  }
  .grade {
    font-size: 23px;
    color: #73da99;
    display: inline-block;
    width: 60px;
    height: 40px;
    padding-left: 14px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 38px;
  }
  .eq-total {
    height: 42px;
    line-height: 42px;
    color: #62697b;
    margin-left: 20px;
    margin-top: 10px;
    > span {
      font-family: 'ArialMT';
      font-size: 20px;
      color: #4a9ef9;
    }
  }
  #pieImg {
    top: -20px;
    // margin: 0 auto;
  }
  .description {
    margin-left: 20px;
    margin-top: -40px;
    display: flex;
    flex-wrap: wrap;
    tr {
      width: 50%;
      padding: 3px 0;
    }
    i {
      width: 8px;
      height: 8px;
      display: inline-block;
      background: #000;
      border-radius: 50%;
      margin-right: 10px;
    }
    td {
      height: 18px;
      color: #62697b;
      &:nth-child(2n) {
        padding-left: 5px;
      }
    }
  }
  .normal-equipment {
    margin: 50px 0;
    padding-left: 20px;
    p {
      color: #62697b;
      padding-bottom: 12px;
      > span {
        padding-left: 10%;
      }
    }
  }
}
</style>
<style lang="less">
.equipment {
  .ivu-progress-text {
    display: none;
  }
  .ivu-progress-bg {
    // border-radius:1px;
  }
  .ivu-progress-inner {
    // border-radius:1px;
    background: #eaf0f8;
  }
}
</style>

