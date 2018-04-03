<template>
  <div>
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <Tips :show="dielog" :msg="msg"/>
    <div class="mine-container">
      <header class="mine-header">
        <img src="../assets/image/pic_main_personal_setting.png" alt="">
      </header>
      <main class="mine-main">
        <section class="mine-info">
          <img class="avatar" src="../assets/image/default_user_head_photo.png" alt="">
          <a class="info-content" @click="goLogin">
            <div v-if="isLogin" class="islogin">
              <h3 class="name">
                {{userInfo.username}}
              </h3>
              <p class="count">
                <span>月票<b>{{0}}</b></span>
                <span>推荐票<b>{{0}}</b></span>
              </p>
            </div>
            <h3 v-else class="nologin">马上登陆</h3>
            <img src="../assets/image/pic_right_arrows.png" alt="">
          </a>
        </section>
        <ul class="main-module">
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_account.png" alt="">
            </div>
            <div class="item-content">
              <p>我的账户</p>
              <div class="right">
                <b>0</b> 金币 <a href="javascript:">充值</a>
              </div>
            </div>
          </li>
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_my_coupon.png" alt="">
            </div>
            <div class="item-content">
              <p>我的书券</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_gift_center.png" alt="">
            </div>
            <div class="item-content">
              <p>礼包中心</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
        </ul>
        <ul class="main-module">
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_my_message.png" alt="">
            </div>
            <div class="item-content">
              <p>我的消息</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_my_collection.png" alt="">
            </div>
            <div class="item-content">
              <p>我的收藏</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_my_dynamic.png" alt="">
            </div>
            <div class="item-content">
              <p>我的动态</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_fan_score.png" alt="">
            </div>
            <div class="item-content">
              <p>星值积分</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
        </ul>
        <ul class="main-module">
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_listen_center.png" alt="">
            </div>
            <div class="item-content">
              <p>听书中心</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
        </ul>
        <ul class="main-module">
          <li class="main-item">
            <div class="icon-box">
              <img src="../assets/image/pic_main_personal_about_us.png" alt="">
            </div>
            <div class="item-content">
              <p>关于我们</p>
              <div class="right">
                <img src="../assets/image/pic_right_arrows.png" alt="">
              </div>
            </div>
          </li>
        </ul>
        <div v-if="isLogin" class="logout-box">
          <a class="logout-btn" @click="logout">退出登录</a>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
  import {logout, getUserInfo} from '@/api'

  export default {
    name: 'mine',
    async created() {
      let result = await getUserInfo()
      this.isLogin = result.code === 200
      this.userInfo = result['result']
    },
    data() {
      return {
        isLogin: false,
        isLoading: false,
        userInfo: {},
        dielog: false,
        msg: '无提示'
      }
    },
    methods: {
      goLogin() {
        if (!this.isLogin) {
          this.$router.push('/login')
        }
      },
      logout() {
        this.isLoading = true;
        logout().then(res => {
          if (res.code === 200) {
            this.isLoading = false;
            this.dielog = true;
            this.msg = '退出成功'
            setTimeout(() => {

              this.isLogin = false
              this.userInfo = {}
              this.dielog = false;
            }, 1000);
            return
          }
          this.dielog = true;
          this.msg = '退出失败'
          setTimeout(() => {
            this.dielog = false;
          }, 1000);
        }).catch(e => {
          this.isLoading = false;
          debugger
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .mine-container
    .mine-header
      box-sizing border-box
      position: fixed
      left: 0
      top: 0
      width 100%
      height px2rem(100)
      background: #fff
      display: flex
      align-items center
      padding 0 px2rem(24)
      img
        display: block
        margin-left: auto
        width px2rem(46)
        height px2rem(46)

    .mine-main
      margin: px2rem(100) 0 0
      padding-bottom: px2rem(24)
      .mine-info
        padding: px2rem(4) px2rem(24) px2rem(36)
        background: #fff
        display: flex
        align-items center
        .avatar
          width px2rem(106)
          height px2rem(106)
          margin-right: px2rem(24)
        .info-content
          display: flex
          justify-content space-between
          align-items center
          flex auto
          .islogin, nologin
            flex auto
          img
            width px2rem(24)
            height px2rem(24)
          .nologin
            font-size px2rem(32)
            color #aaa
            line-height px2rem(100)
          .islogin
            line-height px2rem(53)
            .name
              font-size px2rem(28)
            .count
              b
                color #fc6000
                font-weight bold
                margin: 0 px2rem(6)

      .main-module
        background: #fff
        margin-top: px2rem(24)
        .main-item
          display: flex
          align-items center
          .icon-box
            padding: px2rem(25)
            img
              display: block
              width px2rem(50)
              height px2rem(50)
          .item-content
            display: flex
            align-items center
            padding-right: px2rem(24)
            flex auto
            justify-content space-between
            border-bottom: px2rem(1) solid #f1f1f1
            height px2rem(100)
            p, .right
              line-height: px2rem(46)
              font-size px2rem(28)
              b
                font-weight bold
                color #fc6000
                margin-right: px2rem(3)
              a
                box-sizing border-box
                display: inline-block
                height px2rem(44)
                padding 0 px2rem(24)
                background: $mainColor
                border: px2rem(1) solid darken($mainColor, 3)
                border-radius: px2rem(4);
                margin-left: px2rem(24)
                color white
                font-size px2rem(24)
                line-height: px2rem(44)
              img
                display: block
                margin-top: px2rem((46 - 24) / 2)
                width px2rem(24)
                height px2rem(24)
        & li:last-child
          .item-content
            border: none;

      .logout-box
        margin-top px2rem(36)
        height px2rem(88)
        background: #fff
        line-height px2rem(90)
        text-align: center
        border: px2rem(1) solid #dedede;
      .logout-btn
        font-size px2rem(34)
        color $mainColor
</style>
