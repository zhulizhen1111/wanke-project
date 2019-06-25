<template>
  <div class="card" v-if="groupByCate">
      <div class="evc-type" v-for="(item,index) in groupByCate" :key="index" @click="getDetailList(item.category,item.name)">
        <p style="height:39px;">{{item.name}}</p>
        <p v-if="isIntacShow">数量：{{item.intactCount}} <span style="padding-left:30px;">总数：{{item.count}}</span> </p>
        <p v-if="isMainShow">数量：{{item.maintainInTime}} <span style="padding-left:30px;">总数：{{item.count}}</span> </p>
        <p v-if="isOverShow">数量：{{item.overdue}} <span style="padding-left:30px;">总数：{{item.count}}</span> </p>
        <p v-if="isShow">数量： {{item.count}} </p>
      </div>
  </div>
</template>

<script>
export default {
  components: {},

  mixins: [],

  props: ["isIntacShow","isMainShow","isOverShow","isShow", "groupByCate"],

  data() {
    return {
    
    };
  },

  computed: {},

  mounted() {},

  methods: {
    getDetailList(category,name){
      console.log(category,name)
       this.$router.push({ path: "eqLists", query: {category:category,name:name} })
    }
  }
};
</script>

<style scoped lang="less" >
.card {
  height: 345px;
  width: 100%;
  background: #f4f5f8;
  padding-top: 18px;
  overflow-y: scroll;
  .evc-type {
    width: 210px;
    height: 90px;
    background: #ffffff;
    border: 0 solid #dbdde4;
    border-radius: 1px;
    margin: 0 20px 20px 20px;
    display: inline-block;
    cursor: pointer;
    p {
      padding: 20px 0 0 20px;
    }
  }
}
</style>
