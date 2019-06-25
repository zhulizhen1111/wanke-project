<template>
  <div class="st-bottom">
      <div class="st-test">
        <p class="st-title">变压器监测</p>
        <p class="transformer">变压器总数&nbsp;&nbsp;&nbsp;{{transformerCount}} <span style="padding-left:35px">正常</span>&nbsp;&nbsp;&nbsp;{{normalCount || "--"}}</p>
        <div class="st-version">
          <div class="version" v-for="(item,index) in monitoreList" :key="index">
            <p class="type"><i class="iconfont icon-qiangdianzhuanyexitong" style="color:rgba(74, 158, 249, 0.74);margin-right:5px;"></i>{{item.eqName || "--"}}</p>
            <p class="temperature">当前温度:(℃) </p>
            <p>{{parseInt(item.APhaseCoilTemp) || "--"}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{parseInt(item.BPhaseCoilTemp) || "--"}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{parseInt(item.CPhaseCoilTemp) || "--"}}</p>
            <p class="load">负载率:(%)</p>
            <p>{{item.HULoadRate || "--"}}&nbsp;&nbsp;&nbsp;{{item.LULoadRate || "--"}}</p>
          </div>
        </div>
      </div>
      <div class="st-test">
        <p class="st-title">生活水箱监测</p>
        <p class="transformer">生活水箱总数&nbsp;&nbsp;&nbsp;{{lifeWaterTankCount}}<span style="padding-left:35px">正常</span>&nbsp;&nbsp;&nbsp;{{lifeNormalCount || "--"}}</p>
        <div class="st-version">
          <div class="version" v-for="(item,index) in LifeList" :key="index">
            <p class="type"><i class="iconfont icon-shenghuoreshui" style="color:rgba(74, 158, 249, 0.74);margin-right:5px;"></i>{{item.eqName || "--"}}</p>
            <p style="padding:37px 0 20px 0;">水位高度：</p>
            <p><span style="padding-left:20px;">{{parseInt(item.waterSurfaceElevation?item.waterSurfaceElevation:0) || "--"}}%</span></p>
            <i-Progress :percent="parseInt(item.waterSurfaceElevation?item.waterSurfaceElevation:0)" :stroke-width="5" />      
          </div>
        </div>
      </div>
      <div class="st-test">
        <p class="st-title">浸水监测</p>
        <div class="mafan">
          <div class="abnormal">
            <p class="ab-value">{{waterCatch}}</p>
            <span class="ab-style">监测房间数</span>
          </div>
          <div class="normal">
            <p class="no-value">{{waterNomal}}</p>
            <span class="no-style">正常位</span>
          </div>
        </div>
        <p class="current-call">  <img src="/static/img/call.png" alt=""> 当前报警</p>
        <ul v-for="(item,index) in waterLists" :key="index">
            <li>{{item.description}}<span>{{formatTime(item.ctime)}}</span></li>
        </ul>
      </div>
      <div class="st-test">
        <p class="st-title">集水坑监测</p>
        <div class="mafan">
          <div class="abnormal">
            <p class="ab-value">{{catchpitCount}}</p>
            <span class="ab-style">监测水坑数</span>
          </div>
          <div class="normal">
            <p class="no-value">{{normalNum}}</p>
            <span class="no-style">正常位</span>
          </div>
        </div>
        <p class="current-call">  <img src="/static/img/call.png" alt=""> 当前报警</p>
        <ul v-for="(item,index) in list" :key="index">
          <li>{{item.description}}<span>{{formatTime(item.ctime)}}</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      projectId: "${this.$store.state.projectId}",
      transformerCount: "--",    
      normalCount: "--",
      //集水坑
      catchpitCount: "--",
      normalNum: "--",
      list: [
        { description: "地理位置", ctime: "201810111025" },
        { description: "地理位置", ctime: "201810111025" }
      ],
      monitoreList: [],
      lifeWaterTankCount:"--",
      lifeNormalCount: "--",
      LifeList: [],
      waterCatch:"--",
      waterNomal:"--",
      waterLists:[]

    };
  },

  computed: {},

  mounted() {
    this.getTransformerMonitore();
    this.getLifeWaterTankMonitore();
    this.getCatchpitAlarm();
    this.getSoakingWaterAlarm();
  },

  methods: {
    //时间格式转换
    formatTime(str) {
      return (
        str.slice(0, 4) +
        "." +
        str.slice(4, 6) +
        "." +
        str.slice(6, 8) +
        " " +
        str.slice(8, 10) +
        ":" +
        str.slice(10, 12)
      );
    },
    //变压器监测
    getTransformerMonitore() {
      axios
        .get(
          `/info-mng-backend/safe/transformerMonitoring?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.normalCount = data.normalCount;
          this.transformerCount = data.transformerCount;
          this.monitoreList = data.list;
        });
    },
    //生活水箱监测
    getLifeWaterTankMonitore() {
      axios
        .get(
          `/info-mng-backend/safe/lifeWaterTankMonitoring?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.lifeWaterTankCount = data.lifeWaterTankCount;
          this.lifeNormalCount = data.normalCount;
          this.LifeList = data.list;
        });
    },
    //集水坑监测
    getCatchpitAlarm() {
      axios
        .get(
          `/info-mng-backend/safe/getCatchpitAlarm?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.catchpitCount = data.catchpitCount;
          this.normalNum = data.normalCount;
          this.list = data.list;
        });
    },
    //浸水监测
    getSoakingWaterAlarm() {
      axios
        .get(
          `/info-mng-backend/safe/getSoakingWaterAlarm?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.waterCatch = data.soakingWaterSpaceCount;
          this.waterNomal = data.normalCount;
          this.waterLists = data.list;
        });
    }

  }
};
</script>

