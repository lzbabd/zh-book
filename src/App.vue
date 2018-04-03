<template>
  <div id="app" v-cloak>
    <Bottom v-if="!link" />
    <div id="route-container">
      <div id="route-auto">
        <transition name="fade">
          <keep-alive exclude="mine,login,register,details,reack">
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import Bottom from './base/Bottom.vue'


  let routePath = ['login', 'register', 'search','classify','details','theme','read']
  export default {
    components: {Bottom},
    computed: {
      link() {
        return routePath.some(item => this.$route.path.includes(item))
      }
    }
  }
</script>
<style lang="stylus">
  @import "./assets/css/public.styl";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height 100%
  }
  #route-container {
    box-sizing border-box
    height 100%
    margin-top px2rem(-100)
    padding-top px2rem(100)
    overflow-y: auto;
    overflow-x: hidden;
  }
  #route-auto {
    width 16rem
    margin 0 auto
  }
  [v-cloak] {
    display: none;
  }
</style>
