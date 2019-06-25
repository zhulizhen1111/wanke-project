<template>
  <div class="eq-warn">
    <div class="alarm-top">
        <span @click="getAlarmData(0)" :class="{active: activeIndex== 0}">当前报警</span>
        <span @click="getAlarmData(1)" :class="{active: activeIndex== 1}">尚未处理的报警</span>
        <span @click="getAlarmData(2)" :class="{active: activeIndex== 2}">近20条报警</span>
    </div>
     <i-Table stripe  :columns="columns1" height="590" :data="warnInfo" size="large" @on-row-click="changeDetail" :no-data-text="noData"></i-Table>
     <div class="mask">
        <div class="mask-bg" @click="closeMask"></div>
        <div class="mask-lay" :style="`width:${maskWidth}`">
            <alarm-report :maskWidth="maskWidth" @closeMask="closeMask"></alarm-report>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import alarmReport from "./AlarmReport";
export default {
  components: {
    alarmReport
  },

  mixins: [],

  props: ["warnInfo"],

  data() {
    return {
      activeIndex: 0,
      maskWidth: "0px",
      id: "",
      noData:
        '<div style="padding-top:204px;height:868px;"><i class="iconfont icon-kongzhuangtaiicon" style="font-size:98px;"></i><p>此设备没有尚未处理的报警</p></div>',
      columns1: [
        {
          title: "报警等级",
          key: "level",
          render:(h,params)=>{
           const row = params.row;
           console.log(row)
           const backgroundColor = row.level == 'S'? 'error' : row.level == 'A'?'warning':'primary'
           return h('Button',{
             props:{
               type:backgroundColor
             }
           },row.level)
          }
        },
        {
          title: "报警开始时间",
          key: "ctime", 
        },
        {
          title: "报警持续时间",
          key: "durationTime",
        },
        {
          title: "报警详情",
          key: "description",
          width:400,
          className:"description-td",
        },
        {
          title: "状态",
          key: "state",
        },
      ]
    };
  },

  computed: {},

  mounted() {},

  methods: {
    //关闭弹窗
    closeMask() {
      document.querySelector(".mask-bg").style.display = "none";
      document.querySelector("body").style.overflow = "auto";
      this.maskWidth = "0px";
    },
    //详情弹窗
    changeDetail(item, index) {
      this.id = item.id;
      document.querySelector(".mask-bg").style.display = "block";
      document.querySelector("body").style.overflow = "hidden";
      this.maskWidth = "450px";
    },
    getAlarmData(index) {
      this.activeIndex = index;
    }
    //报警level样式
  }
};
</script>

<style scoped lang="less" >
.eq-warn {
  .alarm-top {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    span {
      text-align: center;
      padding: 6px 20px;
      color: #62697b;
      cursor: pointer;
      border: 1px solid #cacaca;
      border-right: none;
      &:last-child {
        border-right: 1px solid #cacaca;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }
      &:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      &:hover,
      &.active {
        background: #57a4f7;
        color: #fff;
      }
    }
  }
  .cell-class-name > .ivu-table-cell > span {
    display: inline-block;
    width: 24px;
    height: 24px;
    color: #fff;
    border-radius: 50%;
  }
  .mask {
    .mask-bg {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999;
      display: none;
    }
    .mask-lay {
      position: fixed;
      top: 50px;
      bottom: 0;
      right: 0;
      z-index: 999;
      background: #fff;
      transition: all 0.5s ease-in-out;
      overflow-y: auto;
      box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
<style lang="less">
.eq-warn {
  .ivu-table-row td:first-of-type .ivu-table-cell > button {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    font-size: 16px;
    line-height:16px;
  }
  .ivu-table-row td:first-of-type .ivu-table-cell>button>span{
    margin-left:-4px;
  }
 .ivu-table-row .description-td>.ivu-table-cell>span{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-height: 100px;
        display: inline-block;
    }
}
</style>

