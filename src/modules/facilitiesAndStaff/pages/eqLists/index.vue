<template>
  <div class="eqLists">
   <div class="room-img">
      <img src="/static/img/backIcon.jpg" alt="" @click="back"><span style="padding-left:32px;"></span>
      <strong>  {{name}}</strong>
    </div>
    <div class="career"> 
        <i-Select id="career" v-model="building" size="large" style="width:190px;height:36px" @on-change="getFloors()">
            <Option v-for="item in buildingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-Select>
        <i-Select v-if="showFloor" id="career" v-model="floors" size="large" style="width:190px;height:36px" @on-change="getLists()">
            <Option v-for="item in floorLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </i-Select>
        <i-Input v-model="keyword" size="large" placeholder="输入关键字搜索" clearable style="width:auto" @on-change="getLists()">
            <Icon type="ios-search" slot="suffix" @click="getLists()" style="color:#2d8cf0;cursor: pointer;"/>
        </i-Input>
    </div>
     <i-Table stripe  :columns="columns1" :data="dataLists" size="large"></i-Table>
  </div>
</template>

<script>
var axios =  require('axios')
export default {
  components: {

  },

  mixins: [],

  props: {

  },

  data () {
    return {
      category:"",
      showFloor:false,
      name:"",
      building:null,
      floors:null,
      buildingList:[],  //建筑列表
      floorLists:[],     //楼层列表
      keyword:null,
      dataLists:[],
      columns1: [
        {
          title: "设备本地编号",
          key: "eId"
        },
        {
          title: "设备本地名称",
          key: "localName"
        },
        {
          title: "安装位置",
          key: "location"
        },
        {
          title: "运行状态",
          key: "runStatus"
        },
        {
          title: "近30天维修次数",
          key: "recentMaintainanceCount",
          sortable: true
        },
        {
          title: "未关闭的工单",
          key: "unclosedWorkorderCount",
          sortable: true
        },
        {
          title: "报警数量 ",
          key: "alarmCount",
          sortable: true
        },
        {
          title: "操作",
          key: "operation",
          className: "table-btn-column",
          render: (h, params) => {
            return h(
              "a",
              {
                props: {                                                                    
                  type: "text",
                  size: "large",
                },
                attrs: {
                    href: `http://47.94.89.44:8058/spread?id=${params.row.id}&pid=${this.$store.state.projectId}`,
                    target: '_black'
                }
              }, "查看详情"
            );
          }
        }
      ],
    }
  },

  computed: {

  },

  mounted() {
    this.getBuildings()
    this.getLists()
  },

  methods: {
    //获取所有建筑及楼层
    getBuildings(){
      let params = {
        criteria:{
          id:this.$store.state.projectId,
          type:["Bd"]
        }
      }
      axios.post(`/info-mng-backend/data-platform-3/fast/object/in_query?projectId=${this.$store.state.projectId}&secret=`,params).then(res=>{
        console.log(res)
        let data = res.data
        if(data.Result == 'success'){
         console.log(data.Content)
          this.buildingList = data.Content
            this.buildingList.forEach(ele=>{ 
              ele.label = ele.infos.BuildLocalName
              ele.value = ele.id
            })
        }
      })
    },
    getFloors(){
      this.showFloor = true;
      let params = {
        criteria:{
          id:this.building,
          type:["Fl"]
        }
      }
      axios.post(`/info-mng-backend/data-platform-3/fast/object/in_query?projectId=${this.$store.state.projectId}&secret=`,params).then(res=>{
        console.log(res)
        let data = res.data
        if(data.Result == 'success'){
         console.log(data.Content)
          this.floorLists = data.Content
            this.floorLists.forEach(ele=>{ 
              ele.label = ele.infos.FloorLocalName
              ele.value = ele.id
            })
        }
      })
    },
    //获得设备列表
    getLists(){
      this.category = this.$route.query.category
      this.name = this.$route.query.name
      let locationId = null
      console.log(this.floors,this.building)
      if(this.floors){
        locationId = this.floors
      }else{
        locationId = this.building
      }
      console.log(locationId)
      let params = {
        category:this.category,
        locationId:locationId,
        keyWord:this.keyword
      }
      this.dataLists = []
      axios.post(`/info-mng-backendeq/getByCategory?projectId=${this.$store.state.projectId}&secret=`,params).then(res=>{
        let data = res.data
        if(data.result == 'success'){
          this.dataLists = data.data
          this.dataLists.forEach(el=>{
            el.eId = el.localId || el.id
          })
        }
        
      })
    },
    back(){
      history.go(-1)
    }

  },

}
</script>

<style scoped lang="less" >
.eqLists{
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  .room-img {
    text-align: left;
    margin-left: 7px;
    position: relative;
    >img {
      position: absolute;
      top: 0;
      cursor: pointer;
    }
    strong{
      font-size: 18px;
    }
  }
  .career {
    margin: 22px 0 20px 0;
  }
}
</style>
<style lang="less">
.eqLists {
  .ivu-tabs-nav-container{
    font-size:16px;
  }
  .ivu-table .ivu-table-tbody .table-info-column {
    color: #faba53;
  }
  .ivu-table-large {
    font-size:16px;
  }
  .ivu-table .ivu-table-tbody .ivu-btn-text {
    color: #57a4f7;
  }
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-select {
    padding-right: 10px;
  }
  .ivu-rate-star {
    margin-right: -4px;
  }
}
</style>
