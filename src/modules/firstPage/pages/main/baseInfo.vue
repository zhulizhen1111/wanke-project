<template>
  <div class="base-info">
      <p class="info">基本信息</p>
      <div class="abstract">
          <img class="info-img" :src="`http://api.sagacloud.cn/dp-auxiliary/image-service/common/image_get?systemId=dataPlatform&key=${picture}`">
          <p class="my-text">{{infoText}}</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      picture:"Pj1101010001_huiyunying.jpg",
      infoText:"",
      a: '<div><h2>报告人：0000</h2><br />4444444444<div>'
    };
  },

  computed: {},

  mounted() {
    this.init();
  },

  methods: {
    //全局projextId的映射
    ...mapMutations(['getProId']),
    //基本信息
    init(){
      axios.get(`/info-mng-backend/config/getPresentation?projectId=${this.$store.state.projectId}`).then(res=>{
        let data = res.data.data;
        this.infoText = data.presentation;
        this.picture = data.picture;
      })
    }
  }
};
</script>

<style scoped lang="less" >
.base-info {
  width: 32.8%;
  border: 1px solid#ebecf0;
  background: #fff;
  margin-right: 10px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  min-width: 528px;
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
  .abstract {
    padding: 20px;
    display: flex;
    .info-img {
      min-width: 188px;
      height: 232px;
    }
    .my-text {
      display: inline-block;
      padding-left: 20px;
      text-indent: 2em;
    }
  }
}
</style>
