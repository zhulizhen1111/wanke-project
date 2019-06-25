<template>
  <div class="people-view">
      <Tabs value="name1">
        <TabPane :label="`人员总数 ${personTotal}人`"  name="name1">
          <online-people @showPeopleDetail="showPeopleDetail" @showData="showData"></online-people>
        </TabPane>
        <TabPane :label="`今日计划出勤人数：${planAttendance}人  今日实际出勤人数：${actualAttendance}人`" name="name2">
           <worker></worker>
        </TabPane>    
    </Tabs>
    <div class="mask-layer" @click="closeAnimation"></div>
    <div v-if="Object.keys(orderStat).length>0">
      <online-people-detail :maskWidth="maskWidth" @closePeopleDetail="closePeopleDetail" :everyPeople="everyPeople" :orderStat="orderStat"></online-people-detail>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import onlinePeople from "./OnlinePeople.vue";
import worker from "./Worker.vue";
import OnlinePeopleDetail from "./OnlinePeopleDetail.vue";
export default {
  components: {
    onlinePeople,
    worker,
    OnlinePeopleDetail
  },

  mixins: [],

  props: {},

  data() {
    return {
      maskWidth: "0px",
      everyPeople: {},
      personTotal: "--",
      planAttendance: '--',
      actualAttendance: '--',
      detailData: [],
      orderStat:{},
    };
  },

  computed: {},

  mounted() {
    this.getNumber();
  },

  methods: {
    //关闭弹窗
    closeAnimation(){
       document.querySelector("body").style.overflow = "auto";
      document.querySelector('.mask-layer').style.display = 'none';
      this.maskWidth = "0px";
    },
    //计划人数
    getNumber() {
      axios
        .get(
          `/info-mng-backend/saas/queryPersonStatisticCount?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          if (res.data.result == "success") {
            let data = res.data.data;
            this.personTotal = data.personTotal;
            this.planAttendance = data.planAttendance;
            this.actualAttendance = data.actualAttendance;
          }
        });
    },
    //弹窗数据
    showPeopleDetail(index) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector('.mask-layer').style.display = 'block'
      this.maskWidth = "458px";
      axios
        .get(
          `/info-mng-backend/saas/queryPersonDetailById?projectId=${this.$store.state.projectId}&personId=${index}`
        )
        .then(res => {
          if (res.data.result == "success") {
            this.everyPeople = res.data.data;
          }
        });
        this.queryPersonDetailWoStatById(index);
    },
    queryPersonDetailWoStatById(personId){
      axios
        .get(
          `/info-mng-backend/saas/queryPersonDetailWoStatById?projectId=${this.$store.state.projectId}&personId=${personId}`
        )
        .then(res => {
          if (res.data.result == "success") {
            this.orderStat = res.data.data
          }
        });
    },
    //关闭弹窗
    closePeopleDetail() {
      document.querySelector("body").style.overflow = "auto";
      document.querySelector('.mask-layer').style.display = 'none'
      this.maskWidth = "0px";
    },
    //查看详情事件
    showData(msg) {
      this.detailData = msg;
    }
  }
};
</script>

<style scoped lang="less" >
.people-view {
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .mask-layer{
    position: fixed;
    top: 0;
		left: 0;
		right: 0;
    bottom: 0;
    z-index: 999;
    display: none;
  }
}
</style>
<style lang="less">
.people-view {
  .ivu-tabs .nav-text {
    padding-bottom: 20px;
    color: #3b4254;
  }
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-tabs-nav-container{
    font-size:16px;
  }
  .ivu-table:before {
    height: 0;
  }
  .ivu-table:after {
    width: 0;
  }
  .ivu-table td,
  .ivu-table th {
    border: none;
  }
}
</style>

