<template>
  <div class="my_Search" v-cloak>
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <Tips :show="dielog" :msg="msg"/>
    <section class="search-header">
      <Arrows class="arrow"/>
      <div class="input-box">
        <img class="search_pic" :src="require('../assets/image/book_search_icon.png')" alt="">
        <input type="search" placeholder="搜索作者、书籍、圈子、关键词" @input="keyComputed" v-model="input">
      </div>
      <button id="search-btn" :disabled="input.length <= 0" @click="search">搜索
      </button>
    </section>
    <section v-show="showHotkey" class="search_content">
      <h6>热门搜索</h6>
      <ul class="farm" @click="keywordsSearch">
        <li>永夜君王</li>
        <li>修真聊天群</li>
        <li>圣墟</li>
        <li>帝霸</li>
        <li>龙符</li>
        <li>踏天无痕</li>
        <li>最强狂兵</li>
        <!--<li>逍遥小书生</li>-->
      </ul>
    </section>
    <section v-show="showComputed" class="search_computed">
      <ul @click="keywordsSearch">
        <li v-for="(word,n) in keywords" :key="n">{{word}}</li>
      </ul>
    </section>
    <section v-show="showResult" class="search_result" ref="wrapper">
      <div>
        <div>
          <div  v-if="('_id' in firstBook)" class="first-result">
            <div class="zp_main" @click="linkTo(firstBook['_id'])">
              <div class="zp_pic">
                <img v-lazy="staticHost + firstBook.cover">
              </div>
              <div class="zp_rb">
                <i class="zp_name">{{firstBook.title}}</i>
                <p>{{firstBook.author}}</p>
                <ul class="zp_list">
                  <li>{{firstBook.cat}}<span>|</span></li>
                  <li>{{firstBook.wordCount | countWan}}<span>|</span></li>
                  <li>{{firstBook.hasCp ? '已完结' : '连载中'}}</li>
                </ul>
              </div>
            </div>
            <div class="zp_bottom">
              <button class="left_btn" :disabled="firstIsCollect" @click="collectBook(firstBook['_id'])">
                {{ firstIsCollect ? '已加入' : '加入书架'}}
              </button>
              <router-link :to="'/read/' + firstBook['_id']">
                <button class="right_btn" >立即阅读</button>
              </router-link>
              <router-view/>
            </div>
          </div >
          <div class="listBox">
            <h3 class="zp_title">相关结果</h3>
            <ul class="book-list">
              <li v-if="searchBooks.length === 0">
                没有更多..
              </li>
              <router-link tag="li" :to="`/details/${book['_id']}`" v-else v-for="(book,n) in searchBooks" class="zp_content" :key="n">
                <div class="pic-box">
                  <img v-lazy="staticHost + book.cover">
                </div>
                <div class="zp_lump">
                  <h5 class="zp_caption">{{book.title}}</h5>
                  <p>{{book.shortIntro}}</p>
                  <i>{{book.author}}</i>
                  <ul class="sort">
                    <li>{{book.hasCp ? '完结' : '连载'}}</li>
                    <li>{{book.cat}}</li>
                    <li>{{book.wordCount | countWan}}</li>
                  </ul>
                </div>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="pullup-wrapper">{{loadMsg}}</div>
      </div>
    </section>
  </div>
