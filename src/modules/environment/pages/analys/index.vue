<template>
  <div class="ev-analysis">
    <p class="evPage" ><img src="/static/img/backIcon.jpg" alt="" @click="back"> 环境首页&nbsp;&nbsp;>&nbsp;&nbsp;<span class="spaceName">{{floorname}}</span></p>
     <!-- 上层 -->
    <div class="ev-top">
      <div class="average-index">
          <sgy-healthy-index width="65px" :colors="colors" :innerValue="innerValue"
              :outerValue="outerValue" :innerTdb="innerTdb" :innerRH="innerRH" :innerPM="innerPM" :innerC="innerC"></sgy-healthy-index>
      </div>
      <div class="point-space">
        <span class="remark-icon"></span><p class="my-title">重点关注空间</p>
        <div class="rooms">
          <div class="point-div" v-for="(item,index) in rooms" :key="index">
            <p style="padding:20px 0 10px 20px">{{item.name}}</p>
            <p style="padding:0 0 10px 20px;color: #3B4254;">健康指数： {{item.index}}</p>
            <div style="width:196px;padding-left:20px;word-wrap:break-word;word-break:break-all;">建议：{{item.suggest}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下层 -->
     <div class="ev-bottom">
        <span class="remark-icon"></span><p class="my-title">各区域对比</p>
        <i-Table stripe  size="large" :columns="columns1" :data="data1" ></i-Table>
     </div> 
  </div>
</template>

<script>
import axios from "axios";
import sgyHealthyIndex from "@/modules/firstPage/pages/main/SgyHealthyIndex.vue";
export default {
  components: {
    sgyHealthyIndex
  },

  mixins: [],

  props: {},

  data() {
    return {
      innerValue:55,
      outerValue:70,
      routerParams: "",
      rooms: [
        { name: "会议室", index: "差", suggest: "通风换气，控制人员密度" },
        { name: "会议室", index: "差", suggest: "通风换气，控制人员密度" },
        { name: "会议室", index: "差", suggest: "通风换气，控制人员密度" },
        { name: "会议室", index: "差", suggest: "通风换气，控制人员密度" },
        { name: "会议室", index: "差", suggest: "通风换气，控制人员密度" },
        { name: "会议室", index: "差", suggest: "通风换气，控制人员密度" }
      ],
      columns1: [
        {
          title: "区域",
          key: "name"
        },
        {
          title: "温度",
          key: "Tdb"
        },
        {
          title: "湿度",
          key: "RH"
        },
        {
          title: "空气质量",
          key: "PM25"
        },
        {
          title: "人流量/h",
          key: "ExsitPeopleNum"
        }
      ],
      data1: [],
      colors: ["#F78686", "#FABA53", "#73DA99", "#4A9EF9"],
      floorname: "",
      innerTdb: 0,
      innerC: 0,
      innerRH: 0,
      innerPM: 0
    };
  },

  computed: {},

  mounted() {
    this.getParams();
  },

  methods: {
    back() {
      this.$router.history.go(-1);
    },
    getParams() {
      let routerParams = location.search.split("=")[1];
      axios
        .get(
          `/info-mng-backend/env/floorDetails?projectId=${this.$store.state.projectId}&floorId=${routerParams}`
        )
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.floorname = data.floorname;
            let indoorAverage = data.indoorAverage;
            this.innerTdb = indoorAverage.Tdb;
            this.innerC = indoorAverage.CO2;
            this.innerRH = indoorAverage.RH;
            this.innerPM = indoorAverage.PM25;
            this.data1 = data.spaces;
          }
        });
    }
  }
};
</script>

<style scoped lang="less" >
.ev-analysis {
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  //font-size: 14px;
  .evPage {
    border-bottom: 1px solid #dbdde4;
    height: 60px;
    line-height: 60px;
    display: flex;
    > img {
      height: 30px;
      margin-top: 14px;
      margin-right: 8px;
      cursor: pointer;
    }
    .spaceName {
      color: #3b4254;
      font-weight: bold;
    }
  }
  .ev-top {
    margin-top: 20px;
    display: flex;
    .average-index {
      width: 27%;
      min-width: 357px;
      border: 1px solid #dbdde4;
      border-radius: 3px;
    }
    .point-space {
      width: 73%;
      border: 1px solid #dbdde4;
      border-radius: 3px;
      margin-left: 10px;
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
      .rooms {
        overflow-x: scroll;
        white-space: nowrap;
        .point-div {
          width: 260px;
          height: 148px;
          box-shadow: 0 1px 5px 0 rgba(59, 66, 84, 0.1);
          border-radius: 3px;
          margin: 10px 0 10px 18px;
          display: inline-block;
        }
      }
    }
  }
  .ev-bottom {
    margin-top: 10px;
    padding: 0 20px;
    border: 1px solid #dbdde4;
    border-radius: 3px;
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
}
</style>
