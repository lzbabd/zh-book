<template>
  <div>
    <img src="../assets/image/batch_download_back.png" alt="" @click="back">
  </div>
</template>
<script>
  export default {
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl"
  div{
    display: flex
    justify-content center
    align-items center
    img {
      display: block
      width px2rem(46)
      height px2rem(46)
    }
  }

</style>
