<template>
 <div class="hover-div">
    <p>空间名称:<span >{{item2.RoomLocalName}}</span></p>
　　<p>{{btnName}}:<span>{{item2.data}}</span></p>
 </div>
</template>

<script>
export default {
  components: {},

  mixins: [],

  props: ["item2", "btnName"],

  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {}
};
</script>

<style scoped lang="less" >
.hover-div {
  background:rgba(0, 0, 0, .6);
  width: 164px;
  height: 64px;
  border: 0 solid #d9d9d9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  color: #fff;
  display: none;
  position: absolute;
  font-size: 12px;
  z-index: 999;
  >p {
   padding: 4px 0 0 10px;
  }
}
</style>
