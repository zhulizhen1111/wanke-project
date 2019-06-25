<template>
    <div class="aside-menu">
      <ul>
        <li>
          <router-link to="main">
           <i class="iconfont icon-huanjing"></i>
            <span>环境首页</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="plane">
            <i class="iconfont icon-jiancedian"></i>
            <span>环境测点平面布置</span>
          </router-link>
        </li>
        <li>
          <router-link to="mass">
            <i class="iconfont icon-add"></i>
            <span>环境质量分析</span>
          </router-link>
        </li> -->
      </ul>
    </div>
</template>

<script>
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {}
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
  }
}
</style>
