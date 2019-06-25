<template>
    <div class="pandect">
        <div>
            <p class="device">当前设备总体运行状态&nbsp;&nbsp;&nbsp;
                <span class="states" v-if="eqIntactRate>=99">优</span>
                <span class="states" v-if="99>eqIntactRate>=98">良好</span>
                <span class="states" v-if="98>eqIntactRate>=95">中</span>
                <span class="states" v-if="eqIntactRate<95">差</span>
            </p>
            <!-- <div v-if="groupByCate.length==0 && sum==0">
                <Spin fix>
                    <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>  -->
            <Tabs type="card"   @on-click="getData">
                <TabPane :label="`设备设施总数 ${sum}`">
                    <card :isShow="true" :groupByCate='groupByCate'></card>
                </TabPane>
                <TabPane :label="`设备完好率 ${eqIntactRate}%`"> 
                    <card :isIntacShow="true" :groupByCate='groupByCate'></card>
                </TabPane>
                <TabPane :label="`维保及时率 100%`"> 
                    <card :isMainShow="true" :groupByCate='groupByCate'></card>
                </TabPane>
                <TabPane :label="`超期服役率 0%`"> 
                    <card :isOverShow="true" :groupByCate='groupByCate'></card>
                </TabPane>
                <!-- <TabPane :label="`运行偏差率 ${operatingDeviationRate}%`"> 
                    <card :isShow="true"></card>
                </TabPane> -->
            </Tabs>
        </div>
        <div class="my-bottom">
            <div class="pie">
                <span class="remark-icon"></span><p class="my-title">设备专业分类</p>
                <div id="pieImg" style="height:279px;width:368px" ref="mayPieCharts"></div>
                <table class="description">
                <tr class="normal" v-for="(item, index) in groupByMajor" :key="index">
                    <td><i :style="`background-color: ${item.itemStyle.color}`"></i>{{item.name}}</td>
                    <td>{{(item.value)}}</td>
                </tr>
                </table>
            </div>
            <div class="my-table">
                <span class="remark-icon"></span><p class="my-title">每月设备故障及维修汇总</p>
                <div id="barImg" style="height:340px;width:100%" ref="mayBarCharts"></div>
                <div class="legend">
                    <span class="good"><i style="background:#4A9EF9"></i>设备故障及修复数量</span>
                </div>
            </div>
        </div>
        <div class="attention">
            <span class="remark-icon"></span><p class="my-title">重点关注设备</p>
            <i-Table stripe :columns="columns1" :data="data1" size="large"></i-Table>
        </div>
        <!-- <div class="mask-bg" @click="closeLay"></div>
       <div class="mask-lay" :style="`width: ${maskWidth}`">
         <detail></detail>
       </div> -->
    </div>
</template>

