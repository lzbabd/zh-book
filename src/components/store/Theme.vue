<template>
  <section class="store_theme">
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <header class="class_nav">
      <Arrows class="class_arrows"/>
      <span class="class_title">{{title}}</span>
    </header>
    <div class="container" ref="wrapper">
      <ul class="class_ul">
        <router-link tag="li" :to="`/details/${book._id}`" v-for="book in books" class="compile_list">
          <section class="compile_list_left">
            <img v-lazy="'http://statics.zhuishushenqi.com'+book.cover" alt="">
          </section>
          <section class="compile_list_right">
            <h3>{{book.title}}</h3>
            <div class="list_right_synopsis">{{book.shortIntro}}</div>
            <span class="author">{{book.author}}</span>
            <span class="sign1"><i>{{book.latelyFollower}}</i></span>
            <span class="sign2"><i>{{book.minorCate}}</i></span>
            <span class="sign3"><i>{{book.retentionRatio}}</i></span>
          </section>
        </router-link>
        <li class="pullup-wrapper">
          <p v-if="loadingS">{{loadMsg}}</p>
          <img v-if="!loadMsg" :src="require('../../assets/image/loading_1.gif')" alt="">
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  import Arrows from '../../base/Arrows'
  import {getTheme} from '@/api'
  import BScroll from 'better-scroll'
  export default {
    components: {Arrows},
    computed: {
      loadingS() {
        return this.books.length > 0 && this.flg
      },
      title(){
        return this.$route.params['major'] || this.preTitle
      }
    },
    data() {
      return {
        books: [],
        isLoading: true,
        start: 0,
        total: 0,
        flg: true,
        loadMsg: '加载更多',
        preTitle: this.$route.params['major']

      }
    },
    async created() {
      this.load()
    },
    watch: {
      title(n, o) {
        this.start = 0;
        if (n !== this.preTitle) {
          this.preTitle = n
          this.load()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            pullUpLoad: {
              threshold: 50
            },
            click: true,

          })
          this.scroll.on('pullingUp', () => {
            this.getMore()
          })
          this.scroll.on('scroll', (pos) => {
            this.pos = pos
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    methods: {
      async load() {
        this.isLoading = true
        let {major} = this.$route.params;
        let {books,total} = await getTheme({major});
        this.books = books;
        this.total = total;
        this.$nextTick(() => {
          this.isLoading = false
          this.scroll.refresh()
          this.scroll.scrollTo(0,0,200)
        })
      },
      async getMore() {
        if (this.start > this.total) {
          return this.loadMsg = '没有更多了'
        }
        this.loadMsg = ''
        this.keywords = [];
        let result = await getTheme({
          major: this.title,
          start: this.start,
          limit: 10
        })
        this.start += 10
        this.books.push(...result.books)
        this.scroll.finishPullUp()
        this.$nextTick(() => {
          this.scroll.refresh()
          this.loadMsg = '加载更多'
        })
      },
    }
  }
</script>
<style scoped lang="stylus">
  @import "../../assets/css/public.styl"
  .store_theme
    background #fff
    .pullup-wrapper
      height px2rem(80)
      text-align: center
      img
        height 100%
    .container
      position: absolute
      background: #fff
      width 100%
      top px2rem(100)
      left: 0
      bottom: 0;
      overflow: hidden
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
    .class_ul
      background: #fff;
      width 16rem
      margin: 0 auto
      padding-top: px2rem(30);
      .compile_list
        padding:0 px2rem(24)
        margin-bottom: px2rem(20)
        &:last-child compile_list_right
          border: none
          padding-bottom 0
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
          border-bottom px2rem(1) solid #ccc
          padding-bottom px2rem(20)
          h3
            font-size px2rem(28)
            padding-left: px2rem(30)
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          .list_right_synopsis
            font-size px2rem(24)
            line-height: px2rem(36)
            display: -webkit-box; /*弹性盒模型*/
            max-height px2rem(68)
            -webkit-line-clamp: 2; /*文字的行数 需要显示几行 就写几行*/
            overflow: hidden; /*溢出隐藏*/
            height px2rem(68)
            padding: px2rem(10) px2rem(0) px2rem(0) px2rem(30)
            margin-bottom: px2rem(20)
            color #9b9b9c
          .author
            text-align: left
            font-size px2rem(26)
            width: px2rem(100)
            height: px2rem(20)
            padding-left: px2rem(30)
            color #333
            margin: px2rem(20) 0;
          .sign1,sign2,sign3
            display: block
            float: right
            font-size 0
          .sign3 i
            margin-left px2rem(10)
            float right
            display: block
            border: px2rem(2) solid #cd3640
            border-radius px2rem(7)
            font-size px2rem(20)
            padding px2rem(4)
            color #cd3640
          .sign2 i
            margin-left px2rem(10)
            float right
            display: block
            border: px2rem(2) solid #62b5a4
            border-radius px2rem(7)
            font-size px2rem(20)
            padding px2rem(4)
            color #62b5a4
          .sign1 i
            margin-left px2rem(10)
            float right
            display: block
            border: px2rem(2) solid #bfc1ca
            border-radius px2rem(7)
            font-size px2rem(20)
            padding px2rem(4)
            color #bfc1ca
</style>
