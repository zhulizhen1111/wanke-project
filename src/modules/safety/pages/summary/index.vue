<template>
  <div class="st-summary">
    <!-- <div v-if="grade==0">
        <Spin fix>
            <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div> -->
    <div class="st-top">
        <div class="st-score">
        <p class="st-p">当前评分</p>
        <div class="st-div">
          <div class="st-box" :class="classObject">{{grade}}</div>
          <div class="st-type">
            <p class="st-detection"></p>
            <div class="st-status">
              <p class="st-appliance">变压器</p>
              <div class="st-result" ><a :class="transformer==0?'classA':'classB'" :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">{{transformer==0?'异常':'正常'}}</a></div>
            </div>
            <div class="st-status">
              <p class="st-appliance">生活水箱</p>
              <div class="st-result" ><a :class="lifeTank==0?'classA':'classB'" :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">{{lifeTank==0?'异常':'正常'}}</a></div>
            </div>
            <div class="st-status">
              <p class="st-appliance">消防水压</p>
              <div class="st-result" ><a :class="fireWater==0?'classA':'classB'" :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">{{fireWater==0?'异常':'正常'}}</a></div>
            </div>
            <div class="st-status">
              <p class="st-appliance">集水坑</p>
              <div class="st-result" ><a :class="catchpit==0?'classA':'classB'" :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">{{catchpit==0?'异常':'正常'}}</a></div>
            </div>
            <div class="st-status">
              <p class="st-appliance">浸水检测</p>
              <div class="st-result" ><a :class="soaking==0?'classA':'classB'" :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">{{soaking==0?'异常':'正常'}}</a></div>
            </div>
            <div class="st-status">
              <p class="st-appliance">设备房</p>
              <div class="st-result"><a :class="eqRoom==0?'classA':'classB'" :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">{{eqRoom==0?'异常':'正常'}}</a></div>
            </div>

          </div>
        </div>
      </div>
      <div class="st-warn">
        <!-- <button class="st-btn">报警详情</button> -->
        <p class="st-p">当前报警</p>
          <div class="st-call">
            <div class="st-div">
              <p class="st-grade"><img src="/static/img/Sicon.png" alt=""> S级报警</p>
              <p class="st-number">{{gradeS}}</p>
              <p class="st-describ">严重故障：会导致停机、设备损坏等问题的严重故障；计入设备、系统故障时间统计；</p>
            </div>
            <div class="st-div">
              <p class="st-grade"><img src="/static/img/Aicon.png" alt=""> A级报警</p>
              <p class="st-number">{{gradeA}}</p>
              <p class="st-describ">故障：会导致运行故障，但不会引起严重的系统问题，影响范围有限。例如单个污水坑报警；计入设备、系统故障时间统计；</p>
            </div>
            <div class="st-div">
              <p class="st-grade"><img src="/static/img/Bicon.png" alt=""> B级报警</p>
              <p class="st-number">{{gradeB}}</p>
              <p class="st-describ">一般问题：不会导致停机，但对安全运行会造成风险的一般报警。例如房间温度过高，传感器不正常等；不计入故障时间统计；</p>
            </div>
          </div>
      </div>
    </div>
    <div class="st-middle">
      <div class="st-left">
        <p class="st-title">消防水压检测</p>
        <div>
          当前水压
          <p class="st-gage"><span class="font-style">{{fireWaterOutPress}}</span>  Mpa</p>
        </div>
      </div>
      <div class="st-right">
        <p class="st-title">设备房温湿度监测</p>
        <div class="st-table" v-if="data2.length>0">
          <table class="ivu-table-wrapper ivu-table ivu-table-large ivu-table-border ivu-table-stripe" style="position:relative">   
              <div class="ov-div">
                <table class="fixed-table">
                  <colgroup></colgroup> 
                  <tr class="ivu-table-row">
                    <td class="ivu-table-cell fixed-td" >设备房名称</td>
                    <td class="ivu-table-cell" v-for="(item,index) in data2" :key="index">{{item.RoomLocalName}}</td>
                  </tr>
                  <tr class="ivu-table-row">
                    <td class="ivu-table-cell fixed-td">温度(℃)</td>
                    <td class="ivu-table-cell" v-for="(item,index) in data2" :key="index">{{item.Tdb}}</td>
                  </tr>
                  <tr class="ivu-table-row">
                    <td class="ivu-table-cell fixed-td">湿度(%)</td>
                    <td class="ivu-table-cell" v-for="(item,index) in data2" :key="index">{{item.RH}}</td>
                  </tr>
                </table>
               </div>
          </table>
        </div>
      </div>
    </div>
    <detect></detect>
  </div>
