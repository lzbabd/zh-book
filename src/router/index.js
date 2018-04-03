import Vue from 'vue'
import Router from 'vue-router'

// 路由按需加载 const Reack = () => import('')

const Reack = () => import('@/components/Reack');
const Circle = () => import('@/components/Circle');
const Store = () => import('@/components/Store.vue');
const Man = () => import('@/components/store/Man.vue');
const Classify = () => import('@/components/store/Classify.vue');
const Woman = () => import('@/components/store/Woman.vue');
const Charge = () => import('@/components/store/Charge.vue');
const Queue = () => import('@/components/store/Queue.vue');
const End = () => import('@/components/store/End.vue');
const Home = () => import('@/components/store/Home.vue');

const Search = () => import('../base/Search');
const Theme = () => import('../components/store/Theme');
const Read = () => import ('@/components/Read');
const Chapter=()=>import('../base/Chapter');

const Details =()=> import ('@/components/Details');


// Mine 用户
const Mine = () => import('../components/Mine.vue');
const Login = () => import('../components/Login.vue');
const Register = () => import('../components/Register.vue');



Vue.use(Router);
let routes = [
  {path: '/reack', component: Reack},
  {path: '/details/:bid',component: Details},
  {path: '/circle', component: Circle},
  {path: '/search', component: Search},
  {path: '/read/:bid', name:'read', component: Read},
  {path: "/classify", component: Classify},
  {path: "/theme/:major", component: Theme},
  {
    path: '/store', component: Store,
    children: [          //二级路由
      {path: "", redirect: 'home'},
      {path: "home", component: Home},
      {path: "woman", component: Woman},
      {path: "man", component: Man},
      {path: "charge", component: Charge},
      {path: "queue", component: Queue},
      {path: "end", component: End},
      {path: "*", component: Home},
    ]
  },
  {path: '/mine', component: Mine},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '*', redirect: '/store'},
];

export default new Router({routes})
