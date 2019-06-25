<template>
      <div class="new-active">
        <p class="info">最新动态BBS</p>
        <!-- <div v-if="list.length==0">
           <Spin fix>
                <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div> -->
        <ul>
          <li v-for="(item,index) in list" :key="index" :data-id="item.id" :class="{colorA:index==0&&item.flag==1}">
            <div class="my-left">
              <span class="my-index">{{index+1}}.</span>
              <div class="my-marquee">
                <sgy-marquee ref="sgy-marquee" :hover="true"><span v-if="item.type==1">({{item.workTypeName}}</span>{{item.type=='1'?"工单":"(报警"}}){{item.info}}
                  <button v-if="item.type==1" class="state"
                  :class="(item.orderState==5 || item.orderState==8 || item.orderState==9) ? 'state': (item.orderState==6?'veriy':(item.orderState == 2 ||item.orderState==7? 'grab':'repeal'))">
                  {{item.orderStateName}}</button>
                  <button v-if="item.type==2" class="level">{{item.level}}</button>
                </sgy-marquee>
              </div>
            </div>
            <div class="my-button">
              <span class="username">{{item.executeNames?item.executeNames.toString():""}}</span>
              <span>{{item.createTime}}</span>
              <button class="cancel" v-if="item.flag==1" @click="cancelTop(item)">取消置顶</button>
              <button v-else @click="doTop(item, index)">置顶</button>
            </div>
          </li>
        </ul>   
      </div>
</template>

<script>
import axios from "axios";
import sgyMarquee from './SgyMarquee.vue'
export default {
  components: {sgyMarquee},

  mixins: [],

  props: {
    
  },

  data() {
    return {
      list: [
      
      ],
     
    };
  },

  computed: {
    condition(){
     
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      //最新动态BBS
      axios.get(`/info-mng-backend/bbs/getAll?projectId=${this.$store.state.projectId}`).then(res => {
        this.list = res.data.data;
      });
    }, 
    //置顶数据
    doTop(item, index) {
      let data = {
        id: item.id,
        type:item.type,
        info:item.info,
        createTime:item.createTime
      }
      axios.post(`/info-mng-backend/bbs/stick?projectId=${this.$store.state.projectId}`, data).then(res => {
        if (res.data.result == 'success') {
           this.moveToTop(item,index);
        }
      })
    },
    //取消置顶
    cancelTop(item){
      //调接口，告诉后台取消置顶
      let data = {
        id: item.id,
        type:item.type,
        info:item.info,
        createTime:item.createTime
      }
      axios.post(`/info-mng-backend/bbs/unstick?projectId=${this.$store.state.projectId}`, data).then(res => {
        if (res.data.result == 'success') {
            this.list[0].flag=0;
           
        }
      })

    },
    //置顶效果
    moveToTop(item, index) {
      let el = document.querySelector(`li[data-id="${item.id}"]`)
      let arr = []
      for(let i of this.list) {
        if (i.id === item.id) {
          i.flag = 1
          arr.unshift(i)
        } else {
          i.flag = 0
          arr.push(i)
        }
        this.list = arr
        
      }
     this.$refs['sgy-marquee'].forEach(i => {
       i.init()
     })
    }
  }
};
</script>

<style scoped lang="less" >
.new-active {
  width:68%;
  border: 1px solid #ebecf0;
  background: #fff;
  min-width: 700px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.05);
  border-radius: 3px;
  .info {
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
  ul {
    height: 300px;
    overflow: auto;
    margin: 0 20px;
    li {
      padding: 10px;
      border: 0 solid #f2f2f2;
      color: #62697b;
      display: flex;
      justify-content: space-between;
      .my-left{
        display: flex;
        .my-index {
          display: inline-block;
          padding-right: 5px;
          width: 28px;
      }
      .my-marquee{
        width:400px;
        display:inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .level{
        font-size: 12px;
        height: 24px;
        text-align: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #4A9EF9;
        color: #fff;
        font-weight: bold;
      }
      .state{
        padding: 0 8px;
        font-size: 12px;
        height: 24px;
        text-align: center;
        // border: 1px solid rgba(115,218,153,1);
        border-radius: 14px;
        background: rgba(115,218,153,1);
        color: #fff;
        font-weight: bold;
      }
      .repeal{
        background: rgba(140,148,169,1);
      }
      .grab{
        background: rgba(247,134,134,1);
      }
      .veriy{
        background: rgba(243,225,113,1);
      }
      }
      .my-button {
       float: right;
       padding-right: 20px;
       .username{
         margin-right: 20px; 
       }
        button {
          width: 80px;
          padding: 5px 0;
          background: #4a9ef9;
          border: 0 solid #4a9ef9;
          border-radius: 1px;
          margin-left: 20px;
          color: #fff;
          cursor: pointer;
        }
        .cancel {
          color: #4a9ef9;
          background: #fff;
          border: 1px solid #4a9ef9;
        }
      }
    }
    .colorA{
        color:#4a9ef9;
      }
  }
}
</style>
<style lang="less">
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>

