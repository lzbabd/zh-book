<template>
  <section class="reack_home reack_light">
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <section class="reack_header clearfix">
      <h1 class="logo">
        <img :src='require("../assets/image/pic_shelf_title_logo.png")' alt="">
      </h1>
      <div class="reack_filtrate">
        <div class="filtrate">
            <span class='span-left'>
            <router-link to="/search">
            <img :src='require("../assets/image/pic_shelf_title_search.png")' alt="">
            </router-link>
          </span>
          <span class="span-right" @click="show=!show">
            <img :src="require('../assets/image/pic_shelf_title_more.png')" alt="">
          </span>
        </div>
      </div>
    </section>
    <section class="reack-neirong">
      <section class="reack_collect" v-for="(item,index) in result" :key="index">
        <div class="reack_img">
          <img v-lazy="a+item.cover" alt="">
        </div>
        <router-link tag="div" :to="`/read/${item['_id']}`">
          <ul class="reack_list clearfix">
            <li class="list_1">
              <h3>{{item.title}}</h3>
              <img @click.stop="fn(item['_id'])" :src="require('../assets/image/detail_more_icon.png')" alt="">
            </li>
            <li class="list_2">
              <span class="list-new">最新</span>
              <p>{{item.longIntro}}</p>
            </li>
            <li class="list_3">
              <span class="list-span">{{new Date(item.updated).getHours()}}小时前更新</span>
              <i>已读 <span class="span-read">{{item.retentionRatio}}%</span></i>
            </li>
          </ul>
        </router-link>
      </section>
    </section>
    <transition name="fade">
      <div class="filtrate_box" v-if="show" @click="close">
        <div class="filtrate-shade">
          <div class="shade"></div>
          <ul class="filtrate_list">
            <li>
              <img :src="require('../assets/image/pic_shelf_pop_collection.png')" alt="">
              <span>我的收藏</span>
            </li>
            <li>
              <img :src="require('../assets/image/pic_shelf_pop_cover_mode.png')" alt="">
              <span>图强模式</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <section class="bottom_nav" v-if="flg" @click="fn()">
        <div class="nav-shade">
          <div class="nav-top">
            <p>本书更新提醒</p>
            <i></i>
          </div>
          <div class="nav-bottom">
            <ul class="nav-list">
              <router-link :to="`/details/${this.bid}`" tag="li">
                <img :src="require('../assets/image/pic_shelf_item_menu_detail.png')" alt="">
                <span>详情</span>
              </router-link>
              <li  @click="remove(bid)">
                <img :src="require('../assets/image/pic_shelf_item_menu_delete.png')" alt="">
                <span>删除</span>
              </li>
              <li>
                <img :src="require('../assets/image/pic_shelf_item_menu_add_top.png')" alt="">
                <span>置顶</span>
              </li>
              <li>
                <img :src="require('../assets/image/pic_shelf_item_menu_download.png')" alt="">
                <span>下载</span>
              </li>
            </ul>
            <ul class="nav-list">
              <li>
                <img :src="require('../assets/image/pic_shelf_item_menu_circle.png')" alt="">
                <span>圈子</span>
              </li>
              <li>
                <img :src="require('../assets/image/pic_shelf_item_menu_share.png')" alt="">
                <span>分享</span>
              </li>
              <li>
                <img :src="require('../assets/image/pic_shelf_item_menu_recommend_ticket.png')" alt="">
                <span>推荐票</span>
              </li>
              <li>
                <img :src="require('../assets/image/pic_shelf_item_menu_month_ticket.png')" alt="">
                <span>月票</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </transition>
  </section>
