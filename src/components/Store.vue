<template>
  <div class="store">
    <nav class="nav">
      <router-link to="/search">
    <img src="../assets/image/book_search_icon.png" alt="" class="nav_image">
    <input type="text" disabled="disabled" placeholder="搜索作者、书籍、圈子、关键词" class="nav_int">
      </router-link>
    <router-link to="/classify">
      <span class="nav_class">分类</span>
    </router-link>
    </nav>
    <ul class="store-head">
      <router-link to="/store/home"  tag="li">
        <span>精选</span>
      </router-link>
      <router-link to="/store/man" tag="li">
        <span>男生</span>
      </router-link>
      <router-link to="/store/woman" tag="li">
        <span>女生</span>
      </router-link>
      <router-link to="/store/charge" tag="li">
        <span>免费</span>
      </router-link>
      <router-link to="/store/queue" tag="li">
        <span>排行</span>
      </router-link>
      <router-link to="/store/end" tag="li">
        <span>完本</span>
      </router-link>
    </ul>
    <div class="route-con">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .route-con
  .store

    .nav
      position fixed
      left  px2rem(30)
      top: px2rem(20)
      z-index 999
      width:px2rem(676)
      height:px2rem(70)

      .nav_image
        width:px2rem(40)
        height:px2rem(40)
        position absolute
        top:px2rem(15)
        left px2rem(10)
      .nav_int
        width:px2rem(510)
        height:100%
        padding-left px2rem(70)
        margin-right:px2rem(10)
        border: 0
        background #f3f7f8
      .nav_class
          color #c77573
    .store-head
      position: fixed;
      left 0
      top 0
      height: px2rem(198)
      border-top: px2rem(1) solid gainsboro;
      background #fff
      display: flex;
      width: 100%;
      border-bottom px2rem(1) solid #ccc
      z-index 880
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
          span::after
            display: block
            position absolute
            top px2rem(40)
            left px2rem(5)
            width: px2rem(30)
            height px2rem(3)
            background red
            content ''

</style>
