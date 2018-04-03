<template>
  <section class="detail">
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <Tips :show="dielog" :msg="msg"/>
    <section class="detail-header">
      <div class="detail-top  clearfix">
        <div class="detail-left">
          <Arrows class="detail-img"/>
        </div>
        <div class="detail-right">
          <img :src="require('../assets/image/pic_book_cover_newer_1.png')" alt="">
          <img :src="require('../assets/image/pic_share.png')" alt="">
        </div>
      </div>
      <div class="detail-bottom clearfix">
        <span class="bottom-left"><img v-lazy="a+result.cover" alt=""></span>
        <ul class="bottom-right">
          <li class="li_1"><h3>{{result.title}}</h3></li>
          <li class="li_2">
            <span>{{result.author}}</span>
            <img :src="require('../assets/image/pic_right_arrows.png')" alt="">
          </li>
          <li class="li_3">
            <i><span class="span-one">{{result.majorCate}}</span></i>
            <span class="span-two">{{result.wordCount | countWan}}</span>
            <span>|</span>
            <span class="span-three">{{result.isSerial ? '连载中' : '已完结'}}</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="synopsis">
      <div class="synopsis-details">
        <h3>简介目录</h3>
        <p>
          {{result.longIntro}}
        </p>
      </div>
      <div class="synopsis-num">
        <img :src="require('../assets/image/pic_book_cover_catalog.png')" alt="">
        <p>连载至: {{result.lastChapter}}</p>
        <i>{{new Date(result.updated).getHours()}}小时前</i>
      </div>
    </section>
    <section class="honor">
      <div class="honor-list">
        <h3>本书荣誉</h3>
        <ul>
          <li>
            <span>本月月票</span>
            <h2>{{rating.score || 0}}</h2>
          </li>
          <li>
            <span>周推荐数</span>
            <h2>{{rating.count|| 0}}</h2>
          </li>
          <li>
            <span>收藏人数</span>
            <h2>{{result.latelyFollower || 0}}</h2>
          </li>
        </ul>
      </div>
      <div class="honor-pass clearfix">
        <span>百度小说月票榜第<i>6</i>位</span>
        <b>支持作者</b>
      </div>
    </section>
    <section class="invitation">
      <div class="invitation-header clearfix">
        <h3>圈子热帖</h3>
        <span><b>进入圈子</b><img :src="require('../assets/image/speech_menu_next_normal.png')" alt=""></span>
      </div>
      <ul class="invitation-list">
        <li class="list-1 clearfix">
          <img :src="require('../assets/image/touxiang.jpg')" alt="">
          <span>一只橘子</span></li>
        <li class="list-2"><p>这种小白文,我也就只能快进挑好看的看了</p></li>
        <li class="list-3"><i>1小时前</i>
          <span><img :src="require('../assets/image/reply_item_praise_normal.png')" alt=""> <i>5</i></span>
          <span><img :src="require('../assets/image/reply_comment_icon.png')" alt=""> <i>2</i></span>
        </li>
      </ul>
      <ul class="invitation-list">
        <li class="list-1 clearfix">
          <img :src="require('../assets/image/touxiang.jpg')" alt="">
          <span>一只橘子</span></li>
        <li class="list-2">
          <p>更新了! 更新了!</p>
          <p>还是老时间老地点更新哦</p>
        </li>
        <li class="list-3"><i>1小时前</i>
          <span><img :src="require('../assets/image/reply_item_praise_normal.png')" alt=""> <i>5</i></span>
          <span><img :src="require('../assets/image/reply_comment_icon.png')" alt=""> <i>2</i></span>
        </li>
      </ul>
      <ul class="invitation-list">
        <li class="list-1 clearfix">
          <img :src="require('../assets/image/touxiang.jpg')" alt="">
          <span>一只橘子</span></li>
        <li class="list-2"><p>这种小白文,我也就只能快进挑好看的看了</p></li>
        <li class="list-3"><i>1小时前</i>
          <span><img :src="require('../assets/image/reply_item_praise_normal.png')" alt=""> <i>5</i></span>
          <span><img :src="require('../assets/image/reply_comment_icon.png')" alt=""> <i>2</i></span>
        </li>
      </ul>
    </section>
    <section class="fans">
      <div class="fans-header">
        <h3>粉丝排行</h3>
        <span><b>查看更多</b><img :src="require('../assets/image/speech_menu_next_normal.png')" alt=""></span>
      </div>
      <ul class="fans-list">
        <li>
          <img class="head_port" :src="require('../assets/image/pic_book_cover_fans_1.png')" alt="">
          <img class="head_portrait" :src="require('../assets/image/touxiang.jpg')" alt="">
          <span>都市快播</span>
          <i><img :src="require('../assets/image/fan_score_level16.png')" alt=""></i>
        </li>
        <li>
          <img class="head_port" :src="require('../assets/image/pic_book_cover_fans_2.png')" alt="">
          <img class="head_portrait" :src="require('../assets/image/touxiang.jpg')" alt="">
          <span>灼月含旸@百度</span>
          <i><img :src="require('../assets/image/fan_score_level16.png')" alt=""></i>
        </li>
        <li>
          <img class="head_port" :src="require('../assets/image/pic_book_cover_fans_3.png')" alt="">
          <img class="head_portrait" :src="require('../assets/image/touxiang.jpg')" alt="">
          <span>秦卫、繁华</span>
          <i><img :src="require('../assets/image/fan_score_level16.png')" alt=""></i>
        </li>
      </ul>
    </section>
    <section class="related">
      <div class="related-header">
        <h3>相关推荐</h3>
      </div>
      <ul class="related-list">
        <li><i><img :src="require('../assets/image/tongtian_book.jpeg')" alt="">
          <span>通天道符</span></i></li>
        <li><i><img :src="require('../assets/image/tongtian_book.jpeg')" alt="">
          <span>通天道符</span></i></li>
        <li><i><img :src="require('../assets/image/tongtian_book.jpeg')" alt="">
          <span>通天道符</span></i></li>
        <li><i><img :src="require('../assets/image/tongtian_book.jpeg')" alt="">
          <span>通天道符</span></i></li>
      </ul>
    </section>
    <section class="footer">
      <div class="footer-link clearfix">
        <div>
          <button :disabled="isCollect" @click="collectBook(result['_id'])" class="collect-btn">
          </button>
          <button>
          </button>
        </div>
        <router-link :to='`/read/${result._id}`'>
          <button class="footer-but">立即阅读</button>
        </router-link>
      </div>
    </section>
  </section>
