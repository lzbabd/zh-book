<template>
  <div class="store">

    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <router-view></router-view>

    <section class="store-middle">

      <section class="store-compile store_common">
        <div class="compile_tit">
          <img src="../../assets/image/icon_t03.png" alt="" class="tit_image">
          <span class="tit_i">编辑力荐</span>
        </div>
        <router-link tag="section" :to="`/details/${book._id}`" v-for="(book) in recommend" class="compile_list">
          <section class="compile_list_left">
            <img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
          </section>
          <div class="compile_list_right">
            <h3>{{book.title}}</h3>
            <div class="list_right_synopsis">{{book.longIntro}}</div>
            <span class="author">{{book.author}}</span>
            <span class="sign1"><i>{{book.isSerial?'连载中':'完结'}}</i></span>
            <span class="sign2"><i>{{book.majorCate}}</i></span>
            <span class="sign3"><i>{{book.latelyFollower}}</i></span>
          </div>
        </router-link>
      </section>
      <div class="line"></div>
      <section class="store-time store_common">
        <div class="compile_tit tit_time_i">
          <img src="../../assets/image/icon_t09.png" alt="" class="tit_image">
          <span class="tit_i">限时免费</span>
          <!--<Time :endTime='endTime' class="time_show"></Time>-->
        </div>
        <router-link tag="section" :to="`/details/${book._id}`" v-for="book in free" class="compile_list">
          <section class="compile_list_left">
            <img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
          </section>
          <div class="compile_list_right">
            <h3>{{book.title}}</h3>
            <div class="list_right_synopsis">{{book.longIntro}}</div>
            <span class="author">{{book.author}}</span>
            <span class="sign1"><i>{{book.isSerial?'连载中':'完结'}}</i></span>
            <span class="sign2"><i>{{book.majorCate}}</i></span>
            <span class="sign3"><i>{{book.latelyFollower}}</i></span>
          </div>
        </router-link>

      </section>
      <div class="line"></div>
      <section class="store_boom">
        <div class="boom_tit">
          <img src="../../assets/image/icon_t01.png" alt="" class="boom_image">
          <span class="boom_i">畅销精选</span>
        </div>
        <ul  class="boom_list">
          <router-link tag="li" :to="`/details/${book._id}`" v-for="book in sell"><img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
            <span>{{book.author}}</span>
          </router-link>
        </ul>
      </section>
      <div class="store_image">
        <img src="//static.zongheng.com/upload/recommend/f4/dd/f4dd054a7c05f38133485f46e4be7342.jpeg" alt="">
      </div>
      <section class="store_man store_common">
        <div class="compile_tit">
          <img src="../../assets/image/icon_t05.png" alt="" class="tit_image">
          <i class="tit_i">男生必读</i>
        </div>
        <router-link tag="section" :to="`/details/${book._id}`" v-for="(book) in recommend" class="compile_list">
          <section class="compile_list_left">
            <img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
          </section>
          <div class="compile_list_right">
            <h3>{{book.title}}</h3>
            <div class="list_right_synopsis">{{book.longIntro}}</div>
            <span class="author">{{book.author}}</span>
            <span class="sign1"><i>{{book.isSerial?'连载中':'完结'}}</i></span>
            <span class="sign2"><i>{{book.majorCate}}</i></span>
            <span class="sign3"><i>{{book.latelyFollower}}</i></span>
          </div>
        </router-link>
      </section>
      <div class="line"></div>
      <section class="store_woman store_common">
        <div class="compile_tit">
          <img src="../../assets/image/icon_t06.png" alt="" class="tit_image">
          <i class="tit_i">女生必读</i>
        </div>
        <router-link tag="section" :to="`/details/${book._id}`" v-for="(book) in female" class="compile_list">
          <section class="compile_list_left">
            <img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
          </section>
          <div class="compile_list_right">
            <h3>{{book.title}}</h3>
            <div class="list_right_synopsis">{{book.longIntro}}</div>
            <span class="author">{{book.author}}</span>
            <span class="sign1"><i>{{book.isSerial?'连载中':'完结'}}</i></span>
            <span class="sign2"><i>{{book.majorCate}}</i></span>
            <span class="sign3"><i>{{book.latelyFollower}}</i></span>
          </div>
        </router-link>
      </section>
      <div class="line"></div>
      <section class="store_boom store_bottom">
        <div class="boom_tit">
          <img src="../../assets/image/icon_t10.png" alt="" class="boom_image">
          <span class="boom_i">新书速递</span>
        </div>
        <ul  class="boom_list">
          <router-link tag="li" :to="`/details/${book._id}`" v-for="book in newBook"><img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
            <span>{{book.author}}</span>
          </router-link>
        </ul>
      </section>

    </section>
  </div>
