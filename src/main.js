// 引入vue模块
import Vue from 'vue'
//引入vue路由模块
import VueRouter from 'vue-router'
//引入 app组件 根节点
import App from './App.vue'

//引入路由
import index from './components/index.vue';
import goodsinfo from './components/goodsinfo.vue';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import buyCar from './components/buyCar.vue';
import login from './components/login.vue';
import payOrder from './components/payOrder.vue';
import Vuex from 'vuex';
//在Vue添加原型
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//axios 设置带上cookie
axios.defaults.withCredentials = true
Vue.prototype.axios=axios;
//引入轮播UI插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import stars from './components/stars.vue'
import  './assets/statics/site/css/style.css';
//引入懒加载
import VueLazyload from 'vue-lazyload';
//懒加载中间件
Vue.use(VueLazyload,{
  loading:require('./assets/img/timg.gif')
});

//UI中间件
Vue.use(ElementUI);
//路由中间件
Vue.use(VueRouter);
//引入iView
Vue.use(iView);
//引入时间插件
Vue.use(Vuex);

import moment from 'moment';
//过滤
Vue.filter('cutTime', function (value) {  
      return moment(value).format('YYYY-MM-DD') 
  }
)

const router = new VueRouter({
  routes :[
    {path:'/',redirect:"/index"},
    {path:'/index',component:index},
    {path:'/buyCar',component:buyCar},
    {path:'/goodsinfo/:id',component:goodsinfo},
    {path:'/login',component:login},
    {path:'/payOrder',component:payOrder},
    
  ]
});
// 判断数据是否存在
let buylist = JSON.parse(window.localStorage.getItem('buylist')) || {};
const store = new Vuex.Store({
  state: {
    buylist,
    islogin:false,
    fromPath:'',
  },
  getters: {
    totalCount: state => {
      let num = 0;
      for (const key in state.buylist) {
        num+=parseInt(state.buylist[key])
      }
      return num;
    }
  },
  mutations: {
    buyGood(state,info) {
      console.log(info);
      if(state.buylist[info.goodid]){
        let oldnum = parseInt(state.buylist[info.goodid]);
        
        oldnum += parseInt(info.goodnum)
        state.buylist[info.goodid] = oldnum
      }else{
        Vue.set(state.buylist, info.goodid, parseInt(info.goodnum));
      }
    },
    changeCount(state,info){
      state.buylist[info.goodid]=info.goodnum
    },
    del(state,id){
      Vue.delete(state.buylist,id)
    },
    changelogin(state,islogin){
      state.islogin=islogin
    },
    // 修改来时的路由
    rememberFromPath(state, path) {
      state.fromPath = path;
    }
  }
})
//注册路由守卫,跳转时过滤
router.beforeEach((to,from,next)=>{
  //记住从哪来
  store.commit('rememberFromPath', from.path);
  // console.log(to.path);
      if(to.path=='/payOrder'){

        axios
          .get("site/account/islogin")
          .then(response => {
            console.log(response);
            // 提示用户
            if (response.data.code=="nologin") {
              // 没登录
              next('/login')
            
            } else {
            //  登录
                  next()
            }
          })
          .catch(err => {
            console.log(err);
          });
      }else{
        next()
      }
});

Vue.config.productionTip = false

new Vue({
  //挂载路由规则
  el:'#app',
  router,
  store,
  render: h => h(App),
})

window.onbeforeunload = function () {
  // alert('onbeforeunload');
  // window.localStorage.setItem('onbeforeunload',123);
  window.localStorage.setItem('buylist', JSON.stringify(store.state.buylist));
}
