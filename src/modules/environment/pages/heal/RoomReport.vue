<template>
  <div class="room-report">
     <p class="alarm-description">变压器超温 <span>未处理</span> <Icon type="md-close" class="close-btn"  @click="close"/></p>
     <div class="alarm-detailInfo">
        <span class="remark-icon"></span><p class="my-title">报警详细信息</p>
        <p class="detail-info"><span class="info-left">报警位置：</span>配电间 变配电低压开关柜0001号</p>
        <p class="detail-info"><span class="info-left">报警开始时间：</span>2018.10.20 12:33</p>
        <p class="detail-info" style=" padding-bottom: 20px;"><span class="info-left">报警持续时间：</span>40分钟</p>
        <div class="alarm-value">
          <div class="value">
            <span>报警值（℃）</span>
            <p>80</p>
          </div>
          <div class="value">
            <span>当前值（℃）</span>
            <p>80</p>
          </div>
          <div class="value">
            <span>门限值（℃）</span>
            <p>80</p>
          </div>
        </div>
        <p class="unit">单位：℃</p>
        <div id="alarmLine"></div>
     </div>
     <div class="alarm-video">
        <span class="remark-icon"></span><p class="my-title">报警时间内视频监控记录</p>
        <div class="video"></div>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
var echarts = require("echarts")
export default {
  components: {

  },

  mixins: [],

  props: ['maskWidth'],

  data () {
    return {

    }
  },

  computed: {

  },

  mounted() {
    this.getLine();
  },

  methods: {
    //关闭弹窗
    close(){
       this.$emit("closeMask")
    },
    //折线图
     getLine(){
       var alarmLine = echarts.init(document.getElementById("alarmLine"));
       let timeValue = ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00'];
       let alarmData = [40,46,64,80,90,60,50,43]
       alarmLine.setOption({
         xAxis: {
              type: 'category',
              data: timeValue
          },
          yAxis: {
              type: 'value',
          },
          series: [{
              data: alarmData,
              type: 'line',
              color: "#4A9EF9"
          }]
       })
     }
  },

}
</script>

<style scoped lang="less" >
.room-report{
  .alarm-description{
    height: 56px;
    line-height: 56px;
    padding-left: 24px;
    font-size: 16px;
    color: #3B4254;
    border-bottom: 1px solid #DBDDE4;
    >span{
      color: #F78686;
      padding: 3px 7px;
      background: rgba(247,134,134,0.10);
      border: 1px solid #F78686;
      border-radius: 3px;
      margin-left: 16px;
    }
    .close-btn{
      float: right;
      margin-right: 10px;
      margin-top: 17px;
      cursor: pointer;
    }
  }
  .alarm-detailInfo{
    .my-title {
      height: 40px;
      font-size:18px;
      font-weight: bold;
      display: inline-block;
      color: #3B4254;
    }
    .remark-icon {
      padding: 7px 3px;
      display: inline-block;
      background: #4a9ef9;
      margin: 20px 10px 0 20px;
    }
    .detail-info {
      line-height: 40px;
      margin-left: 20px;
      .info-left{
        text-align: right;
        display: inline-block;
        margin-right: 6px;
      }
    }
    .alarm-value {
      display: flex;
      justify-content: space-around;
      padding: 30px 0;
      border-top: 1px dashed #DBDDE4;
      .value{
        >p{
          font-size: 32px;
          color:#F78686;
        }
      }
    }
    #alarmLine{
      position: relative;
      margin-left: 30px;
      width: 340px;
      height: 340px;
    }
    .unit{
      position: absolute;
      left: 36px;
      top: 391px;
    }
  }
  .alarm-video{
    .my-title {
      height: 40px;
      font-size:18px;
      font-weight: bold;
      display: inline-block;
      color: #3B4254;
    }
    .remark-icon {
      padding: 7px 3px;
      display: inline-block;
      background: #4a9ef9;
      margin: 20px 10px 0 20px;
    }
    .video{
      width: 350px;
      height: 226px;
      background: #F6F8FB;
      border-radius: 3px;
      margin: 0 0 20px 20px;
    }
  }
}

</style>
