<template>
  <div>
      <span v-for="(item,index) in star" :key="index">☆</span>
  </div>
</template>

<script>
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      star: 4,
      score: 3.3
    };
  },

  computed: {
    star() {
      let result = [];
      let newScore = this.score % 1 !== 0;
      if (newScore == true) {
        this.score = Math.floor(this.score) + 1;
      }
    }
  },

  mounted() {},

  methods: {}
};
</script>

<style scoped lang="less" >
</style>
