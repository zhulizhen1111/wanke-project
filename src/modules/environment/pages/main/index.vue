<template>
  <div class="ev-index">
     <!-- 顶部按钮 -->
      <div >
        <div class="en-top" style="font-size:0">
          {{this.$store.state.projectId}}
         <div v-if="this.$store.state.projectId=='Pj4419000005'">
            <Button  v-for="(list,index) in btn1"  @click="change(index)" :class="{red:index == changeRed}" :key="index">{{list.a}}</Button>
         </div>
          <div v-else>
            <Button v-for="(list,index) in btn"  @click="change(index)" :class="{red:index == changeRed}" :key="index">{{list.a}}</Button>
          </div>
      </div>
      <!-- 图 -->
      <div class="en-img" >
        <div class="en-top">
          <p class="door-ev">
            室内平均{{btnName}} <span class="indoor-ev">{{indoorAverage?indoorAverage:"--"}}</span> 
            <span class="outdoor-ev">室外平均{{btnName}} </span><span class="indoor-ev">{{outdoor?outdoor:"--"}}</span> 
          </p>
          <div>
            <p class="ev-standard" v-if="activeType=='Tdb'">营业区域温度范围 24℃~26℃</p>
          <!--温度冷标尺 -->
            <div class="ev-scale" v-if="activeType=='Tdb' && seasonType=='coolPeriod'">
              <reference :refer-list="referenceObj[activeType].coldList" :unitText="referenceObj[activeType].unitText"></reference>
            </div>
            <!--温度热标尺 -->
            <div class="ev-scale" v-if="activeType=='Tdb' && seasonType=='heatPeriod'">
              <reference :refer-list="referenceObj[activeType].list" :unitText="referenceObj[activeType].unitText"></reference>
            </div>
            <!-- co2 pm 湿度等标尺 -->
            <div class="ev-scale" v-if="activeType!='Tdb'">
              <reference :refer-list="referenceObj[activeType].list" :unitText="referenceObj[activeType].unitText"></reference>
            </div>
          </div>
        </div>
        <!-- 温度热列表 -->
         <div class="equipment-view" v-if="activeType=='Tdb' && seasonType=='heatPeriod'">
          <div class="floor" v-for="(item1, index1) in myData" :key="index1">
            <div class="ev-floor"  @click="showFloor(item1.id)">
              <p  class="floor-header">{{item1.FloorLocalName}}</p>
              <div>
                <p>{{item1.average?item1.average:""}}</p>
                <p>平均值</p>
              </div>
            </div>
            <div class="ev-room" v-for="(item2, index2) in item1.spaces" :key="index2" @click="showRoom(item2)">
              <p class="room-header" >{{item2.RoomLocalName}}</p>
              <div :style="`background: ${valueToColor(item2.data, referenceObj[activeType].list)}`">{{item2.data}} </div>
            </div>
          </div> 
        </div>
        <!-- 温度冷列表 -->
        <div class="equipment-view" v-if="activeType=='Tdb' && seasonType=='coolPeriod'" >
          <div class="floor" v-for="(item1, index1) in myData" :key="index1" >
           <div class="ev-floor" @click="showFloor(item1.id)">
              <p class="floor-header" >{{item1.FloorLocalName}}</p>
              <div class="floor-center">
                <strong>{{item1.average?item1.average:""}}</strong>
                <p>平均值</p>
              </div>
            </div>
            <div class="rooms">
                <div class="ev-room" v-for="(item2, index2) in item1.spaces" :key="index2" @click="showRoom(item2)">
                  <p class="room-header">{{item2.RoomLocalName}}</p>
                  <div class="room-center" :style="`background: ${valueToColor(item2.data, referenceObj[activeType].coldList)}`">{{item2.data}}</div>
                </div>
            </div>
          </div> 
        </div>

        <!-- co2 pm 湿度的数据颜色渲染 -->
        <div class="equipment-view" v-if="activeType!='Tdb'">
         <div class="floor" v-for="(item1, index1) in myData" :key="index1" >
           <div class="ev-floor" @click="showFloor(item1.id)">
              <p class="floor-header" >{{item1.FloorLocalName}}</p>
              <div class="floor-center">
                <strong>{{item1.average?item1.average:""}}</strong>
                <p>平均值</p>
              </div>
            </div>
            <div class="rooms">
                <div class="ev-room" v-for="(item2, index2) in item1.spaces" :key="index2" @click="showRoom(item2)">
                  <p class="room-header">{{item2.RoomLocalName}}</p>
                  <div class="room-center"  :style="`background: ${valueToColor(item2.data, referenceObj[activeType].list)}`">{{item2.data}} </div>
                </div>
            </div>
          </div> 
        </div>
        
      </div>
      <!-- 底部的两个图 -->
      <div class="en-table" v-if="activeType=='Tdb'&&tableData.length>0">
        <temperature-bar :stat="stat"></temperature-bar>
        <temperature-table :tableData="tableData"></temperature-table>
      </div>
     </div>
  </div>
