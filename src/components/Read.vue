<template>
  <div class="read-page">
    <div class="read-container" @click="dockShow = !dockShow" :class="themes[themeIndex]['class']" ref="wrapper">
      <!--阅读-->
      <main v-if="read" id="read">
        <div :class="['read_content', 'fs-' + fontSize]" v-html="content"></div>
        <p class="pull-warpper">
          <img v-if="!loadMsg" :src="require('../assets/image/loading_read.gif')" alt=""><br>
          <span>{{loadMsg}}</span>
        </p>
      </main>
      <!--目录-->
      <transition v-if="!read" name="fade">
        <Chapter :chapters="chapters" :foo.sync="read"/>
      </transition>
    </div>
    <!--dock-->
    <transition-group v-if="read" name="read-setting">
      <div :key="0" v-show="dockShow" class="dock dock-title" @click.stop>
        <Arrows class="arrow"/>
        <p class="reader_icon">返回</p>
        <p class="reader-title">{{tit}}</p>
        <section class="reader-right">
          <img src="../assets/image/reader_menu_chenjin_unchecked.png" alt="">
        </section>
      </div>
      <div :key="1" v-show="dockShow" class="dock dock-setting" @click.stop>
        <section class="fontSize">
          <button :disabled="fontSize === 1" class="minus" @click="minus">Aa-
          </button>
          <div class="line">
            <span class="line_red" :style="{width: fontSize/5*100 + '%'}"></span>
          </div>
          <button :disabled="fontSize === 5" class="add" @click="add">Aa+
          </button>
        </section>
        <section class="theme-btn">
          <button v-for="(theme,n) in themes" class="btn" :class="{active: themeIndex === n}" @click="switchTheme(n)">
            {{theme['text']}}
          </button>
        </section>
        <section class="reader_cut">
          <button disabled>上一章</button>
          <button @click="read = false" disabled>目录</button>
          <router-view/>
          <button @click="changeChapter(chaptersStart,1)">下一章</button>
        </section>
      </div>
    </transition-group>
  </div>
