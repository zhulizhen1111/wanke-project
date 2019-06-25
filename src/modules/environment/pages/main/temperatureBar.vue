<template>
    <div id="temperatureBar">
        <span class="remark-icon"></span><p class="my-title">温度统计</p>
        <div id="barCharts"> </div>
    </div>
</template>

<script>
var echarts = require("echarts");
export default {
  components: {},

  mixins: [],

  props: ['stat'],

  data() {
    return {
      arr:[],
    };
  },

  computed: {},

  mounted() {
    this.dealData();
  },

  methods: {
    dealData(){
      this.arr = [];
      this.arr.push(this.stat.to20Sum,this.stat.to24Sum,this.stat.to26Sum,this.stat.to28Sum,
      this.stat.from28Sum);
       this.barchart();
    },
    barchart() {
      var temperatureBar = echarts.init(document.getElementById("barCharts"));
      temperatureBar.setOption({
        color: ["#3398DB"],
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
            data: ["20℃以下", "20℃~24℃", "24℃~26℃", "26℃~28℃", "28℃以上"],
        
            axisLabel : {    boundaryGap: true,
			                show:true,
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
            name: "温度统计",
            type: "bar",
            barWidth: "40%",
            data: this.arr
          }
        ]
      });
      setTimeout(() => {
         window.onresize = function () {
          temperatureBar.resize()
        }
      }, 10)
    }
  }
};
</script>

<style scoped lang="less" >
#temperatureBar {
  width:35%;
  margin-right: 10px;
  border: 1px solid #dbdde4;
  padding: 0 10px;
  border-radius: 3px;
  #barCharts {
    width: 480px;
    height: 340px;
    margin-left: 10px;
  }
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
}
</style>
