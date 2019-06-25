<template>
    <div class="aside-menu">
      <ul>
        <li v-for="(item, index) in menuList" :key="index">
          <router-link  :to="item.routerLink">
            <img src="item.iconSrc" alt="icon">
            <span>{{item.text}}</span>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  components: {

  },

  mixins: [],

  props: {

  },

  data () {
    return {
      menuList: [
        {
          iconSrc: 'https://',
          text: '能耗首页',
          routerLink: 'main'
        },
      ]
    }
  },

  computed: {

  },

  mounted() {

  },

  methods: {

  },

}
</script>

<style scoped lang="less" >
.aside-menu {
  ul {
    > li {
      &:hover {
        background: #ccc;
      }
      a {
        display: inline-block;
        white-space: nowrap;
        padding: 10px 20px;
        width: 100%;
        span {
          padding-left: 20px;
         }
      }
      .router-link-active {
        background: #ccc;
      }
    }
  }
}
</style>
