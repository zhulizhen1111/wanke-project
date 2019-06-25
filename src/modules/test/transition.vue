<template>
  <div id="demo">
      <button @click="show=!show">Toggle</button>
      <transition name="fade">
          <p v-if="show">Hello</p>
      <transition>
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
        show:true,
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

</style>