</template>

<script>
import axios from "axios";
import hoverDiv from "./hoverDiv.vue";
import reference from "../../component/reference.vue";
import temperatureBar from "./temperatureBar.vue";
import temperatureTable from "./temperatureTable.vue";
import valueToColor from "@/utils/vauleToColor.js";
export default {
  components: {
    reference,
    hoverDiv,
    temperatureBar,
    temperatureTable
  },
  mixins: [],
  props: [],
  data() {
    return {
      valueToColor: valueToColor,
      activeType: "Tdb",
      btn1: [
        { a: "温度", type: "Tdb" },
        { a: "湿度", type: "RH" },
        { a: "CO2", type: "CO2" }
      ],
      btn: [
        { a: "温度", type: "Tdb" },
        { a: "湿度", type: "RH" },
        { a: "CO2", type: "CO2" },
        { a: "PM2.5", type: "PM2.5" },
        { a: "甲醛", type: "HCHO" }
        // { a: "情绪", type: "" },
        // { a: "照度", type: "" },
        // { a: "人流量", type: "" }
      ],
      btnName: "温度",
      changeRed: 0,
      myData: [],
      //地下一层数组
      undergroundData:[],
      stat:{},
      tableData:[],
      seasonType:"heatPeriod",
      referenceObj: {
        //温度
        Tdb: {
          unitText: "℃",
          // 热列表
          list: [
            {
              value: 20,
              color: "#7D40CC"
            },
            {
              value: 22,
              color: "#465CCC"
            },
            {
              value: 24,
              color: "#328E2A"
            },
            {
              value: 26,
              color: "#62C85E"
            },
            {
              value: 28,
              color: "#ECF911"
            },
            {
              value: 30,
              color: "#FFB711"
            },
            {
              value: 32,
              color: "#FF3E13"
            }
          ],
          //冷列表
          coldList: [
            {
              value: 20,
              color: "#7D40CC"
            },
            {
              value: 22,
              color: "#465CCC"
            },
            {
              value: 24,
              color: "#328E2A"
            },
            {
              value: 26,
              color: "#62C85E"
            },
            {
              value: 28,
              color: "#ECF911"
            },
            {
              value: 30,
              color: "#FFB711"
            },
            {
              value: 32,
              color: "#FF3E13"
            }
          ],
          //中间列表
          list2: [
            {
              value: -10,
              color: "#3103BC"
            },
            {
              value: 0,
              color: "#36c397"
            },
            {
              value: 10,
              color: "#3305ca"
            },
            {
              value: 20,
              color: "#A87482"
            },
            {
              value: 25,
              color: "#8CD94B"
            },
            {
              value: 30,
              color: "#F0A500"
            },
            {
              value: 40,
              color: "#F01D80"
            }
          ],
          //地下一层列表
          undergroundList: [
             {
              value: 15,
              color: "#7D40CC"
            },
            {
              value: 20,
              color: "#465CCC"
            },
            {
              value: 25,
              color: "#328E2A"
            },
            {
              value: 30,
              color: "#62C85E"
            },
            {
              value: 35,
              color: "#ECF911"
            },
            {
              value: 40,
              color: "#FFB711"
            },
            {
              value: 45,
              color: "#FF3E13"
            }
          ]
        },
        //湿度
        RH: {
          unitText: "%",
          list: [
            {
              value: 0,
              color: "#4ED3FF"
            },
            {
              value: 35,
              color: "#3FFF06"
            },
            {
              value: 45,
              color: "#33F09F"
            },
            {
              value: 55,
              color: "#FFFD8F"
            },
            {
              value: 65,
              color: "#FFDA1D"
            },
            {
              value: 95,
              color: "#FF900B"
            },
            {
              value: 100,
              color: "#FF5704"
            }
          ]
        },
        //co2
        CO2: {
          unitText: "ppm",
          list: [
            {
              value: 0,
              color: "#48A15D"
            },
            {
              value: 450,
              color: "#5EC153"
            },
            {
              value: 700,
              color: "#5EC153"
            },
            {
              value: 1000,
              color: "#FFFE4B"
            },
            {
              value: 2500,
              color: "#E5A136"
            },
            {
              value: 5000,
              color: "#E66039"
            }
          ]
        },
        //pm
        'PM2.5': {
          unitText: "",
          list: [
            {
              value: 0,
              color: "#009966"
            },
            {
              value: 50,
              color: "#FFDE33"
            },
            {
              value: 100,
              color: "#FF9A32"
            },
            {
              value: 150,
              color: "#CD0032"
            },
            {
              value: 200,
              color: "#66009A"
            },
            {
              value: 300,
              color: "#7E0023"
            }
          ]
        },
        //CH2O
        'HCHO': {
          unitText: "mg/m³",
          list: [
            {
              value: 0,
              color: "#009966"
            },
            {
              value: 0.05,
              color: "#FFDE33"
            },
            {
              value: 0.08,
              color: "#FF9A32"
            },
            {
              value: 2,
              color: "#7E0023"
            }
          ]

        }
      },
      indoorAverage: "",
      outdoor: ""
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    //获取数据
    init() {
      this.myData = [];
      this.undergroundData = [];
      axios
        .get(
          `/info-mng-backend/env/indexByType?projectId=${this.$store.state.projectId}&type=${
            this.activeType
          }&${Math.random()}`).then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.indoorAverage = data.indoorAverage?data.indoorAverage:"";
            this.outdoor = data.outdoor?data.outdoor:"";
            this.seasonType = data.seasonType;
            this.myData = data.floors;
            for(var i = 0; i < this.myData.length;i++){
              if(this.myData[i].FloorLocalName == "地下一层"){
                 this.undergroundData.push(this.myData[i]);
                 this.myData.splice(i, 1); //删除下标为i的元素
              }
            }
            this.stat = res.data.stat?res.data.stat:{};
            this.tableData = this.stat.floors?this.stat.floors:[];
          }
        });
    },
    //点击的按钮名称
    change(index) {
      this.changeRed = index;
      this.btnName = this.btn[index].a;
      this.activeType = this.btn[index].type;
      this.init();
    },
    // 传参数 第几层
    showFloor(item1) {
      this.$router.push({ path: "analys", query: { floorId: item1 } });
    },
    //传参数 哪个空间
    showRoom(item2){
      //  this.$router.replace({ path: "heal", query: { objId: item2.id,name:item2.RoomLocalName} });
      window.open(`http://47.94.89.44:8058/vr?id=${item2.id}&pid=${this.$store.state.projectId}`)
    }
  }
};
</script>

