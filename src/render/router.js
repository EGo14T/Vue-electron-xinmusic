import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import MyMusic from './components/MyMusic'
import Comments from './components/Comments'
import Users from './components/Users'
import EditUsers from './components/EditUserInfo'
import UploadAvatar from './components/UploadAvatar'
import Register from './components/Register'
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
    {path:'/',component:Users,name:"user"},
    {path:'/editUsers',component:EditUsers,name:"editUsers"},
    {path:'/uploadAvatar',component:UploadAvatar,name:"uploadAvatar"},
    {path:'/My',component:MyMusic},
    {path:'/comment', name:"comment",component:Comments},
    {path:'/about',component:Users},
    {path:'/register',component:Register},
    {path:'/home',component:Home},
    {path:'/musiclstinfo/:isCreated/:id' ,name:"musiclstinfo",component:MusicListinfo},
    {path:'/musiclist',component:MusicList},
    {path:'*',redirect:'/'}

  ]
})
