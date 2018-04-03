<template>
  <section class="list">
    <section class="list_header">
      <h2 class="pay">关注</h2>
      <router-link to="/search">
        <img :src="require('../assets/image/book_search_icon.png')" alt="">
      </router-link>
      <router-view/>
    </section>

    <section class="list_content">
      <h3 class="view_tit">你可能感兴趣的圈子</h3>
      <section v-for="(cir,index) in result" class="forum_thread" :key="index">
        <section class="forum_box">
          <section class="forum_pic">
            <img v-lazy="cir['imgUrl']" alt="">
          </section>
          <section class="forum_rb">
            <p class="forum_name">{{cir.forumTitle}}</p>
            <section class="forum_info">
              关注
              <span>{{cir.followerNum}}</span>
              帖子
              <span>{{cir.threadNum}}</span>
            </section>
          </section>
          <button @click="handel(cir)"
                  :class="{'forum_btn':!cir.isFollow}"
          >{{cir.isFollow ? '已关注': '+ 关注'}}

          </button>
        </section>
        <section class="thread_box">
          <section class="thread_name">
           {{cir.threadTitle}}
          </section>
          <section class="thread_con" v-html="cir.threadContent">

          </section>

          <section class="thread_pic3">
            <img v-for="img in cir.threadThumbnailUrls" v-lazy="img" alt="">
          </section>
        </section>
      </section>


    </section>
  </section>
</template>

<script>
  import Search from "../base/Search.vue";
  import {getCircle} from '../api'
  export default {
    data () {
      return {
        result:[],
        value:'+ 关注',
        val: -1,
        name: 'Circle',
      }
    },
     async created(){
      let {result=[]}=await getCircle();
      console.log(result);
      this.result=result||[];
     },
    methods: {
      handel(cir) {
        cir.isFollow = !cir.isFollow

      },

    },
    components: {Search},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "../assets/css/public.styl";

  .list {
    width: 100%
    .list_header {
      position fixed
      top: 0
      z-index 999
      left: 0
      width: 100%
      height: px2rem(95)
      background: #fff


      .pay {
        height: px2rem(95)
        line-height: px2rem(95)
        float: left
        margin-left: px2rem(30)
        font-size: px2rem(32)
        color: #141519

      }
      img {
        width: px2rem(45)
        height: px2rem(45)
        float right
        margin-top: px2rem(28)
        margin-right: px2rem(30)
      }
    }

    .list_content {
      width: 100%
      position: relative
      margin-top:px2rem(100)

      .view_tit {
        width: 100%
        height: px2rem(50)
        line-height: px2rem(50)
        font-size: px2rem(26)
        color: #bdc0c6
        font-weight: normal
        text-align: left
        text-indent: px2rem(20)

      }

      .forum_thread {
        width: 100%
        margin-bottom: px2rem(6)
        background: #fff
        margin-top: px2rem(20)

        .forum_box {
          height: px2rem(80)
          border-bottom: px2rem(.9) solid #ececec
          padding: px2rem(28)
          display: flex;

          .forum_pic {
            vertical-align: baseline
            flex-grow: 1

            img {
              border-radius: px2rem(5)
              width: px2rem(60)
              height: px2rem(80)
              box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(109, 115, 147, .3);
            }
          }
          .forum_rb {
            flex-grow: 999
            flex-shrink: 0;
            height: px2rem(80)
            text-align: left
            margin-left: px2rem(15)

            .forum_name {
              font-size: px2rem(28)
              color: #2d3035
              text-align: left
              height: px2rem(40)
              line-height: px2rem(40)
              overflow: hidden
              white-space: nowrap;
              text-overflow ellipsis;
            }
            .forum_info {
              font-size: px2rem(24)
              height: 50%
              color: #8d8e91;
              line-height: 2

              span {
                color: #2d3035
                display: inline-block;
                margin-right: px2rem(15)

              }
            }

          }
          .forum_btn {
            background: #e24444
            border: px2rem(1) solid #e2444
            font-size: px2rem(24)
            color: #fff
            border-radius: px2rem(10)
            width: px2rem(113)
            height: px2rem(50)
            -webkit-box-flex: 1;
            flex-grow: 1;

          }
          button {
            background: #fff
            border: px2rem(1) solid #e24444
            font-size: px2rem(24)
            color: #e24444
            border-radius: px2rem(10)
            width: px2rem(113)
            height: px2rem(50)
            -webkit-box-flex: 1;
            flex-grow: 1;

          }
        }
        .thread_box {
          text-align: left
          padding: px2rem(28)

          .thread_name {
            width: 100%
            font-size: px2rem(28)
            color: #2d3035
            letter-spacing px2rem(2)
            line-height: 1.5
          }
        }
      }
      .forum_thread:nth-of-type(1) {
        margin-top: 0
      }
      .thread_con {
        width: 100%
        color: #8d8e91
        line-height: 1.5
        font-size: px2rem(26)
        display: -webkit-box
        max-height px2rem(78)
        -webkit-line-clamp: 2
        overflow: hidden;
        padding-top px2rem(6)
        margin-bottom: px2rem(20)
      }
      .thread_pic3 {
        display: flex;
        position: relative;
        -webkit-box-pack: justify;
        justify-content: space-between;
        flex-wrap wrap

        img {
          flex 1
          text-align: center
          margin px2rem(6)
        }

      }
      .view_showmore {
        margin-top: px2rem(40)
        position: relative;
        text-align: center
        a {
          color: #e24444;
          font-size: px2rem(28)
        }

      }

    }

  }


</style>
