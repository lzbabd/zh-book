<template>
  <section class="store_class">
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <header class="class_nav">
      <Arrows class="class_arrows"/>
      <span class="class_title">分类</span>
    </header>
    <ul class="class_container" v-if="('male' in result)">
      <div class="auto-box">
        <li class="class_main">
          <h3>男生</h3>
          <ul class="list">
            <router-link :to="`/theme/${book.name}`" tag="li" v-for="(book,index) in result['male']" class="item" :key="index">
              <p>{{book.name}}</p>
              <span>{{book.bookCount}} 本</span>
            </router-link>
          </ul>
        </li>
        <li class="class_main">
          <h3>女生</h3>
          <ul class="list">
            <router-link :to="`/theme/${book.name}`" tag="li" v-for="(book,index) in result['female']" class="item  " :key="index">
              <p>{{book.name}}</p>
              <span>{{book.bookCount}} 本</span>
            </router-link>
          </ul>
        </li>
      </div>
    </ul>
  </section>
</template>
<script>
  import Arrows from '../../base/Arrows'
  import {getCategory} from '../../api'

  export default {
    components: {Arrows},
    data() {
      return {
        classText: {'female': '女生', 'male': '男生'},
        isLoading: true,
        result: {}
      }
    },
    async created() {
      let result = await getCategory();
      this.result = result || {}
      this.$nextTick(() => {
        this.isLoading = false
      })
    }

  }
</script>
<style scoped lang="stylus">
  @import "../../assets/css/public.styl";
  .store_class
    .class_nav
      position fixed
      top: 0
      left: 0
      z-index: 1
      background #fff
      width: 100%
      border-bottom px2rem(1) solid #ededed
      .class_arrows
        position: absolute
        left: 0
        top: 0
        padding: px2rem(25)
        img
          width px2rem(50) !important
          height px2rem(50) !important
      .class_title
        display: block
        font-size: px2rem(38)
        text-align: center
        line-height: px2rem(100)

    .class_container
      position: absolute
      top: px2rem(100)
      left: 0
      bottom 0
      width: 100%;
      overflow-y auto
      overflow-x hidden
      .auto-box
        width 16rem
        margin: 0 auto
        height 100%
        background: #fff
      .class_main
        h3
          font-weight normal
          font-size: px2rem(30)
          padding  px2rem(24) px2rem(24) px2rem(6) px2rem(24)
          color #999
        .list
          display: flex
          flex-wrap wrap
          justify-content flex-start
          padding: 0 .5rem
          li
            box-sizing border-box
            width 5rem
            text-align: center
            padding px2rem(12) 0
            p
              font-size: px2rem(30)
            span
              font-size: px2rem(24)
              color #666

</style>