<style scoped lang="less" >
.ev-index {
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .en-top {
    text-align: center;
    margin-top:20px;
    button {
      width: 100px;
      line-height: 30px;
      font-size:14px;
      text-align: center;
      display: inline-block;
    }
    .red {
      background: #57a4f7;
      color: #fff;
    }
  }
  .en-img {
    .en-top {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      .door-ev {
        height: 42px;
        line-height: 42px;
        background: #f4f5f8;
        border-radius: 1px;
        padding: 0 20px;
        .indoor-ev {
          color: #57a4f7;
          padding-left: 14px;
        }
        .outdoor-ev {
          padding-left: 40px;
        }
      }
      .ev-standard{
         padding-left:10px;
         margin-right: 200px;
      }
      .ev-scale {
        margin-right: 100px;
      }
    }
    .under-stander{
      float: right;
      margin-right: 200px;
    }
    .equipment-view {
      .floor {
        margin: 40px 0 14px 0;
        display: flex;
        .ev-floor{
          width: 192px;
          height: 140px;
          border-radius: 6px;
          border:1px solid #4A9EF9;
          margin-right: 48px;
          margin-bottom: 16px;
          cursor: pointer;
          .floor-header{
            width: 192px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #4A9EF9;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
          }
          .floor-center{
            background: #fff;
            text-align: center;
            color: #4A9EF9;
            padding-top: 26px;
            strong{
              font-size: 26px;
            }
          }
        }
        .rooms{
           display: flex;
           flex-wrap: wrap;
          .ev-room{
            width: 192px;
            height: 140px;
            border-radius: 6px;
            margin-right: 10px;
            margin-bottom: 15px;
            border: 1px solid #F6F8FB;
            cursor: pointer;
            .room-header{
              height: 40px;
              line-height: 40px;
              text-align: center;
              background: #F6F8FB;
              color: #62697B;
              font-size: 14px;
              cursor: pointer;
            }
            .room-center{
              text-align: center;
              line-height: 100px;
              height: 100px;
              color:#fff;
              font-size: 26px;
              font-weight: bolder
            }
          }
        }
      }
    }
  }
  .en-table {
    display: flex;
    margin-top: 60px;
    .en-good {
      padding-right: 20px;
    }
  }
}
</style>
