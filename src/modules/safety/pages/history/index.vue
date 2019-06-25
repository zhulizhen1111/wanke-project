<template>
  <div class="sa-history">
    <div class="history-top">
        <DatePicker type="daterange" size="large" split-panels :value="value1" format="yyyy/MM/dd"  
         style="width: 270px" @on-change="changeDate">
         </DatePicker>
        <i-Select v-model="model1" size="large" style="width:210px" @on-change="initHistoryWarnTable">
            <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-Select>
        <i-Input size="large" v-model="keyword" placeholder="搜索设备名/空间名/系统名" style="width:auto" @on-change="initHistoryWarnTable">
            <Icon type="ios-search" slot="suffix" />
        </i-Input>
    </div>
    <div >
      <i-Table stripe size="large" :columns="columns1" :data="data1" :no-data-text="noData"></i-Table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      value1: [
        new Date().toLocaleDateString(),
        new Date().toLocaleDateString()
      ],
      model1: "", ///ivu-icon-ios-close-circle
      type: [
        { label: "S级", value: "S" },
        { label: "A级", value: "A" },
        { label: "B级", value: "B" },
        { label: "C级", value: "C" },
        { label: "D级", value: "D" }
      ],
      keyword:"",
      columns1: [
        {
          title: "报警开始时间",
          key: "ctime",
          sortable: true,
        },
        {
          title: "设备名/空间名/系统名",
          key: "spObjName",
        },
        {
          title: "位置",
          key: "bdObjName",
        },
        {
          title: "报警持续时间",
          key: "durationTime", 
        },
        {
          title: "报警级别",
          key: "level",        
        },
        {
          title: "报警描述",
          key: "description",
          className:"description-td",
          width:500,
        }
      ],
      data1: [   
      ],
      noData:
        '<div style="padding-top:204px;height:868px;"><i class="iconfont icon-kongzhuangtaiicon" style="font-size:98px;"></i><p>设备很健康，暂时没有报警数据</p></div>'
    };
  },

  computed: {},

  mounted() {
    this.initHistoryWarnTable();
  },

  methods: {
    //时间的选择
    changeDate(date){
       this.value1 = date;
       this.initHistoryWarnTable();
    },
    //历史报警表格初始化
    initHistoryWarnTable(){
      let level = this.model1;
      let keyword = this.keyword;
      let startTime = this.value1[0].split("/").join("")+"000000";
      let endTime = this.value1[1].split("/").join("")+"235959";
      axios.get(`/info-mng-backend/safe/getHistoryAlarm?projectId=${this.$store.state.projectId}&level=${level}&startTime=${startTime}&endTime=${endTime}&keyword=${keyword}`
      ).then(res=>{
        this.data1 = res.data.data.list
        this.data1.forEach(el=>{
          el.ctime = this.formatTime(el.ctime);
          el.durationTime = this.toHourMinute(el.durationTime);
          el.bdObjName = el.bdObjName+(el.flObjName?"-"+el.flObjName:"");
          if(el.objects[0].startsWith("Sp")){
             el.spObjName = el.spObjName;
          }else if(el.objects[0].startsWith("Eq")){
            el.spObjName = el.eqObjName;
          }else if(el.objects[0].startsWith("Sy")){
             el.spObjName = el.sysObjName;
          }else{
            el.spObjName = ""
          }
        })
      })
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
  }
};
</script>

<style scoped lang="less" >
.sa-history {
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .history-top {
    margin-bottom: 20px;
  }
}
</style>
<style lang="less">
.ivu-table-wrapper {
  border: none;
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
</style>
<style lang="less">
.sa-history {
 .ivu-table-row .description-td>.ivu-table-cell>span{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-height: 100px;
        display: inline-block;
    }
    .ivu-date-picker .ivu-input-wrapper>i{
      display: none;
    }
}
</style>

