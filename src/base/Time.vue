<template>
  <div class="time_component">
    <i>{{h}}</i>
    <i>时</i>
    <i>{{m}}</i>
    <i>分</i>
    <i>{{s}}</i>
    <i>秒</i>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        h: "",
        m: "",
        s: "",
        flag: false,
        time: ''
      }

    },
    mounted() {
      let time = setInterval(() => {
        if (this.flag === true) {
          clearInterval(time)
        }
        this.time = time
        this.timeDown()
      }, 500)
    },
    props: {
      endTime: {
        type: String
      }
    },
    methods: {
      timeDown() {
        const endTime = new Date(this.endTime)
        const nowTime = new Date();
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
        let d = parseInt(leftTime / (24 * 60 * 60))
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
        let m = this.formate(parseInt(leftTime / 60 % 60))
        let s = this.formate(parseInt(leftTime % 60))
        if (leftTime <= 0) {
          this.flag = true
          this.$emit('time-end')
        }
        this.h = h;
        this.m = m;
        this.s = s;

      },
      formate(time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .time_component
    i
      display: inline-block
      font-style normal
      width: px2rem(30)
      height: px2rem(35)
      text-align center
      color #666
      line-height px2rem(40)
      margin-right px2rem(.5)
      font-size: px2rem(28)
    i:nth-child(odd)
      color white
      background #ff832f
      padding: 0 px2rem(4)
      border-radius px2rem(5)
</style>
