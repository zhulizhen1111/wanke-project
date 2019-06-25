<template>
  <div class="sa-detail">
     <div class="sa-left">
       <div class="sa-left-top">
            <div class="input-stat">
              <i-Input search v-model="keyword" placeholder="请输入关键字" @on-change="getAlarmEqInfo()"/>
            </div> 
            <div>
              <label for="position">设备位置：</label>
              <i-Select id="position" v-model="position"  style="width:200px" @on-change="getAlarmEqInfo()">
                  <Option v-for="item in roomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </i-Select>
            </div>
             <br/>
             <div>
                <label for="major">设备专业：</label>
                <i-Select id="major" v-model="major"  style="width:200px" @on-change="getAlarmEqInfo()">
                    <Option v-for="item in majorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </i-Select>
             </div>
             <br/><br/>
        </div>
        <div class="sa-left-bottom">
          <p ><strong>总共<span> {{warnList.length}} </span>个符合条件的设备空间：</strong></p>
          <ul>
            <li  v-for="(item,index) in warnList" :key="index" @click="showDetail(item,index)" :class="{activeStyle:index == changeStyle}">{{item.eqObjName}}</li>
          </ul>
        </div>
     </div>
     <div class="sa-right">
       <div class="sa-right-top">
         <p class="eq-info"><strong>{{eqDetail.eqName}}</strong></p>
          <div class="sa-box">
            <div class="warn-num">
              <p class="word-alarm"><span>所属建筑：</span>{{eqDetail.bdName}}</p>  
              <p class="word-alarm"><span>所属空间：</span>{{eqDetail.spName}}</p>  
              <p class="word-alarm"><span>所属专业：</span>{{eqDetail.major}}</p>  
            </div>
            <div class="warn-num">
               <p>当前报警数量</p>
              <span style=" padding-left: 20px;">{{eqDetail.currentAlarmCount}}</span>  
            </div>
            <div class="warn-num">
               <p>当前严重报警(S级/A级)</p>
               <span style=" padding-left: 35px;">{{eqDetail.alarmSACount}}</span>
            </div>
            <div class="warn-num">
               <p>同类设备</p>
               <span>{{eqDetail.similarEqCount}}</span>
            </div>
            <div class="warn-num">
               <p>报警设备</p>
               <span style="padding-left:15px;">{{eqDetail.similarEqAlarmCount}}</span>
            </div>
          </div>
       </div>
       <div class="sa-right-bottom">
         <eq-warn :warnInfo="warnInfo"></eq-warn>
       </div>
     </div>
  </div>
</template>

