import Vue from 'vue'
import Router from 'vue-router'

import Friends from './components/Friends'
import MusicComments from './components/MusicComments'
import Discovery from './components/Discovery'
import Users from './components/Users'
import EditUsers from './components/EditUserInfo'
import EditListInfo from './components/EditListInfo'
import MusicListinfo from './components/MusicListInfo'
import MusicList from './components/MusicList'
import SearchMusic from './components/SearchMusic'


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
    {path:'/users/:userId',component:Users,name:"user",props:true},
    {path:'/editUsers',component:EditUsers,name:"editUsers"},
    {path:'/editListInfo/:isCreated/:id',component:EditListInfo,name:"editListInfo"},
    {path:'/friends', name:"friends",component:Friends},
    {path:'/musicComments/:id', name:"musicComments",component:MusicComments},
    {path:'/musiclstinfo/:isCreated/:id' ,name:"musiclstinfo",component:MusicListinfo},
    {path:'/musiclist',component:MusicList},
    {path:'/searchMusic/:keyword',component:SearchMusic,name:"searchMusic"},
    {path:'*',redirect:'/'}

  ]
})
