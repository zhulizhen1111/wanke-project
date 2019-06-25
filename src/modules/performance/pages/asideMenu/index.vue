<template>
    <div class="aside-menu">
      <ul>
        <li>
          <router-link  to="kpi">
            <i class="iconfont icon-qushi"></i>
            <span>人员绩效</span>
          </router-link>
        </li>
        <li>
          <router-link  to="mark">
            <i class="iconfont icon-xiangmudafenbiao"></i>
            <span>项目绩效</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link  to="suggest">
            <i class="iconfont icon-huiyuanmanyidu"></i>
            <span>客户满意度</span>
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
        color: #bcbccb;
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