<script>
import axios from "axios";
import eqWarn from "./EqWarn";
export default {
  components: {
    eqWarn
  },

  mixins: [],

  props: {},
  data() {
    return {
      majorList: [],
      roomList: [],
      model2: "",
      keyword: "",
      major: "",
      position: "",
      roomNum: 26,
      warnList: [
        
      ],
      eqInfo: {},
      warnInfo: [],
      changeStyle: 0,
      eqDetail: {
        eqName:"--",
        bdName:"--",
        spName:"--",
        major:"--",
        currentAlarmCount:"--",
        alarmSACount:"--",
        similarEqCount:"--",
        similarEqAlarmCount:"--"
      },
      majorZH: {}
    };
  },

  computed: {},

  mounted() {
    this.getRoomList();
    this.getMajor();
    this.getAlarmEqInfo();
  },

  methods: {
    //设备位置的获取
    getRoomList() {
      axios
        .get(
          `/info-mng-backend/safe/getFloorList?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          let list = data.list;
          list.forEach(element => {
            element.label = element.value = element.floorName;
          });
          this.roomList = list;
        });
    },
    //设备专业的获取
    getMajor() {
      axios.get(`/info-mng-backend/safe/getMajorList`).then(res => {
        if (res.data.result == "success") {
          let data = res.data.data;
          data.list.forEach(element => {
            element.label = element.value = element.class;
          });
          this.majorList = data.list;
        }
      });
    },
    //设备空间列表的查找
    getAlarmEqInfo() {
      let career = "";
      let floorId = "";
      let keyword = this.keyword;
      //专业的处理
      this.majorList.forEach(el => {
        if (el.class == this.major) {
          career = el.code;
        }
      });
      //楼层Id的处理
      this.roomList.forEach(el => {
        if (el.floorName == this.position) {
          floorId = el.floorId;
        }
      });
      axios
        .get(
          `/info-mng-backend/safe/getAlarmEqInfo?projectId=${this.$store.state.projectId}&major=${career}&floorId=${floorId}&keyword=${keyword}`
        )
        .then(res => {
          let data = res.data.data;
          this.warnList = data.list;
          if(this.warnList.length>0){
              this.eqInfo = data.list;
              if(this.eqInfo){
                this.showDetail(this.eqInfo, this.changeStyle);
                this.initAlarm();
              }  
          }
        });
    },
     //开始时间格式调整
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
    //持续时间格式化
    toHourMinute(minutes){
      return ((Math.floor(minutes/60)>=24?Math.floor(minutes/60/24)+'天'+
      (Math.floor(minutes/60%24)):Math.floor(minutes/60)) + "小时" + (minutes%60) + "分" );
    },
    //右侧报警表格的数据
    showDetail(item, index) {
      this.eqInfo = item;
      let id = item[0].eqObj;
      this.changeStyle = index;
      axios
        .get(
          `/info-mng-backend/safe/getCurrentAlarmList?projectId=${this.$store.state.projectId}&eqId=${id}`
        )
        .then(res => {
          let data = res.data.data;
          data.list.forEach(el=>{
            el.ctime = this.formatTime(el.ctime);
            el.durationTime = this.toHourMinute(el.durationTime);
          })
          this.warnInfo = data.list;
        });
      this.initAlarm();
    },
    //初始报警列表
    initAlarm() {
      let id = this.eqInfo[0].eqObj;
        axios
        .get(
          `/info-mng-backend/safe/getAlarmDetail?projectId=${this.$store.state.projectId}&eqId=${id}`
        )
        .then(res => {
          this.eqDetail = res.data.data;
        });
    }
  }
};
</script>

<style scoped lang="less" >
.sa-detail {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  .sa-left {
    width: 20%;
    padding: 20px 10px;
    margin-right: 10px;
    background: #fff;
    border-radius: 3px;
    min-width: 304px;
    .sa-left-top {
      border-bottom: 1px dashed #dbdde4;
      text-align: center;
      .input-stat {
        width: 270px;
        display: inline-block;
        margin: 30px 0;
      }
    }
    .sa-left-bottom {
      text-indent: 2em;
      > p {
        padding: 10px 0;
        color: #8c94a9;
        > span {
          font-size: 20px;
        }
      }
      ul {
        height: 600px;
        overflow-y: auto;
        li {
          padding: 10px 0;
          cursor: pointer;
          text-indent: 2em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }
        .activeStyle {
          color: #57a4f7;
        }
      }
    }
  }
  .sa-right {
    width: 79.4%;
    display: flex;
    flex-direction: column;
    .sa-right-top {
      padding: 20px;
      background: #fff;
      border-radius: 3px;
      margin-bottom: 10px;
      .eq-info {
        strong {
          font-size: 24px;
        }
        .eq-major {
          padding: 0 37px;
        }
      }
      .sa-box {
        display: flex;
        justify-content: space-around;
        margin: 20px;
        .warn-num {
          text-align: left;
          > span {
            font-size: 40px;
          }
          .word-alarm {
            max-width: 390px;
            word-break: break-all;
          }
        }
      }
    }
    .sa-right-bottom {
      padding: 20px;
      background: #fff;
      border-radius: 3px;
      flex: 1;
    }
  }
}
</style>
<style  lang="less">
.sa-detail {
  .ivu-tabs-bar {
    border: none;
  }
  .ivu-table-large {
    font-size: 16px;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border: none;
    background: #fff;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab:not(:last-child) {
    border-right: 1px solid #ccc;
  }
}
</style>