</template>
<script>
  import Arrows from '../base/Arrows'
  import {getRead, getReadContent} from "../api"
  import BScroll from 'better-scroll'
  import Chapter from './chapter.vue'

  export default {
    name: 'read',
    computed: {
      chaptersCount() {
        return this.chapters.length
      }
    },
    data() {
      return {
        bid: '',
        tit: '',
        chaptersUpdated: new Date(),
        chapters: [],
        chaptersStart: 0,
        limit: 1,
        themes: [
          {class: 'theme-default', text: '默认'},
          {class: 'theme-dark', text: '夜间'},
          {class: 'theme-green', text: '护眼'}
        ],
        chaptersData: [],
        themeIndex: 0,
        fontSize: 2,
        read: true,
        template: '<h2 id="c-1">title</h2><p>content</p>',
        content: '',
        dockShow: false,
        loadMsg: '',
        cur: 1,
      }
    },
    watch: {
      async $route(n, o) {
        this.read = true
        if (n.name !== 'read') return this.dockShow = false
        if (n.params['bid'] !== this.bid) {
          this.bid = n.params['bid']
          this.tit = ''
          this.chaptersData = []
          this.chaptersStart = 0;
          this.content = ''
          await this.getChapters()
          await this.getChaptersContent()
        }
      },
      read() {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            pullUpLoad: {
              threshold: 80
            },
            click: true,
          })
          this.scroll.on('pullingUp', () => {
            this.getMore()
          })
          this.scroll.on('scroll', (pos) => {
            this.dockShow && (this.dockShow = false)
          })
        })
      }
    },
    async created() {
      let {bid} = this.$route.params;
      this.bid = bid;
      await this.getChapters()
      await this.getChaptersContent()
    },
    components: {Arrows, Chapter},
    methods: {
      async changeChapter(start, limit) {
        if (document.querySelector('#c-' + start)) {
          this.scroll.scrollToElement('#c-' + start, 200)
        } else {
          this.chaptersStart = start;
          await this.getChaptersContent()
          this.$nextTick(() => {
            this.scroll.scrollToElement('#c-' + start, 200)
          })
        }
      },
      async getChapters() {
        let {mixToc = {}} = await getRead(this.bid);
        this.chapters = mixToc.chapters || [];
        this.chaptersUpdated = new Date(mixToc.chaptersUpdated);
        if (this.chapters.length === 0) {
          this.content = '内容错误';
        }
      },
      async getChaptersContent() {
        let _ary = this.chapters.slice(this.chaptersStart, this.chaptersStart + this.limit)
        this.tit = _ary[0].title
        let promiseAry = _ary.map(chapters => getReadContent(chapters.link))
        let _result = await Promise.all(promiseAry)
        _ary.forEach((item, index) => {
          item.content = _result[index]['chapter']['body'] || '章节错误!'
        })
        this.chaptersData = this.chaptersData.concat(_ary)
        // this.chaptersData = _ary

        /*this.content += this.chaptersData.reduce((pre, cur, index) => {
          return pre + `<h2 id="${'c-' + (this.chaptersStart + index)}">${cur.title}</h2><p>${cur.content}</p>`
        }, '');*/

        this.content = this.chaptersData.reduce((pre, cur, index) => {
          return pre + `<h2 id="${'c-' + (index)}">${cur.title}</h2><p>${cur.content}</p>`
        }, '')

        this.chaptersStart += this.limit
        this.$nextTick(() => {
          this.scroll && this.scroll.refresh()
        })
      },
      switchTheme(n) {
        if (this.themeIndex === n) return
        this.themeIndex = n
      },
      add() {
        this.fontSize = this.fontSize + 1;
      },
      minus() {
        this.fontSize = this.fontSize - 1;

      },
      async getMore() {
        if (this.chaptersStart > this.chapterCount) {
          return this.loadMsg = '没有更多了'
        }
        this.loadMsg = '加载中...'
        this.getChaptersContent().then(res => {
          this.scroll.finishPullUp()
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        })
      },

    },
    mounted() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            pullUpLoad: {
              threshold: 80
            },
            click: true,

          })
          this.scroll.on('pullingUp', () => {
            this.getMore()
          })
          this.scroll.on('scroll', (pos) => {
            this.dockShow && (this.dockShow = false)
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .read-page
    user-select none
  .pull-warpper
    width 100%
    text-align: center
    height px2rem(100)
    img
      display: inline-block
      width px2rem(80)
      height px2rem(80)
    span
      display: block
      font-size px2rem(24)
  .theme-dark
    background: #1e0e0b;
    color: #797979
  .theme-green
    background: #eeffdf;
    color: #444
  .theme-default
    background: #f3e1be;
    color: #5e432e
  .read-container
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0;
    overflow hidden
  #read {
    li {
      color: #5e432e
      text-indent: px2rem(45)
      font-size: px2rem(30);
      letter-spacing: px2rem(2)
    }
  }
  .dock {
    position absolute
    left: 0
    right: 0
    background: #2e2f30;
    opacity .9
    button:disabled {
      opacity .5
    }

  }
  .dock-title {
    height: px2rem(100);
    display: flex;
    align-items center
    top: 0;
    flex-wrap: wrap;
    .arrow {
      width px2rem(60)
      padding-left: px2rem(20)
      height px2rem(100)
    }
    .reader_icon {
      line-height: 3;
      text-indent 0
      color #fff
      font-size: px2rem(26)
    }
    .reader-title {
      flex 1
      font-size: px2rem(28)
      padding: 0 px2rem(24)
      text-overflow ellipsis
      white-space nowrap
      overflow: hidden
      color: #fff
    }
    .reader-right {
      margin-left auto
      width px2rem(80)
      height px2rem(80)
      display: flex
      justify-content center
      align-items center
      img {
        display: block
        width: px2rem(36)
        height: px2rem(36)
      }

    }
  }
  .dock-setting {
    background: #2e2f30;
    bottom: 0
    padding px2rem(40) px2rem(20);
    box-sizing border-box
    opacity .9
    p {
      color #fff
      font-size: px2rem(30)
    }

    .fontSize {
      display: flex
      button {
        background: transparent;
        border: none
        color white
        font-size: px2rem(40);
        height px2rem(60)
        line-height: px2rem(60)
        font-weight: bold
        text-align center;
        margin 0 px2rem(24)
      }
      .line {
        flex 1
        margin: px2rem(29) px2rem(24) 0
        height: px2rem(2)
        background #fff;

        .line_red {
          width 0
          height: 100%
          display block
          background $mainColor
        }
      }
    }
    .theme-btn {
      width: 100%
      display: flex;
      flex-wrap nowrap
      justify-content: space-around;
      margin-top px2rem(20)
      padding 0 px2rem(20)
      box-sizing border-box

      button {
        flex 1
        margin 0 px2rem(30)
        background: transparent
        color white
        width: px2rem(160)
        border-radius px2rem(5)
        border px2rem(1) solid #fff
        line-height: 1
        font-size: px2rem(28)
        padding px2rem(10)
        &.active {
          border-color: $mainColor
          color $mainColor
        }
      }
    }
    .reader_cut {
      display: flex;
      flex-wrap nowrap
      justify-content: space-between;
      margin-top px2rem(40)
      padding 0 px2rem(20)
      box-sizing border-box

      button {
        font-size px2rem(34)
        background: transparent
        border: none
        width 4rem
        text-align: center
        color white
        padding: px2rem(12)
      }
    }
  }
  .read_content {
    padding: px2rem(24);
  }
</style>
