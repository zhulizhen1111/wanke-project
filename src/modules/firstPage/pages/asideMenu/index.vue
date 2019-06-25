<template>
    <div class="aside-menu">
      <ul>
         <li>
          <router-link to="">
           <i class="iconfont icon-home" style="padding-left:7px;"></i>
            <span style="padding-left:72px;">首页</span>
          </router-link>
        </li>
        <p class="part-line"></p>
        <p class="son-system" style="padding-left:22px;color:rgba(98,105,123,1);font-size:12px;line-height:20px">子系统</p>
        <li v-if="meos">
          <a  :href="`${meos}`" target="_blank">
            <i class="iconfont icon-meos"></i>
            <span style="padding-left:50px;">设备设施管理系统</span>
          </a>
        </li>
        <li v-if="Wellzoom">
           <a  :href="`${Wellzoom}`" target="_blank">
            <i class="iconfont icon-huanjinglogo" style="font-size:14px;"></i>
            <span>环境管理系统</span>
          </a>
        </li>
        <li v-if="Cpeco">
           <a  :href="`${Cpeco}`" target="_blank">
           <i class="iconfont icon-lengzhanlogo"></i>
            <span style="padding-left:44px;">冷站群控系统</span>
          </a>
        </li>
        <li v-if="Mindin">
          <a  :href="`${Mindin}`" target="_blank">
            <i class="iconfont icon-peidianlogo"></i>
            <span style="padding-left:41px;">配电监控系统</span>
          </a>
        </li>
        <li v-if="iSagy">
          <a :href="`${iSagy}`" target="_blank">
           <i class="iconfont icon-nengyuanlogo"></i>
            <span>能源管理系统</span>
          </a>
        </li>
        <li v-if="Finein">
          <a :href="`${Finein}`">
            <i class="iconfont icon-zulinlogo"></i>
            <span style="padding-left:40px;">租户能源管理</span>
          </a>
        </li>
        <!-- <li>
          <a >
            <i class="iconfont icon-add" style="padding-left:7px;"></i>
            <span></span>
          </a>
        </li> -->
      </ul>
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
      Cpeco:"",
      Finein:"",
      Mindin:"",
      Wellzoom:"",
      iSagy:"",
      meos:""
    };
  },

  computed: {},

  mounted() {
    this.getSubSystemUrl();
  },

  methods: {
   getSubSystemUrl(){
     axios.get(`/info-mng-backend/config/getSubSystemUrl?projectId=${this.$store.state.projectId}`).then(res=>{
       console.log(res)
       let data = res.data.data;
      if(data){
          this.Cpeco = data.Cpeco;
          this.Finein = data.Finein;
          this.Mindin = data.Mindin;
          this.Wellzoom = data.Wellzoom;
          this.iSagy = data.iSagy;
          this.meos = data.meos;
      }
     })
   }
  }
};
</script>

<style scoped lang="less" >
.aside-menu {
  ul {
    > li {
      &:hover {
        background: #eee;
      }
      a {
        display: inline-block;
        white-space: nowrap;
        padding: 10px 23px;
        width: 100%;
        color: #b6bccb;
        span {
          padding-left: 37px;
          color: black;
          font-size: 14px;
        }
      }
      .router-link-active {
        background: #57a4f7;
        color: #fff;
        border-left: 3px solid #57a4f7;
        span{
          color: #fff;
        }
      }
    }
    .part-line{
      border: 1px solid #DBDDE4;
      width: 46%;
      margin: 10px 0 10px 20px;
    }
    .son-system{
      display: none;
    }
  }
  &:hover .part-line{
      width: 85%;
    }
  &:hover .son-system{
    display: block;
  }
}
</style>