</template>
<script>
  import Arrows from '../base/Arrows'
  import BScroll from 'better-scroll'
  import {getSearch, getKeyword, search, isCollect, collectBook} from '../api'

  export default {
    name: 'search',
    computed: {
      showComputed() {
        return this.keywords.length > 0  && this.input.length > 0
      },
      showHotkey() {
        return !this.showResult
      },
      showResult() {
        return (this.searchBooks.length > 0 || ('_id' in this.firstBook)) && this.input.length > 0
      },
    },
    data() {
      return {
        staticHost: 'http://statics.zhuishushenqi.com',
        searchBooks: [],
        firstIsCollect: false,
        input: '',
        keywords: [],
        isLoading: false,
        firstBook: {},
        start: 0,
        total: 0,
        loadMsg: '加载更多',
        pos: {x: 0, y: 0},
        preInput: '',
        dielog:false,
        msg: null,
      }
    },
    async created() {
      // let {books = []} = await getSearch();
      // this.books = books || [];
      // console.log(this.books);
    },
    components: {Arrows},
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
      linkTo(bid){
        this.$router.push('/details/' + bid)
      },
      collectBook(bid) {
        collectBook(bid).then(res => {
          this.firstIsCollect = true;
          this.dielog = true;
          this.msg = '加入成功'
          setTimeout(() => {
            this.dielog = false;
          }, 1000);
        })
      },
      async keyComputed(e) {
        let val = e.target.value.trim()
        if (val) {
          await getKeyword(val).then(res => {
            this.keywords = res['keywords'] || []
          }).catch(e => {
            this.keywords = []
          })
        } else {
          this.keywords = []
        }
      },
      async search() {
        if(this.input === this.preInput) return
        this.keywords = []
        this.start = 0
        let result = await search({
          query: this.input,
          start: this.start,
          limit: 10
        })
        this.total = result.total || 0
        this.start = result.books.length || 0
        this.preInput = this.input
        if(this.scroll){
          this.scroll.scrollTo(0,0,200)
        }
        this.firstBook = result.books.shift() || {}
        this.searchBooks = result.books || []
        this.$nextTick(() => {
          this.scroll.refresh()
        })

      },
      async getMore() {
        if (this.start > this.total) {
          return this.loadMsg = '没有更多了'
        }
        this.loadMsg = '加载中...'
        this.keywords = [];
        let result = await search({
          query: this.input,
          start: this.start,
          limit: 10
        })
        this.start += 10
        this.searchBooks.push(...result.books)
        this.scroll.finishPullUp()
        this.$nextTick(()=>{
          this.scroll.refresh()
        })
      },
      keywordsSearch(e) {
        if (e.target.tagName.toUpperCase() === 'LI') {
          this.input = e.target.innerText.trim()
          this.$nextTick(() => {
            this.search()
          })
        }
      }
    },
    watch: {
      firstBook: {
        async handler(n) {
          this.firstIsCollect = (await isCollect(n['_id']))['includes']
        },
        immediate: true
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .pullup-wrapper {
    line-height: px2rem(100)
    text-align: center
  }
  .pulldown-wrapper {
    position: absolute
    top: 0
    width 100%
    line-height: px2rem(100)
    text-align: center
  }
  .my_Search {
    width: 100%
    .search-header {
      display: flex
      position: fixed
      z-index 10
      left: 0
      top: 0
      align-items center
      justify-content space-between
      height px2rem(100)
      width: 100%
      overflow: hidden
      background: #fff;

      .arrow {
        width px2rem(88)
        text-align: center
        height px2rem(46)
      }
      .input-box {
        position: relative
        flex 1
        padding: px2rem(15) px2rem(70)
        background: #f3f7f8
        border: px2rem(1) solid #f3f7f8
        input {
          border: none
          background: transparent;
          color: #333
          font-size: px2rem(26)
          line-height px2rem(34)
          width 100%
        }
      }
      .search_pic {
        position: absolute
        width px2rem(36)
        height px2rem(36)
        top: px2rem(15)
        left: px2rem(17)
      }
      #search-btn {
        border: none
        background: none
        font-size: px2rem(28)
        color: #ba3632
        margin: px2rem(12) px2rem(24)
        &:disabled {
          color #bbb
        }
      }
    }
    .search_content {
      background: #fff
      margin-top: px2rem(100)
      padding-top: px2rem(10)
      width: 100%
      h6 {
        font-size: px2rem(26)
        margin-left: px2rem(24)
        color: #838383
      }
      .farm {
        box-sizing border-box
        display: flex
        padding: px2rem(24) px2rem(24) px2rem(10)
        flex-wrap wrap
        li {
          font-size: px2rem(26)
          padding: px2rem(12) px2rem(20)
          border: px2rem(1) solid #ededed
          border-radius: px2rem(5)
          margin 0 px2rem(20) px2rem(20) 0
          color: #666
        }

      }
    }
    .search_computed {
      position absolute
      z-index 9
      overflow hidden
      overflow-y auto
      background: white
      left: 0
      bottom 0
      top: px2rem(100)
      width 100%
      ul {

        padding-left: px2rem(24)
        li {
          height px2rem(100)
          line-height px2rem(100)
          font-size px2rem(30)
          border-bottom: px2rem(1) solid #f1f1f1
        }
      }
    }
    .search_result {
      position absolute
      overflow hidden
      background: white
      width 100%
      top: px2rem(100)
      left: 0
      bottom 0
      z-index 5
      .first-result {
        width 16rem
        margin: 0 auto
        box-sizing border-box
        background: #fff
        padding: 0 px2rem(24) px2rem(24)
        .zp_main {
          position: relative
          display: flex
          width: 100%
          padding: px2rem(35) 0
          .zp_pic {
            width px2rem(150)
            height: px2rem(200)
            margin-right: px2rem(30)
            border-radius: px2rem(5)
            overflow: hidden
            box-shadow 0 0 px2rem(12) rgba(0, 0, 100, .2)
            img {
              display block
              width 100%
              height 100%
            }
          }
          .zp_rb {
            flex 1
            width: 100%
            height: px2rem(200)
            .zp_name {
              font-style: normal
              font-size: px2rem(30)
              font-weight 700
              color: $mainColor
            }
            p {
              font-size: px2rem(26)
              color: #858786
              margin-top: px2rem(15)
              height px2rem(110)
              word-break: break-all
            }
            .zp_list {
              width: 100%
              li {
                display inline-block
                font-size: px2rem(24)
                color: #b8bab9
                margin-right: px2rem(4)
                span {
                  margin: px2rem(0) px2rem(11)
                }

              }
            }

          }
        }
        .zp_bottom {
          display: flex
          justify-content space-between
          .left_btn {
            background: #fff
            color $mainColor
            border: px2rem(1) solid $mainColor
            font-size: px2rem(28)
            padding: px2rem(21) 0
            width px2rem(320)
            &:disabled {
              border-color #ccc
              color #ccc
            }
          }
          .right_btn {
            color: #fff
            background: $mainColor
            border: px2rem(1) solid $mainColor
            font-size: px2rem(28)
            padding: px2rem(21) 0
            width px2rem(320)
          }
        }
      }
      .listBox {
        width 16rem
        margin 0 auto
        box-sizing border-box
        background: #fff
        margin-top: px2rem(20);
        padding: 0 px2rem(24)
        .zp_title {
          height: px2rem(50)
          font-size: px2rem(30)
          color #555
        }

        .zp_content {
          display: flex
          padding-top: px2rem(20)
          .pic-box {
            width px2rem(150)
            height px2rem(200)
            border-radius: px2rem(5)
            margin-right: px2rem(30)
            box-shadow 0 0 px2rem(12) rgba(0, 0, 100, .2)
            img {
              display: block
              width 100%
              height 100%
            }
          }
          .zp_lump {
            flex 1
            border-bottom: px2rem(1) solid #ebebeb
            .zp_caption {
              font-weight: 500
              font-size: px2rem(30)
              color: #333
            }
            p {
              font-size: px2rem(26)
              line-height: px2rem(42)
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              overflow: hidden
              color: #858786
              margin: px2rem(10) 0 px2rem(30)
              height px2rem(80)
              word-break: break-all
            }
            i {
              display: inline-block
              font-style: normal
              font-weight bold
              font-size: px2rem(24)
              color: #666
              mix-width px2rem(180)
              text-overflow ellipsis
              overflow: hidden
            }
            .sort {
              float: right
              overflow hidden
              font-size 0
              li {
                display: inline-block
                font-size: px2rem(20)
                border-radius: px2rem(2)
                margin-right: px2rem(12)
                margin-bottom: px2rem(30)
                padding: px2rem(3) px2rem(8)
              }
              li:nth-child(1) {
                color: #e08348
                border: px2rem(1) solid #e08348
              }
              li:nth-child(2) {
                color: #b64855
                border: px2rem(1) solid #b64855
              }
              li:nth-child(3) {
                color: #cecece
                border: px2rem(1) solid #cecece
                margin-right 0
              }
            }

          }
        }

      }
    }

  }
</style>
