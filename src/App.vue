<template>
  <div id="app">
    <router-view v-if='isRload' />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRload: true
    }
  },
  methods: {
    // 重载
    reload () {
      this.isRload = false
      this.$nextTick(function () {
        this.isRload = true
      })
    }
  }
}
</script>

<style lang="less">
  @import "assets/css/edGlobalClass.css";
  .size{
    width: 100%;
    height: 100%;
  }
  html,body{
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }
</style>
