/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: '',             //用户信息
        accessToken: null,    //令牌
        refreshToken: null,   //刷新令牌

//--------------------------------------------------------

        showMusicList: [],     //展示的歌单，没有点击

        curMusicList: [],      //当前播放的音乐列表  点击歌单里的歌曲

        randomlist: [],        //随机播放列表

        curIndex: -1        //当前正在播放


    },
    mutations: {
        //登录
        [types.LOGIN]: (state, data) => {
            
            localStorage.user = JSON.stringify(data.user);

            localStorage.accessToken = data.access_token;
            localStorage.refreshToken = data.refresh_token;
            
            state.user = data.user;
            state.accessToken = data.access_token;
            state.refreshToken = data.refresh_token;
        },
        //注销
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        },

        //载入歌单
        [types.LOADLIST]: (state,data) => {
            state.curMusicList = data;
            
        },

        //载入当前歌单
        [types.LOADLIST]: (state,data) => {
            state.curMusicList = data;
        },

        //载入当前歌曲
        [types.LOADMUSIC]: (state,data) => {
            state.curIndex = data;
        }




    }
})