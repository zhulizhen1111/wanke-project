<template>
  <div class="en-safe">
      <div class="envir">
          <p class="info">环境</p>
           <div>
             <sgy-healthy-index width="65px" :colors="colors" :innerValue="innerValue"
              :outerValue="outerValue" :innerTdb="innerTdb" :innerRH="innerRH" :innerPM="innerPM" :innerC="innerC"></sgy-healthy-index>
           </div>
      </div>
      <!-- 安全 -->
      <div class="safe">
          <p class="info">安全</p>
          <p class="heal-index"> 当前评分</p>
          <div class="current-safe">
              <div class="my-echarts">
                <i-Circle :percent="grade" size='100'>
                    <span class="demo-Circle-inner" style="font-size:20px">{{grade}}<i style="font-size: 14px;color: #8C94A9;">分</i> </span>
                </i-Circle>
              </div>
              <div class="st-type">
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

  </div>
</template>

<script>
import axios from "axios";
var echarts = require("echarts");
import sgyHealthyIndex from "./SgyHealthyIndex.vue";

export default {
  components: {
    sgyHealthyIndex
  },

  mixins: [],

  props: {},

  data() {
    return {
      colors: ["#F78686", "#FABA53", "#73DA99", "#4A9EF9"],
      innerTdb: 0,
      innerRH: 0,
      innerPM: 0,
      innerC: 0,
      innerValue:55,
      outerValue:70,
      grade:0,
      transformer: 1,
      lifeTank: 1,
      fireWater: 1,
      catchpit: 1,
      soaking: 1,
      eqRoom: 1,
     
    };
  },

  computed: {},

  mounted() {
    this.getData();
    this.getSafetyMark();
    this.getEquipmentException()
  },

  methods: {
    //环境
    getData() {
      axios
        .get(`/info-mng-backend/env/index?projectId=${this.$store.state.projectId}`)
        .then(res => {
          if (res.data.result == "success") {
            let data =  res.data.data
            this.innerTdb =data.indoorAverage.Tdb;
            this.innerRH = data.indoorAverage.RH;
            this.innerPM =data.indoorAverage.PM25;
            this.innerC = data.indoorAverage.CO2;
          }
        });
    },
    //安全
    getSafetyMark(){
      axios.get(`/info-mng-backend/safe/index?projectId=${this.$store.state.projectId}`).then(res=>{
        let data = res.data.data;
        this.grade = data.grade;
      })
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
  }
};
</script>

<style scoped lang="less" >
.en-safe {
  min-width: 360px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  .envir {
    border: 1px solid #ebecf0;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;
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
    > div {
      margin-bottom: 20px;
    }
  }
  .safe {
    border: 1px solid #ebecf0;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    flex:1;
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
    .heal-index {
      padding-left: 20px;
      padding-top: 20px;
      color: #3b4254;
    }
    .current-safe{
      display: flex;
      .my-echarts {
       padding-top: 60px;
       padding-left: 20px;
       height: 100%;
      }
      .st-type {
          display: flex;
          margin-top: 6px;
          margin-left: 20px;
          flex-wrap: wrap;
          .st-status {
            width: 28%;
            height: 100px;
            border: 1px solid #f0f1f5;
            border-radius: 3px;
            display: inline-block;
            margin: 0 10px 14px 0;
            .st-appliance {
              background: #f6f8fb;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              text-align: center;
            }
            .st-result {
              font-size: 14px;
              color: #ff7b7b;
              letter-spacing: 0;
              height: 60px;
              line-height: 60px;
              text-align: center;
              font-weight: bold;
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
}
</style>
