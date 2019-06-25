<template>
  <div class="staff">
      <div class="bell">
          <p class="info">工单数量</p>
          <div class="clearify">
            <i-Col span="12" style="text-align:center">
              <img class="mg-png" src="/static/img/popularity.png">
              <p class="num">{{cumulativeCount}}</p>
              <p class="total">月累计工单数量（个）</p>
            </i-Col>
            <i-Col span="12" style="text-align:center">
              <img class="mg-png" src="/static/img/bill.png">
              <p class="num">{{completionCount}}</p>
              <p class="total">月完成工单数量（个）</p>
            </i-Col>
          </div>
      </div>

      <div class="popularity">
          <p class="info">人员</p>
          <div class="clearify">
            <i-Col span="12" style="text-align:center">
              <img class="mg-png" src="/static/img/plan-user.png">
              <p class="num">{{planOnJobCount}}</p>
              <p class="total">计划在线人数（人）</p>
            </i-Col>
            <i-Col span="12" style="text-align:center">
              <img class="mg-png" src="/static/img/real-user.png">
              <p class="num">{{actualOnJobCount}}</p>
              <p class="total">实际在线人数（人）</p>
            </i-Col>
          </div>
      </div>
  </div>
</template>

<script>
var echarts = require("echarts");
import axios from "axios";
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      planOnJobCount: "--",
      actualOnJobCount: "--",
      completionCount: "1083",
      cumulativeCount: "1200"
    };
  },

  computed: {},

  mounted() {
    this.getCount();
    this.getData();
  },

  methods: {
    //人员
    getCount() {
      axios
        .get(`/info-mng-backend/saas/getOnJobCount?projectId=${this.$store.state.projectId}`)
        .then(res => {
          let data = res.data.data;
          this.planOnJobCount = data.planOnJobCount;
          this.actualOnJobCount = data.actualOnJobCount;
        });
    },
    //工单数量
    getData() {
      axios
        .get(
          `/info-mng-backend/saas/queryMonthlyWorkOrderStatistics?projectId=${this.$store.state.projectId}`
        )
        .then(res => {
          let data = res.data.data;
          this.cumulativeCount = data.cumulativeCount;
          this.completionCount = data.completionCount;
        });
    }
  }
};
</script>

<style scoped lang="less" >
.staff {
  display: flex;
  flex-direction: column;
  .bell {
    border: 1px solid #ebecf0;
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    .info {
      line-height: 50px;
      background: #f7f9fc;
      border: 0 solid #f2f2f2;
      padding-left: 20px;
      font-size: 18px;
      font-weight: bolder;
      color: #3b4254;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .mg-png {
      padding-top: 81px;
    }
    .num {
      font-family: 'ArialMT';
      font-size: 32px;
      color: #3b4254;
      height: 68px;
    }
    .total {
      color: #8c94a9;
      padding-bottom:67px;
    }
  }
  .popularity {
    border: 1px solid #ebecf0;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
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
    .mg-png {
      padding-top: 78px;
    }
    .num {
      font-family: 'ArialMT';
      font-size: 32px;
      color: #3b4254;
      height: 68px;
    }
    .total {
      color: #8c94a9;
      padding-bottom:62px;
    }
  }
  .clearify::before {
    content: "";
    display: block;
  }
}
</style>
<style lang="less">
.staff {
  .bill {
    .ivu-col {
      display: inline-block;
    }
  }
  .popularity {
    .ivu-col {
      height: 80%;
    }
  }
}
</style>

