<template>
  <div class="my-head">
   
    <div class="vanke">
         <Select v-model="model1" style="width:200px"  @on-change="changeProjectId">
              <Option v-for="item in projects.projects" :value="item.pjId" :key="item.pjId">{{ item.name }}</Option>
          </Select>
    </div>
    <div class="box">
      <div class="left">
      <ul>
        <li><router-link to="/home/">首页</router-link></li>
        <li><router-link to="/staff/">设施人员</router-link></li>
        <li><router-link to="/environment/">环境管理</router-link></li>
        <li><router-link to="/safety/">安全监控</router-link></li>
        <li><a class="hover-active" :href="`${iSagy}`" target="_blank">能源管理</a></li>
        <li><router-link to="/performance/">绩效管理</router-link></li>
      </ul>
       <div class="right">
        <ul>
          <li><i class="iconfont icon-search"></i></li>
          <li><i class="iconfont icon-dangqianbaojing"></i></li>
          <li><i class="iconfont icon-message"></i></li>
          <li><i class="iconfont icon-more"></i></li>
        
          <Dropdown trigger="click" style="margin-left: 20px" @on-click="logout">
            <a href="javascript:void(0)">
               {{userInfo.username}}
                <Icon type="md-arrow-dropdown"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name='logout'>退出登录</DropdownItem>
               
            </DropdownMenu>
        </Dropdown>   
        </ul>
    </div>
    </div>
   
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
export default {
  components: {

  },

  mixins: [],

  props: {

  },

  data () {
    return {
      iSagy:"",
      model1: this.$store.state.projectId
    }
  },

  computed: {
    ...mapState(['projects','projectId','userInfo'])
  },

  mounted() {
    console.log(this.userInfo)
    this.getSubSystemUrl();
    this.model1 = this.$store.state.projectId
  },

  methods: {
    getSubSystemUrl(){
     axios.get(`/info-mng-backend/config/getSubSystemUrl?projectId=${this.$store.state.projectId}`).then(res=>{
       let data = res.data.data;
       this.iSagy = data.iSagy;
     })
   },
   changeProjectId(val){
     location.replace(location.pathname + '?id=' + val)
     this.getSubSystemUrl();
   },
   logout(name){
     if(name == 'logout'){
       axios.get('/info-mng-backend/user/logout').then(res=>{
         console.log(res)
         if(res.data.result=='success'){
           this.$store.commit('setSsoToken', null)
           sessionStorage.setItem('token', null)    
          let ssoServer = 'http://sso.sagacloud.cn'
          // let redirectUrl = 'http://47.94.89.44:8011/home/main'
          let redirectUrl = window.location.protocol + '//' + window.location.host +'/home/main'
          window.location.href = `${ssoServer}/logout?redirectUrl=${redirectUrl}`
         }
            
      })
      }else{
        //修改密码的网络请求
      }    
   }
   
  },

}
</script>

<style scoped lang="less" >
.my-head{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-shadow: 0 1px 2px 0 rgba(11,13,17,0.05);
  width: 100%;
  min-width: 1600px;
  font-size: 20px;
  border: none;
  .my-img{
    width:79px;
    height:100%;
  }
  .vanke{
      display: inline-block;
      height:100%;
      padding: 10px 0 0 80px;
      color:#fff;
      font-size: 33.4px;
      background: #374045;
    }
  .box{
    background: #374045;
    width: 100%;
    height:100%;
    padding-left: 40px;
    display: inline-block;
    .left{
      ul {
        display:inline-block;
        li{
          display: inline-block;
          font-weight: bold;
          color: #fff;
          //font-size: 14px;
          cursor: pointer;
          a{
            display:inline-block;
            padding: 14px 10px;
            color: #fff;
          // font-size: 14px;
            margin: 0 12.5px;
          }
          .router-link-active{
            font-weight: bolder;
            background: #333;
          }
        }
      }
  }
  .right{
     display:inline-block;
     float: right;
     padding-right: 50px;
    ul{
      li{
        display:inline-block;
        padding: 14px 10px;
        //font-size: 14px;
        color:#fff;
        margin: 0 12.5px;
      }
    }
  }
  }
}
</style>
<style lang="less">
.my-head{
  .right{
      .ivu-dropdown-rel{
        >a{
          color: #fff;
        }
      }
      .ivu-select-dropdown{
        .ivu-dropdown-menu{
            display: block;
            color: #000;
             .ivu-dropdown-item {
                display: block;
                color: #000;
              }
          
        }
       
      }
  }
}

</style>

