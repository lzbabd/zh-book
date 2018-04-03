<template>
  <div class="store">
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <ul>
      <router-link tag="li" :to="`/details/${book._id}`" v-for="book in books" class="compile_list">
        <section class="compile_list_left">
          <img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" />
        </section>
        <section class="compile_list_right">
          <h3>{{book.title}}</h3>
          <span class="poll">{{book.latelyFollower}}</span>
          <div class="list_right_synopsis">{{book.shortIntro}}</div>
          <span class="author">{{book.author}}</span>
          <span class="sign2"><i>{{book.minorCate}}</i></span>
          <span class="sign3"><i>{{book.retentionRatio}}</i></span>
        </section>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import {getRanking} from '@/api'


  export default {
    data() {
      return {
        books:{},
        isLoading: true
      }
    },
    async created() {
      let {result = {}} = await getRanking();
      this.books = result.books;
      this.$nextTick(() => {
        this.isLoading = false
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/css/public.styl";
.store
  ul
    margin-top: px2rem(200)
    padding-top: px2rem(30);
    background #fff
    .compile_list
      width: px2rem(660)
      height: px2rem(180)
      padding: 0 px2rem(30) px2rem(30) px2rem(30)
      overflow hidden
      .compile_list_left
        height: px2rem(160)
        width: px2rem(120)
        float left
        background-size 100% 100%
        overflow hidden
        border-radius px2rem(10)
        img
          height: 100%;
          width: 100%;
          display: block
          margin 0

      .compile_list_right
        height: 100%
        border-bottom px2rem(1) solid #ccc
        h3
          display: inline-block
          width:px2rem(300);
          height: px2rem(30);
          font-size px2rem(28)
          padding-left:px2rem(30)
        .poll
          float right
          color #fd842b
          font-size px2rem(22)
        .list_right_synopsis
          font-size px2rem(22)
          display: -webkit-box;/*弹性盒模型*/
          max-height px2rem(62)
          -webkit-line-clamp:2;/*文字的行数 需要显示几行 就写几行*/
          overflow: hidden;/*溢出隐藏*/
          padding: px2rem(10) px2rem(0) px2rem(0) px2rem(30)
          margin-bottom: px2rem(20)
          color #9b9b9c
        .author
          text-align: left
          font-family: PingFangSC-Regular;
          font-size px2rem(26)
          width: px2rem(100)
          height: px2rem(20)
          padding-left:px2rem(30)
          color #9b9b9c
        .sign3 i
          margin-left px2rem(10)
          float right
          display: block
          border:px2rem(2) solid #cd3640
          border-radius 15%
          font-size px2rem(20)
          padding  px2rem(4)
          color #cd3640
        .sign2 i
          margin-left px2rem(10)
          float right
          display: block
          border:px2rem(2) solid #62b5a4
          border-radius 15%
          font-size px2rem(20)
          padding  px2rem(4)
          color #62b5a4
        .sign1 i
          margin-left px2rem(10)
          float right
          display: block
          border:px2rem(2) solid #bfc1ca
          border-radius 15%
          font-size px2rem(20)
          padding  px2rem(4)
          color #bfc1ca



</style>
