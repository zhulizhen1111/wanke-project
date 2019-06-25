<template>
    <div class="aside-menu">
      <ul>
        <li>
          <router-link  to="summary">
            <i class="iconfont icon-zonglan"></i>
            <span style="padding-left:68px;">安全总览</span>
          </router-link>
        </li>
        <p class="part-line"></p>
         <p class="son-system" style="padding-left:22px;color:rgba(98,105,123,1);font-size:12px;line-height:20px">子系统</p>
        <li>
          <a :href="`http://47.94.89.44:8058/main?id=${$store.state.projectId}`" target="_blank">
           <i class="iconfont icon-anquancanshu"></i>
            <span style="padding-left:68px;">报警子系统</span>
          </a>
        </li>
        <li v-if="Cpeco">
           <a style="padding-left:25px" :href="`${Cpeco}`" target="_blank">
           <i class="iconfont icon-lengzhanlogo"></i>
            <span style="padding-left:44px;">冷站群控系统</span>
          </a>
        </li>
        <li v-if="Mindin">
          <a style="padding-left:25px" :href="`${Mindin}`" target="_blank">
            <i class="iconfont icon-peidianlogo"></i>
            <span style="padding-left:41px;">配电监控系统</span>
          </a>
        </li>
        <!-- <li>
          <router-link  to="detail">
            <i class="iconfont icon-anquancanshu"></i>
            <span>安全参数详情</span>
          </router-link>
        </li>
        <li>
          <router-link  to="history">
            <i class="iconfont icon-dangqianbaojing"></i>
            <span>安全报警历史</span>
          </router-link>
        </li> -->
        <!-- <li>
          <router-link  to="statistics">
            <i class="iconfont icon-tongjifenxiblue"></i>
            <span>报警数据统计分析</span>
          </router-link>
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
      Cpeco:'',
      Mindin:''
    };
  },

  computed: {},

  mounted() {
    this.getSubSystemUrl()
  },

  methods: {
    getSubSystemUrl(){
     axios.get(`/info-mng-backend/config/getSubSystemUrl?projectId=${this.$store.state.projectId}`).then(res=>{
       let data = res.data.data;
       this.Cpeco = data.Cpeco;
       this.Mindin = data.Mindin;
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
        padding: 10px 30px;
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
      width: 50%;
      margin: 10px 0 10px 20px;
    }
    .son-system{
      display: none;
    }
  }
   &:hover .part-line{
      width: 83%;
  }
  &:hover .son-system{
    display: block;
  }
}
</style>