</template>
<script>
  import {bookRack, deleteBook} from "../api";

  export default {
    name: 'reack',
    data() {
      return {
        show: false,
        flg: false,
        a: "http://statics.zhuishushenqi.com",
        result: [],
        message: "",
        bid: '',
        isLoading: true
      };
    },
    methods: {
      close() {
        if (this.show === true) {
          this.show = false;
        }
      },
      fn(id) {
        this.flg = !this.flg
        if (id) {
          this.bid = id;
        }
      },
      async request() {
        let {result = []} = await bookRack();
        this.result = result;
      },
      async remove(id) {
        await deleteBook(id).then(res => {
          if (res.code === 200) {
            this.result = this.result.filter(item => item['_id'] !== this.bid);
            this.bid = ''
          }
        })

      },
    },

    async created() {
      await this.request();
      this.isLoading = false

    },
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .reack_header {
    position fixed
    top: 0
    left 0
    z-index 9
    width: 100%;
    height: px2rem(100)
    line-height px2rem(100)
    background #fff;
    margin-bottom px2rem(20)
    .logo {
      margin-top px2rem(8)
      height 100%
      float: left;
      margin-left px2rem(35)
      img {
        width px2rem(174)
        height px2rem(40)
      }
    }
    .reack_filtrate {
      margin px2rem(10) px2rem(25) 0
      float: right;
      height 100%;
      display inline-block
      img {
        width px2rem(46)
        height px2rem(46)
      }
      .span-left {
        margin-right px2rem(70)
      }
      .span-right {
        position relative
      }
    }
  }
  .reack_home {
    width: 100%;
    .reack-neirong {
      width 100%;
      margin-top px2rem(130)
      .reack_collect {
        height px2rem(200)
        background #fff;
        padding: px2rem(30) 0;
        border-bottom px2rem(2) solid #f7f7f7;
        position relative;
        .reack_img {
          float left;
          margin 0 px2rem(35);
          img {
            width px2rem(150)
            height px2rem(200)
          }
        }
        .reack_list {
          height 100%
          .list_1 {
            width 100%

            height px2rem(66.6)
            line-height px2rem(66.6)
            h3 {
              float left
              font-size px2rem(34)
              color #262a2b
            }
            img {
              padding px2rem(20) px2rem(20) 0 px2rem(50)
              height px2rem(50)
              width px2rem(60)
              float right
              margin-right px2rem(30)
            }
          }

          .list_2 {
            height px2rem(66.6)
            line-height px2rem(66.6)
            .list-new {
              float left
              font-size px2rem(30)
              color #b5b5b5;
            }
            p {
              padding-left px2rem(15)
              white-space: nowrap;
              overflow hidden;
              text-overflow: ellipsis;
            }
          }

          .list_3 {
            height px2rem(66.6)
            line-height px2rem(66.6)

            .list-span {
              float left
              font-size px2rem(30)
              color #b5b5b5;
            }
            i {
              font-style normal
              float right
              margin-right px2rem(30)
              span {
                color #d1af8c
              }
            }

          }
        }
      }
    }

    .bottom_nav {
      position absolute
      top: 0
      left 0;
      bottom 0
      right 0
      background rgba(0, 0, 0, .4)
      width 100%
      height 100%
      z-index 10
      .nav-shade {
        position fixed
        bottom: 0
        left 0
        z-index 6
        width: 100%;
        background #fff
        .nav-top {
          border-bottom px2rem(2) solid #f6f6f6;
          p {
            margin px2rem(35) px2rem(30)
            font-size px2rem(32)
            color #363837;
          }

        }
        .nav-bottom {
          height px2rem(350)

          .nav-list {
            width 100%
            height px2rem(175)
            display: flex;
            li {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              flex: 1;
              text-align: center;
              img {
                width px2rem(88)
                height px2rem(88)
              }
            }
          }

        }
      }
    }

    .filtrate_box {
      position absolute
      top: 0
      left 0;
      z-index 999
      bottom 0
      right 0
      background rgba(0, 0, 0, .4)
      width 100%
      height 100%
      .filtrate-shade {
        .shade {
          position absolute
          top px2rem(84)
          right px2rem(60)
          z-index 999
          width: 0;
          height: 0;
          border-width: px2rem(15);
          border-style: solid;
          border-color: transparent transparent #fff transparent;
          transform: rotate(360deg);
        }
        .filtrate_list {
          position absolute;
          top: px2rem(110);
          right px2rem(20)
          z-index 999
          width px2rem(250)
          height px2rem(300)
          line-height px2rem(100)
          background #fff
          border-radius 5%
          padding 0 px2rem(10)
          img {
            width px2rem(75)
            height px2rem(75)
            margin-right px2rem(30)
            vertical-align middle
          }
          span {
            color #37383a;
          }
        }
      }
    }
  }
  .info-enter {
    opacity: 0;
  }
  /*开始的位置是你想改变的状态*/
  .info-enter-active {
    transition: all .5s linear
  }
  .info-leave-active {
    opacity: 0;
    transition: all .5s linear
  }
</style>