</template>

<script>
  import {getBoutique} from '@/api'
  export default {
    data() {
      return {
        male: [],
        female: [],
        free: [],
        newBook: [],
        recommend: [],
        sell: [],
        isLoading: true

      }
    },
    async created() {
      let {result = {}} = await getBoutique();
      this.male = result.Male || [];
      this.female = result.female || [];
      this.free = result.free || [];
      this.newBook = result.newBook || [];
      this.recommend = result.recommend || [];
      this.sell = result.sell || [];
      this.$nextTick(() => {
        this.isLoading = false
      })
    },
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/css/public.styl";
  .store
    width: 100%;
    .store-head
      position: fixed;
      left: 0;
      top: 0
      height: px2rem(198)
      border-top: px2rem(1) solid gainsboro;
      background #fff
      display: flex;
      width: 100%;
      border-bottom px2rem(1) solid #ccc
      li
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        text-align: center;
        color: green
        span
          font-size: px2rem(24)
          position absolute
          bottom: px2rem(38)
          color: #858585
        &.router-link-active

          :after
            display: block
            position absolute
            top px2rem(40)
            left px2rem(5)
            width: px2rem(30)
            height px2rem(3)
            background red
            content ''
    .store-middle
      margin-top: px2rem(200)
      .line
        height:px2rem(16)
      .store_common
        width: 100%
        background #ffffff
        .compile_tit
          padding px2rem(30) px2rem(0)
          i
            font-style normal
          .tit_image
            float: left;
            width: px2rem(30)
            height: px2rem(30)
            margin-right: px2rem(20)
            margin-left: px2rem(20)
            background-size: cover;
            clear: both;
          .tit_i
            width: px2rem(145)
            height: px2rem(25)
            font-size: px2rem(25)
            color: #2d3035;
            display: block
            margin-left px2rem(25)

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
              width: px2rem(300);
              height: px2rem(28);
              font-size px2rem(28)
              padding-left: px2rem(30)
            .list_right_synopsis
              font-size px2rem(23)
              display: -webkit-box; /*弹性盒模型*/
              max-height px2rem(68)
              -webkit-line-clamp: 2; /*文字的行数 需要显示几行 就写几行*/
              overflow: hidden; /*溢出隐藏*/
              padding: px2rem(10) px2rem(0) px2rem(0) px2rem(30)
              margin-bottom: px2rem(20)
              color #9b9b9c
            .author
              text-align: left
              font-family: PingFangSC-Regular;
              font-size px2rem(26)
              width: px2rem(100)
              height: px2rem(20)
              padding-left: px2rem(30)
              color #9b9b9c
            i
              font-style normal
            .sign3 i
              margin-left px2rem(10)
              float right
              display: block
              border: px2rem(2) solid #cd3640
              border-radius 15%
              font-size px2rem(20)
              padding px2rem(4)
              color #cd3640
            .sign2 i
              margin-left px2rem(10)
              float right
              display: block
              border: px2rem(2) solid #62b5a4
              border-radius 15%
              font-size px2rem(20)
              padding px2rem(4)
              color #62b5a4
            .sign1 i
              margin-left px2rem(10)
              float right
              display: block
              border: px2rem(2) solid #bfc1ca
              border-radius 15%
              font-size px2rem(20)
              padding px2rem(4)
              color #bfc1ca
      .store-time
        .tit_time_i
          height: px2rem(30);
        .time_show
          float left
          display: inline-block
      .store_boom
        width: 100%
        background #ffffff
        overflow hidden
        .boom_tit
          padding px2rem(30) px2rem(0)
          .boom_image
            float: left;
            width: px2rem(30)
            height: px2rem(30)
            margin-right: px2rem(20)
            margin-left: px2rem(20)
            background-size: cover;
            clear: both;
          .boom_i
            width: px2rem(145)
            height: px2rem(25)
            font-size: px2rem(25)
            color: #2d3035;
            display: block
            margin-left px2rem(25)
        .boom_list
          width: px2rem(700)
          margin: 0 auto
          background #fff
          li
            float left
            display: inline-block
            width: px2rem(130)
            height: px2rem(270)
            padding px2rem(10) px2rem(19) px2rem(30)
          img
            width: px2rem(130)
            height: px2rem(160)
            background-size cover
            background: rgb(255, 255, 255)
            overflow hidden
            border-radius 8%
            margin-top px2rem(10)
            span
              display: block
      .store_image
        width: 100%
        img
          width: 100%
      .store_bottom
        margin-bottom px2rem(100)

</style>
