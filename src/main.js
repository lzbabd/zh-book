import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/image/p2.gif'),
  loading: require('./assets/image/p2.gif'),
  attempt: 1
})

import '@/assets/css/public.styl'
import '@/assets/css/reset.styl'

import Loading from '@/base/Loading.vue'
import Tips from '@/base/Tips.vue'
import Scroll from '@/base/Scroll.vue'

//导入轮播组件
import Swiper from  "vue-awesome-swiper"
Vue.use(Swiper);
import 'swiper/dist/css/swiper.css'


Vue.config.productionTip = false;
// 全局 组件
Vue.component('Loading', Loading)
Vue.component('Tips', Tips)
Vue.component('Scroll', Scroll)

Vue.filter('countWan',val => {
 return (Math.round(val/10000) || 1) + '万字'
})

//

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
