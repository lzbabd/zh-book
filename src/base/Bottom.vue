<template>
  <ul class="footer">
    <router-link to="/store" tag="li">
      <i class="image_one"></i>
      <span>书城</span>
    </router-link>
    <router-link to="/reack" tag="li">
      <i class="image_two"></i>
      <span>书架</span>
    </router-link>
    <router-link to="/circle" tag="li">
      <i class="image_three"></i>
      <span>圈子</span>
    </router-link>
    <router-link to="/mine" tag="li">
      <i class="image_four"></i>
      <span>我的</span>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: "Bottom",
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/css/public.styl";
  .footer
    position: fixed;
    left: 0;
    bottom: 0
    height: px2rem(99)
    border-top: px2rem(1) solid gainsboro;
    display: flex;
    width: 100%;
    background #ffffff
    li
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      color: green
      i
        height: px2rem(44)
        width: px2rem(48)
        bs()
      .image_one
        background-image  url("../assets/image/pic_main_tab_store_normal.png")
      .image_two
        background-image  url("../assets/image/pic_main_tab_shelf_normal.png")
      .image_three
        background-image  url("../assets/image/pic_main_tab_circle_normal.png")
      .image_four
        background-image  url("../assets/image/pic_main_tab_personal_normal.png")
      &.router-link-active .image_one
         background-image  url("../assets/image/pic_main_tab_store_selected.png")
      &.router-link-active .image_two
        background-image  url("../assets/image/pic_main_tab_shelf_selected.png")
      &.router-link-active .image_three
          background-image  url("../assets/image/pic_main_tab_circle_selected.png")
      &.router-link-active .image_four
        background-image  url("../assets/image/pic_main_tab_personal_selected.png")

      span
        margin-top: px2rem(5)
        display: block
        font-size: px2rem(18)
        color #000
      &.router-link-active span
        color #e24443


</style>
