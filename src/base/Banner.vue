<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,index) in result" :key="index">
      <img :src="slide.img" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import {getBanner} from "../api";
  export default {
    data() {
      return {
        result:[],
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: true
        },
      }
    },
    async created(){
      let {result = []}=await getBanner();
      this.result =result
    },
  };

</script>
<style scoped lang="stylus">
  img{
    width: 100%;
  }
</style>
