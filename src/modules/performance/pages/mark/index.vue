<template>
  <div class="pe-mark">
      <div class="kpi-top">
        <DatePicker type="month" size="large" placeholder="2017-11" style="width: 270px"></DatePicker>
      </div>
       <div class="kpi-bottom">
         <img src="/static/img/kpi.jpg" alt="">
       </div>
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
.pe-mark{
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .kpi-top {
      margin-bottom: 20px;
    }
    .kpi-bottom {
      height: 700px;
  }
}

</style>