</template>

<script>
import detect from "./detect.vue";
import axios from "axios";
export default {
  components: { detect },

  mixins: [],

  props: {},

  data() {
    return {
      projectId: "${this.$store.state.projectId}",
      grade: 0,
      gradeS: "--",
      gradeA: "--",
      gradeB: "--",
      gradeC: "--",
      transformer: 1,
      lifeTank: 1,
      fireWater: 1,
      catchpit: 1,
      soaking: 1,
      eqRoom: 1,
      fireWaterOutPress: "--",
      data2:[
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50},
        // {RoomLocalName:"3F-5号给水井",Tdb:17,RH:50}
      ],
    };
  },

  computed: {
    classObject: function() {
      if (this.grade <= 59) {
        return "backendA";
      } else if (this.grade <= 84) {
        return "backendC";
      } else {
        return "backendB";
      }
    }
  },

  mounted() {
    this.getSafetyMark();
    this.getWarnInfo();
    this.getWaterOutPress();
    this.getEquipmentException();
    this.getEqRoomMonitoring();
  },

  methods: {
    //当前评分
    getSafetyMark() {
      axios
        .get(`/info-mng-backend/safe/index?projectId=${this.$store.state.projectId}`)
        .then(res => {
          let data = res.data.data;
          this.grade = data.grade;
        });
    },
    //当前报警
    getWarnInfo() {
      axios
        .get(
          `/info-mng-backend/safe/alarmStatistics?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.gradeS = data.S;
          this.gradeA = data.A;
          this.gradeB = data.B;
          this.gradeC = data.C;
        });
    },
    //消防水压检测
    getWaterOutPress() {
      axios
        .get(
          `/info-mng-backend/safe/fireWaterOutPress?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.fireWaterOutPress = data.fireWarterOutPress;
        });
    },
    //当前评分中的各项设备是否正常
    getEquipmentException() {
      axios
        .get(
          `/info-mng-backend/safe/equipmentException?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.transformer = data.transformer;
          this.lifeTank = data.lifeTank;
          this.fireWater = data.fireWater;
          this.catchpit = data.catchpit;
          this.soaking = data.soaking;
          this.eqRoom = data.eqRoom;
        });
    },
    //设备房
    getEqRoomMonitoring(){
      axios.get(`/info-mng-backend/safe/getEqRoomMonitoring?projectId=${this.$store.state.projectId}`).then(res=>{
        let data = res.data.data;
        this.data2 = data.list
      })
    }
  }
};
</script>

<style scoped lang="less" >
.st-summary {
  .st-top {
    display: flex;
    .st-score {
      width: 66.4%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
      border-radius: 3px;
      display: inline-block;
      margin-right: 10px;
      background: #fff;
      .st-p {
        height: 50px;
        line-height: 50px;
        background: #f7f9fc;
        border: 0 solid #f2f2f2;
        font-weight: bold;
        font-size: 18px;
        color: #3b4254;
        padding-left: 20px;
      }
      .st-div {
        display: flex;
        .st-box {
          width: 14.8%;
          height: 180px;
          border-radius: 8px;
          color: #fff;
          font-size: 42px;
          font-weight: bold;
          text-align: center;
          line-height: 180px;
          margin: 30px 3.3% 0 3.3%;
          display: inline-block;
        }
        .backendC {
          background: yellow;
        }
        .backendA {
          background: #ff7b7b;
        }
        .backendB {
          background: #73da99;
        }
        .st-type {
          display: inline-block;
          width: 75.2%;
          margin-top: 6px;
          .st-detection {
            padding: 20px 0 18px 0;
            font-weight: bold;
            font-size: 16px;
            color: #ff7b7b;
          }
          .st-status {
            width: 14%;
            height: 140px;
            border: 1px solid #f0f1f5;
            border-radius: 3px;
            display: inline-block;
            margin: 0 14px 14px 0;
            .st-appliance {
              background: #f6f8fb;
              height: 40px;
              line-height: 40px;
              text-align: center;
            }
            .st-result {
              font-size: 26px;
              color: #ff7b7b;
              letter-spacing: 0;
              height: 100px;
              line-height: 100px;
              text-align: center;
            }
            .classA {
              color: #ff7b7b;
            }
            .classB {
              color: #73da99;
            }
          }
        }
      }
    }
    .st-warn {
      width: 32.8%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
      border-radius: 3px;
      display: inline-block;
      background: #fff;
      .st-p {
        height: 50px;
        line-height: 50px;
        background: #f7f9fc;
        border: 0 solid #f2f2f2;
        font-weight: bold;
        font-size: 18px;
        color: #3b4254;
        padding-left: 20px;
        .st-btn {
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #4a9ef9;
          border-radius: 3px;
          font-size: 14px;
          color: #4a9ef9;
          background: #fff;
          float: right;
          margin-top: 9px;
          cursor: pointer;
          margin-right: 10px;
        }
      }
      .st-call {
        display: flex;
        .st-div {
          flex: 1;
          display: inline-block;
          padding: 30px 3.5% 0 3.5%;
          //border: 0 solid #f2f2f2;
          .st-grade {
            font-size: 14px;
            color: #62697b;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              padding-right: 6px;
            }
          }
          .st-number {
            font-size: 32px;
            color: #3b4254;
            text-align: center;
            padding: 10px 0 16px 0;
          }
          .st-describ {
            font-size: 12px;
            color: #8c94a9;
            line-height: 20px;
            overflow: hidden;
          }
        }
      }
    }
  }
  .st-middle {
    display: flex;
    margin: 10px 0;
    .st-left {
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
      border-radius: 3px;
      height: 280px;
      width: 15%;
      display: inline-block;
      margin-right: 0.5%;
      background: #fff;
      .st-title {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size: 18px;
        color: #3b4254;
        background: #f7f9fc;
        padding-left: 20px;
      }
      div {
        padding: 30px 0 0 20px;
        color: #62697b;
        .st-gage {
          margin-top: 48px;
          text-align: center;
          .font-style {
            font-size: 32px;
            color: #3b4254;
          }
        }
      }
    }
    .st-right {
      display: inline-block;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
      border-radius: 3px;
      height: 280px;
      width: 85%;
      background: #fff;
      .st-title {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size: 18px;
        color: #3b4254;
        padding-left: 20px;
        background: #f7f9fc;
        margin-bottom: 20px;
      }
      .st-table {
        padding-left: 50px;
        padding-right: 20px;
        .ov-div{
          width:100%;
          overflow-x:scroll;
        }
        .fixed-table{
          width:120%;
          table-layout: fixed;
        }
        .fixed-td{
          position:absolute;
          width:20%;
          line-height: 60px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.st-summary {
  .ivu-progress-text {
    display: none;
  }
  .ivu-progress-inner {
    background: #dfe7f0;
    border-radius: 10px;
  }
  .ivu-progress-show-info .ivu-progress-outer {
    padding-right: 0;
  }
}
</style>

