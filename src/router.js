import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import MyMusic from './components/MyMusic'
import Friends from './components/Friends'
import Users from './components/Users'
import Login from './components/Login'
import Register from './components/Register'
import MusicList from './components/MusicList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',component:Users},
    {path:'/My',component:MyMusic},
    {path:'/friends',component:Friends},
    {path:'/about',component:Users},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/home',component:Home},
    {path:'/musicList',component:MusicList},
    {path:'*',redirect:'/'}

  ]
})