</template>
<script>
  import Arrows from '../base/Arrows'
  import {getDetail, isCollect, collectBook} from "../api";

  export default {
    name: 'details',
    components: {Arrows},
    data() {
      return {
        dielog: false,
        msg: null,
        isLoading: true,
        result: {},
        rating: {},
        a: "http://statics.zhuishushenqi.com",
        isCollect: false
      }
    },
    async created() {
      let {bid} = this.$route.params;

      let {result = {}} = await getDetail(bid);
      this.result = result || {};
      this.rating = result.rating || {};
      this.isCollect = (await isCollect(bid))['includes']
      console.log(1);
      this.isLoading = false
    },
    methods: {
      collectBook(bid) {
        collectBook(bid).then(res => {
          if (res.code === 200) {
            this.dielog = true;
            this.msg = '加入成功'
            this.isCollect = true
            setTimeout(() => {
              this.dielog = false;
            }, 1000);

          }
        })
      },
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .detail {
    width 100%
    height 100%
    .detail-header {
      width 100%;
      background #fff
      margin-bottom px2rem(20)
      .detail-top {
        width 100%;
        box-sizing border-box
        background #fff
        position: fixed
        left: 0
        top: 0
        line-height px2rem(46)
        padding px2rem(20) px2rem(35)
        .detail-left {
          float left
          .detail-img {
            width px2rem(58)
            height px2rem(58)
          }
        }
        .detail-right {
          img {
            width px2rem(58)
            height px2rem(58)
            margin-left px2rem(30)
          }
          float right
        }
      }
      .detail-bottom {
        height px2rem(255)
        padding px2rem(20)
        margin px2rem(90) px2rem(35) 0 px2rem(35)
        .bottom-left {
          float left
          img {
            width px2rem(155)
            height px2rem(205)
            margin-right px2rem(30)
          }
        }
        .bottom-right {
          li {
            height px2rem(62.6)
            line-height px2rem(62.6)
          }
          .li_1 {
            h3 {
              font-size px2rem(34)
              color #222629;
            }
          }
          .li_2 {
            span {
              font-size px2rem(28)
              color #969897;
            }
            img {
              width px2rem(26)
              height px2rem(26)
              vertical-align middle
            }
          }

          .li_3 {
            i {
              font-style normal
              border px2rem(2) solid #deb8b7
              padding px2rem(5)
              margin-right px2rem(15)
              .span-one {
                font-size px2rem(26)
                color #ba5855;
              }
            }
            span {
              font-size px2rem(26)
              margin 0 px2rem(5)
              color #a5a5a5;
            }
          }

        }
      }
    }

    .synopsis {
      margin-bottom px2rem(20)
      width 100%
      background #fff
      .synopsis-details {
        padding px2rem(35) px2rem(30)
        border px2rem(2) solid #f0f0f0;
        h3 {
          font-size px2rem(32)
          color #222828
        }

        p {
          display: -webkit-box; /*弹性盒模型*/
          max-height px2rem(124)
          -webkit-line-clamp: 3; /*文字的行数 需要显示几行就写几行*/
          overflow: hidden; /*溢出隐藏*/
          margin-top px2rem(40)
          text-indent 2em;
          font-size px2rem(28)
        }
      }
      .synopsis-num {
        height px2rem(100)
        padding 0 px2rem(24)
        display: flex
        align-items center

        img {
          width px2rem(48)
          height px2rem(48)
          margin-right: px2rem(24)
        }

        p {
          flex 1
          color #7a7a7a;
          margin-right px2rem(10)
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        i {
          font-style normal
          margin-left auto
          color #bdbfbe
        }
      }
    }

    .honor {
      width 100%
      background #fff;
      margin-bottom px2rem(20)
      .honor-list {
        margin px2rem(20) px2rem(30) 0 px2rem(30)
        border-bottom px2rem(2) solid #f0f0f0
        h3 {
          padding-top px2rem(30)
          color #272b2c;
          font-size px2rem(32)
        }
        ul {
          height px2rem(120)
          margin px2rem(20) 0
          li {
            width 32%
            height px2rem(60)
            line-height px2rem(60)
            display inline-block
            text-align center
          }
        }
      }

      .honor-pass {
        padding px2rem(40) px2rem(30)
        span {
          color #333436

          font-size px2rem(28)

          i {
            color #c39059;
            margin 0 px2rem(8)
          }
        }
        b {
          border px2rem(2) solid #d4bec1
          padding px2rem(8)
          float right
          color #a64741;
          font-size px2rem(26)
        }

      }
    }

    .invitation {
      width 100%
      background #fff;
      margin-bottom px2rem(20)
      .invitation-header {
        margin 0 px2rem(30)
        h3 {
          display inline-block
          padding px2rem(30) 0 0 0
          font-size px2rem(32)
        }
        span {
          float right
          padding-top px2rem(20)
          font-size px2rem(28)
          color #6e706f;
          img {
            margin-left px2rem(5)
            width px2rem(30)
            height px2rem(30)
            vertical-align middle
          }

        }
      }

      .invitation-list {
        padding px2rem(35) px2rem(30)
        border-bottom px2rem(2) solid #eee
        li {
          line-height px2rem(66.6)
        }
        .list-1 {

          img {
            float left
            width px2rem(60)
            height px2rem(60)
            border-radius 50%
          }
          span {
            float left
            margin-left px2rem(30)
          }
        }

        .list-2 {
          p {
            margin-left px2rem(30)
            font-size px2rem(30)
            color #080c0d;
          }
        }
        .list-3 {
          margin-top px2rem(10)
          i {
            font-style normal
            font-size px2rem(28)
            color #b4b6b5;
          }
          span {
            float right
            margin-left px2rem(40)
            img {
              width px2rem(42)
              height px2rem(42)
              vertical-align middle
            }
            i {
              vertical-align middle
              font-size px2rem(32)
            }
          }
        }
      }
    }

    .fans {
      width 100%
      background #fff
      .fans-header {
        margin 0 px2rem(30)
        h3 {
          display inline-block
          padding px2rem(30) 0 0 0
          font-size px2rem(32)
        }
        span {
          float right
          padding-top px2rem(20)
          font-size px2rem(28)
          color #6e706f;
          img {
            margin-left px2rem(5)
            width px2rem(30)
            height px2rem(30)
            vertical-align middle
          }

        }
      }
      .fans-list {
        margin px2rem(30)
        li {
          line-height px2rem(140)
          border-bottom px2rem(2) solid #f6f6f6
          img {
            width px2rem(60)
            height px2rem(60)
            vertical-align middle
          }
          .head_port {
            float left
            margin-top px2rem(38)
          }
          .head_portrait {
            float left
            margin-left px2rem(40)
            border-radius 50%
            margin-top px2rem(38)
          }
          span {
            float left
            margin-left px2rem(40)
          }
          i {
            margin-left px2rem(20)
            img {
              width px2rem(100)
              height px2rem(50)
            }
          }
        }
      }
    }

    .related {
      width 100%
      background #fff
      .related-header {
        padding 0 px2rem(30)
        h3 {
          padding px2rem(30) 0
          color #272b2c;
          font-size px2rem(32)
        }
      }
      .related-list {
        margin-bottom px2rem(20)
        li {
          width 24%;
          display inline-block
          i {
            font-style normal
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            text-align: center;
            padding-bottom px2rem(20)
            img {
              width px2rem(150)
              height px2rem(200)
            }
          }

        }
      }
    }

    .footer {
      width 100%
      background #fff
      position fixed
      bottom: 0
      left 0
      z-index 8
      border px2rem(2) solid #f6f6f6
      .footer-link {
        padding px2rem(15) px2rem(30)
        display: flex
        justify-content center
        align-items center

        & > div {
          flex: 1
          font-size 0
          button {
            width px2rem(78)
            height px2rem(78)
            display: inline-block
            background: transparent
            border: none
            background: url("../assets/image/pic_book_cover_download.png") no-repeat center
            background-size: 100% 100%
            opacity .2
            &.collect-btn {
              opacity 1
              margin-right px2rem(24)
              background: url("../assets/image/pic_book_cover_add_shelf.png") no-repeat center
              background-size: 100% 100%
              &:disabled {
                background-image url("../assets/image/pic_book_cover_add_shelf_done.png")
              }
            }
          }
        }

        .footer-but {
          margin-left: auto
          border 0
          border-radius px2rem(8)
          background #e24443
          color: #fff;
          width: px2rem(245);
          height px2rem(65)
        }

      }

    }
  }
</style>