<style scoped lang="less" >
.st-bottom {
  display: flex;
  .st-test {
    display: inline-block;
    width: 30%;
    margin-right: 0.4%;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    background: #fff;
    .st-title {
      height: 50px;
      line-height: 50px;
      color: #3b4254;
      padding-left: 20px;
      background: #f7f9fc;
      margin-bottom: 30px;
      font-weight: bold;
      font-size: 18px;
    }
    .transformer {
      color: #62697b;
      padding-left: 30px;
    }
    .st-version {
      margin: 10px 20px;
      height: 320px;
      overflow-y: auto;
      .version {
        background: #f6f8fb;
        border-radius: 1px;
        width: 43%;
        padding: 20px 0 20px 12px;
        margin: 12px 12px 12px 0;
        font-size: 14px;
        display: inline-block;
        position: relative;
        .temperature {
          margin-top: 17.2px;
          margin-bottom: 10px;
          color: #62697b;
        }
        .load {
          color: #62697b;
          margin: 10px 0;
        }
      }
    }
  }
  .mafan {
    display: flex;
    margin-bottom: 40px;
    .abnormal {
      width: 50%;
      text-align: center;
      display: inline-block;
      .ab-value {
        font-family: 'ArialMT';
        font-size: 32px;
        color: #3b4254;
        margin: 10px 0 14px 0;
      }
      .ab-style {
        background: rgba(74, 158, 249, 0.74);
        border-radius: 16px;
        display: inline-block;
        width: 88px;
        height: 24px;
        color: #fff;
        line-height: 24px;
      }
    }
    .normal {
      width: 50%;
      text-align: center;
      display: inline-block;
      .no-value {
        font-family: 'ArialMT';
        font-size: 32px;
        color: #3b4254;
        margin: 10px 0 14px 0;
      }
      .no-style {
        background: rgba(115, 218, 153, 0.82);
        border-radius: 16px;
        display: inline-block;
        width: 88px;
        height: 24px;
        line-height: 24px;
        color: #fff;
      }
    }
  }
  .current-call {
    margin-left: 20px;
  }
  ul {
    padding: 18px 30px 0 42px;
    li {
      color: #3b4254;
      border-bottom: 1px dashed #e6e7ec;
      padding: 5px 0;
      > span {
        float: right;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
<style lang="less" >
.st-bottom {
  .ivu-progress-outer {
    transform: rotate(-90deg);
    width: 97px;
    position: absolute;
    left: 60px;
    top: -60px;
  }
}
</style>