<script>
import axios from "axios";
var echarts = require("echarts");
import card from "./Card.vue";
import detail from './Detail.vue'
export default {
  components: {
    card,
    detail
  },

  mixins: [],

  props: {},

  data() {
    return {
      isShow:true,
      isMainShow: true,
      isIntacShow: true,
      isOverShow: true,
      sum: '--',
      eqIntactRate: '--',
      maintTimelinessRate: '--',
      operatingDeviationRate: '--',
      overdueServiceRate: '--',
      rateMajor: [],
      maskWidth:"0px",
      columns1: [
        {
          title: "设备本地编号",
          key: "eId"
        },
        {
          title: "设备本地名称",
          key: "localName"
        },
        {
          title: "安装位置",
          key: "location"
        },
        {
          title: "运行状态",
          key: "runStatus"
        },
        {
          title: "近30天维修次数",
          key: "recentMaintainanceCount",
          sortable: true
        },
        {
          title: "未关闭的工单",
          key: "unclosedWorkorderCount",
          sortable: true
        },
        {
          title: "报警数量 ",
          key: "alarmCount",
          sortable: true
        },
        {
          title: "操作",
          key: "operation",
          className: "table-btn-column",
          render: (h, params) => {
            return h(
              "a",
              {
                props: {                                                                    
                  type: "text",
                  size: "large",
                },
                attrs: {
                    href: `http://47.94.89.44:8058/spread?id=${params.row.id}&pid=${this.$store.state.projectId}`,
                    target: '_black'
                }
              }, "查看详情"
            );
          }
        }
      ],
      data1: [
      ],
      groupByCate: [],
      groupByMajor: [],
      groupByMajorTotalValue: 100,
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
    this.getTotal();
    this.getEqTotal();
    this.getDrawBarData();
    this.getConcerns();
  },

  methods: {
    //重点关注设备
    getConcerns(){
      axios.get(`/info-mng-backendeq/getConcerns?projectId=${this.$store.state.projectId}`).then(res=>{
        let data = res.data
        this.data1 = data.data
        this.data1.forEach(el=>{
            el.eId = el.localId || el.id
          })
      })
    },
    //弹窗关闭事件
    // closeLay(){
    //    document.querySelector("body").style.overflow = "auto";
    //    document.querySelector('.mask-bg').style.display = 'none';
    //    this.maskWidth = "0px;"
    // },
    //每个卡片头的点击事件
    getData(name){
      console.log(name)
      if(name==0){
        this.getEqTotal();
      }else if(name==1){
        this.getRate();
      }else if(name==2){
        this.getqMaintain()
      }else{
        this.getEqOver()
      }
    },
    //近12个月已维修过的设备数量图
    getDrawBarData(){
       var dataAxis = [],dataY = []
      axios.get(`/info-mng-backend/saas/queryRepairNumIn12Month?projectId=${this.$store.state.projectId}`).then(res=>{
        let data = res.data;
        if(data.result == 'success'){
          data.data.forEach(el=>{
            dataAxis.push(el.year + '.' + el.month)
            dataY.push(el.count)
          })
        }
        this.drawBar(dataAxis,dataY)
      })
    },
    drawBar(dataAxis,dataY) {
      let mayBarCharts = echarts.init(document.getElementById("barImg"));

      mayBarCharts.setOption({
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : dataAxis,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'设备故障及修复数量',
                type:'bar',
                barWidth: '60%',
                data:dataY
            }
        ]
      });
       
      // Enable data zoom when user click bar.
      var zoomSize = 6;
      setTimeout(() => {
        window.onresize = function() {
          barImg.resize();
        };
      }, 10);
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
    //设备设施总数
    getTotal() {
      axios
        .get(`/info-mng-backend/saas/getEqStatistics?projectId=${this.$store.state.projectId}`)
        .then(res => {       
          if (res.data.result == "success") {
            let data = res.data.data;
            this.sum = data.eqCount;
            this.overdueServiceRate = data.overdueServiceRate;
            this.operatingDeviationRate = data.operatingDeviationRate;
            this.maintTimelinessRate = data.maintTimelinessRate;
            this.eqIntactRate = data.eqIntactRate;
          }
        });
    },
    // 设备设施完好率
    getRate() {
      this.groupByCate = [];
      axios
        .get(`/info-mng-backend/saas/getEqIntactRate?projectId=${this.$store.state.projectId}`)
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.groupByCate = data.groupByMajor;
          }
        });
    },
    // 维保及时率
     getqMaintain() {
      this.groupByCate = [];
      axios
        .get(`/info-mng-backend/saas/getEqMaintainingInfo?projectId=${this.$store.state.projectId}`)
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.groupByCate = data.groupByCate;
          }
        });
    },
    // 超期服役率
    getEqOver() {
      this.groupByCate = [];
      axios
        .get(`/info-mng-backend/saas/getEqOverDueInfo?projectId=${this.$store.state.projectId}`)
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.groupByCate = data.groupByCate;
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
.pandect {
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .device {
    color: #3b4254;
    padding-bottom: 30px;
    font-size: 18px;
    font-weight: bold;
    .states {
      font-weight: bold;
      font-size: 30px;
      color: #73da99;
    }
  }
  .my-bottom {
    display: flex;
    margin: 64px 0 20px 0;
    .pie {
      width: 452px;
      margin-right: 20px;
      border: 1px solid #dbdde4;
      border-radius: 1px;
      position: relative;
      .my-title {
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
      }
      #pieImg {
        top: -40px;
        margin: 0 auto;
      }
      .description {
        margin-left: 20px;
        margin-top: -60px;
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
      .remark-icon {
        padding: 7px 3px;
        display: inline-block;
        background: #4a9ef9;
        margin: 20px 10px 0 20px;
      }
    }
    .my-table {
      width: 1288px;
      border: 1px solid #dbdde4;
      border-radius: 1px;
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
      .legend {
        position: absolute;
        top: 59px;
        right: 15%;
        i {
          width: 10px;
          height: 10px;
          display: inline-block;
          background: #000;
          margin-right: 8px;
        }
        .good {
          padding-right: 20px;
        }
      }
    }
  }
  .attention {
    width: 100%;
    border: 1px solid #dbdde4;
    border-radius: 1px;
    padding: 0 20px;
    .my-title {
      height: 40px;
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
    }
    .remark-icon {
      padding: 7px 3px;
      display: inline-block;
      background: #4a9ef9;
      margin: 20px 10px 0 0;
    }
  }
  // .mask-bg{
  //   position: fixed;
  //   top: 0;
  //   bottom:0;
  //   right: 0;
  //   left: 0;
  //   z-index: 9999;
  //   display: none ;
  //   opacity: 0.4;
  // }
  // .mask-lay{
  //   position: fixed;
  //   top: 50px;
  //   bottom:0;
  //   right: 0;
  //   z-index: 99999;
  //   transition: all 0.5s ease-in-out;
  //   background:#fff;
  // }
}
</style>
<style lang="less">
.pandect {
  .ivu-tabs-bar {
    margin-bottom: 0;
  }
  .ivu-tabs-nav-container{
    font-size:16px;
  }
 .ivu-table-large {
    font-size:16px;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    background: #fff;
  }
  .ivu-tabs .ivu-tabs-tabpane {
    border: 1px solid #dbdde4;
    border-top: none;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab,.ivu-tabs .ivu-tabs-content-animated{
   transform:none;
   transition:none;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    background: #f4f5f8;
  }
  .ivu-table .ivu-table-tbody .table-info-column {
    color: #faba53;
  }
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
  .ivu-table .ivu-table-tbody .ivu-btn-text {
    color: #57a4f7;
  }
}
</style>

