<template>
  <section class="chapter">
    <section class="chapter-header">
      <img src="../assets/image/batch_download_back.png" alt="" class="arrow" @click="$emit('update:foo', true)"/>
      <p>目录</p>
    </section>
    <section class="chapter-content" ref="char">
      <ul class="chapter-list">
        <li v-for="(chapter,index) in chapters" :key="index" @click="">
          {{chapter.title}}
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
  export default {
    name: "chapter",
    props: ['chapters'],
    methods:{

    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl"
  .chapter {
    position: absolute
    z-index 999
    left: 0
    right: 0
    top: 0
    bottom: 0
    background #fff
    .chapter-header {
      position fixed
      width: 100%
      background #fff
      top: px2rem(0)
      left: px2rem(0)
      padding: px2rem(15) px2rem(10)
      border: px2rem(1) solid #ccc

      .arrow {
        position absolute
      }
      p {
        font-size: px2rem(32)
        text-align center
      }
    }
    .chapter-content {
      position: absolute
      top: px2rem(100)
      z-index 2
      bottom: 0
      width: 100%
      .chapter-list {
        width: 100%
        li {
          font-size: px2rem(28)
          border-bottom: px2rem(1) solid #ccc
          color: #b3bab5
          width: 100%
          height: px2rem(80)
          line-height: px2rem(80)
          padding: px2rem(5) px2rem(20)
        }
      }
    }
  }
</style>
