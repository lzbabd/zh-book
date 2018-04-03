<template>
  <div class="loading-page">
    <div class="ld-box">
      <img src="../assets/image/progress2.gif" alt="">
      <span>加载中...</span>
    </div>
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .loading-page
    position: fixed
    z-index 999
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: rgba(0,0,0,.1)
    display: flex
    justify-content center
    align-items center
    .ld-box
      padding px2rem(40) px2rem(40)
      border-radius: px2rem(10);
      background: rgba(0,0,0,.8)
      transform translateY(-50%)
      display: flex
      flex-direction column
      justify-content center
      align-items center
      img
        display: block
        width px2rem(60)
        height px2rem(60)
      span
        margin-top px2rem(30)
        color white
</style>
