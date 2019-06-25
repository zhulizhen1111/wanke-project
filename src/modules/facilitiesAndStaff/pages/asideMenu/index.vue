<template>
    <div class="aside-menu">
      <ul>
        <li>
          <router-link  to="equipmentView">
           <i class="iconfont icon-zonglan"></i>
            <span style="padding-left:52px;">设备总览</span>
          </router-link>
        </li>
        <li>
          <router-link  to="peopleView">
            <i class="iconfont icon-people"></i>
            <span style="padding-left:52px;">人员总览</span>
          </router-link>
        </li>
        <li>
          <router-link  to="orderInfoView">
             <i class="iconfont icon-gongdan1"></i>
            <span style="padding-left:52px;">工单信息总览</span>
          </router-link>
        </li>
         <p class="part-line"></p>
        <p class="son-system" style="padding-left:22px;color:rgba(98,105,123,1);font-size:12px;line-height:20px">子系统</p>
        <li v-if="meos">
          <a style="padding-left:23px" :href="`${meos}`" target="_blank">
           <i class="iconfont icon-meos"></i>
            <span>设备设施管理系统</span>
          </a>
        </li>
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
       let data = res.data.data;
       this.meos = data.meos;
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
      width: 46%;
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
