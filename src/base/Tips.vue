<template>
  <div class="tips">
    <transition name="tips">
      <div v-if="show" class="tips-box">
        {{msg}}
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      show: Boolean,
      msg:{
        default: '无提示',
      }
    },
    data() {
      return {}
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl"
  .tips-enter-active, .tips-leave-active {
    transition: all .3s;
  }
  .tips-enter, .tips-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translate(-50%,px2rem(100))!important;
    opacity: 0;
  }
  .tips
    .tips-box
      position: absolute
      min-width px2rem(200)
      z-index 999
      bottom px2rem(50)
      background: rgba(0, 0, 0, .8)
      text-align: center
      left 50%
      border-radius: px2rem(10);
      transform translate(-50%,0)
      color white
      padding px2rem(18)
</style>
