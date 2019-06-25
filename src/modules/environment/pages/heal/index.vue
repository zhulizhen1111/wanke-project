<template>
  <div class="ev-heal">
     <div class="sa-left">
       <div class="sa-left-top">
             <div class="room-img">
               <img src="/static/img/backIcon.jpg" alt="" @click="back"><span style="padding-left:32px;">环境首页</span>
                ><strong>{{name}}</strong>
             </div>
            <div class="input-stat">
              <i-Input search size="large" v-model="keyword" placeholder="请输入关键字" @on-change="getEvRoom()"/>
            </div> 
            <div>
              <label for="position">所属建筑：</label>
              <i-Select id="position" v-model="building" size="large" style="width:200px" @on-change="getEvRoom()">
                  <Option v-for="item in buildList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </i-Select>
            </div>
             <br/>
             <div>
                <label for="major">所属楼层：</label>
                <i-Select id="major" v-model="floor" size="large" style="width:200px" @on-change="getEvRoom()">
                    <Option v-for="item in floorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </i-Select>
             </div>
             <br/><br/>
        </div>
        <div class="sa-left-bottom">
          <p><strong>总共<span> {{roomList.length}} </span>个符合条件的设备空间：</strong></p>
          <ul>
            <li  v-for="(item,index) in roomList" :key="index" @click="showDetail(item,index)" :class="{activeStyle:index+1 == changeStyle}">{{item.spObjName}}</li>
          </ul>
        </div>
     </div>
     <div class="sa-right">
       <div class="sa-right-top">
         <p class="eq-info" v-if="flag"><strong>{{roomLeftName.spObjName}}</strong></p>
         <p class="eq-info" v-else><strong>{{name}}</strong></p>        
          <div class="sa-box">
            <div class="warn-num">
               <p>当前空间报警</p>
              <span style="padding-left:20px;">{{roomDetail.spAlarmCount}}</span>  
            </div>
            <div class="warn-num">
               <p>当前空间严重报警(S级/A级)</p>
               <span style="padding-left:50px;">{{roomDetail.spAlarmSACount}}</span>
            </div>
            <div class="warn-num">
               <p>空间内包含 {{roomDetail.spEqCount}} 台设备</p>
               <i>报警设备</i><span style="padding:0 8px;">{{roomDetail.spAlarmEqCount}}</span> 
               <i style="margin-left:50px">严重报警</i><span style="padding:0 8px;">{{roomDetail.spAlarmEqSACount}}</span>
            </div>
          </div>
       </div>
       <div class="sa-right-bottom">
         <room-table :roomDate="roomDate" :roomLeftName="roomLeftName" @spAlarm="spAlarm"></room-table>
       </div>
     </div>
  </div>
</template>

<script>
import axios from "axios";
import roomTable from './RoomTable'
export default {
  components: {
      roomTable
  },

  mixins: [],

  props: {},
  data() {
    return {
      floorList: [],
      buildList: [],
      model2: "",
      keyword: "",
      building: "",
      floor: "",
      roomList:[],
      roomLeftName:{
        spObjName:"--"
      },
      changeStyle: 0,
      roomDetail: {
        spAlarmCount:"--",
        spAlarmSACount:"--",
        spAlarmEqSACount:"--",
        spAlarmEqCount:"--",
        spEqCount:"--"
      },
      roomDate:[],
      flag:false,
      checkVal:false,
      name:"--"
    };
  },

  computed: {},

  mounted() {
    this.getRooomInfo();
    this.getFloorList();
    this.getbuildList();
    this.getEvRoom();
  },

  methods: {
    //接收子组件传过来的值
    spAlarm(val){
      this.checkVal = val;
    },
    //获取空间报警数据
    getCurrentSpaceAlarm(roomId){
      let checkVal = this.checkVal;
      axios.get(`/info-mng-backend/env/getCurrentSpaceAlarm?projectId=${this.$store.state.projectId}&spId=${roomId}&isOnlySpAlarm=${checkVal}`).then(res=>{
        let data = res.data.data;
        this.roomDate = data.list;
        data.list.forEach(el=>{
          el.ctime = this.formatTime(el.ctime);
          el.durationTime = this.toHourMinute(el.durationTime)
        })
      })
    },
    //空间报警信息
    getSpaceDetail(roomId){
      axios.get(`/info-mng-backend/env/getSpaceDetail?projectId=${this.$store.state.projectId}&spId=${roomId}`).then(res=>{
        this.roomDetail = res.data.data;
      })
    },
    //首次空间报警信息数据
    getRooomInfo() {
      console.log(location.search,this.$route.query.name)
      this.name = this.$route.query.name;
      let routerParams = location.search.split("=")[1];
      console.log(routerParams)
      this.getSpaceDetail(routerParams);
      this.getCurrentSpaceAlarm(routerParams)
    },
    //回退
    back() {
      this.$router.push('/environment/main')
    },
    //所属楼层
    getFloorList() {
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
          this.floorList = list;
        });
    },
    //所属建筑
    getbuildList() {
      axios
        .get(
          `/info-mng-backend/env/getBuildingList?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          let list = data.list;
          list.forEach(element => {
            element.label = element.value = element.infos.BuildLocalName;
          });
          this.buildList = list;
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
    //设备空间按条件查找
    getEvRoom() {
      let buildId = "";
      let floorId = "";
      let keyword = this.keyword;
      this.buildList.forEach(el => {
        if ((el.BuildLocalName = this.building)) {
          buildId = el.id;
        }
      });
      this.floorList.forEach(el => {
        if ((el.floorName = this.floor)) {
          floorId = el.floorId;
        }
      });
      axios
        .get(
          `/info-mng-backend/env/getSpaceInfo?projectId=${this.$store.state.projectId}&floorId=${floorId}&buildingId=${buildId}&keyword=${keyword}`
        )
        .then(res => {
          let data = res.data
          if(data.result=='success'){
             this.roomList = data.data.list
          }
        });
    },
    //左侧点击展示右侧数据事件
    showDetail(item, index) {
      this.flag = true;
      this.roomLeftName = item;
      this.changeStyle = index+1;
      this.getSpaceDetail(item.spObj);
      this.getCurrentSpaceAlarm(item.spObj)
    },
  }
};
</script>

<style scoped lang="less" >
.ev-heal {
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
      .room-img {
        text-align: left;
        margin-left: 7px;
        position: relative;
        > img {
          position: absolute;
          top: -4px;
        }
      }
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
            //  >span{
            //    display: inline-block;
            //    width: 70px;
            //    height: 32px;
            //    text-align: right;
            //  }
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
.ev-heal{
  .ivu-tabs-bar {
    border: none;
  }
  .ivu-table-large{
    font-size:16px;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border: none;
    background: #fff;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab:not(:last-child) {
    border-right: 1px solid #ccc;
  }
  .ivu-table-row td:first-of-type .ivu-table-cell>span{
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      color: #fff;
      background:  #F78686;
      text-align: center;
      line-height: 24px;
  }
 
}
</style>

