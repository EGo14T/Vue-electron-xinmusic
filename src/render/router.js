import Vue from 'vue'
import Router from 'vue-router'

import Comments from './components/Comments'
import Discovery from './components/Discovery'
import Users from './components/Users'
import EditUsers from './components/EditUserInfo'
import MusicListinfo from './components/MusicListInfo'
import MusicList from './components/MusicList'


// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',component:Discovery,name:"discovery"},
    {path:'/users',component:Users,name:"user"},
    {path:'/editUsers',component:EditUsers,name:"editUsers"},
    {path:'/comment', name:"comment",component:Comments},
    {path:'/musiclstinfo/:isCreated/:id' ,name:"musiclstinfo",component:MusicListinfo},
    {path:'/musiclist',component:MusicList},
    {path:'*',redirect:'/'}

  ]
})
