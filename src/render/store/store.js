/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

import { shuffle } from '../utils/shuffle'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: '',             //用户信息
        accessToken: null,    //令牌
        refreshToken: null,   //刷新令牌

        //--------------------------------------------------------

        defaultMusicListID: "",  //用户默认歌单的ID （“我喜欢的音乐”的ID）

        createMusicList: [],   //用户创建的歌单列表

        showMusicList: [],     //展示的歌单，没有点击

        contextMenuIndex: 0,   //右键菜单

        curMusicList: [],      //当前播放的音乐列表  点击歌单里的歌曲

        randomlist: [],        //随机播放列表

        curIndex: -1,          //当前正在播放

        curMusicId: "",        //当前正在播放的ID

        curPlayStatus: 1,       //当前的播放状态 0单曲循环  1列表循环  2随机播放

        historylist: []
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

        //获取用户默认歌单ID （我喜欢的音乐 的 歌单ID）
        [types.SET_DEFAULT_LIST]: (state, data) => {
            state.defaultMusicListID = data[0]?.musiclistid;
            state.createMusicList = data;
            //console.log(state.createMusicList)
            localStorage.defaultMusicListID = state.defaultMusicListID;
        },

        //载入歌单
        [types.LOAD_SHOW_LIST]: (state, data) => {
            state.showMusicList = data;
        },

        //载入当前歌单
        [types.LOAD_LIST]: (state, data) => {
            state.curMusicList = state.showMusicList;
            state.curMusicId = state.curMusicList[data].id;
            state.curIndex = data
            state.randomlist = shuffle(state.curMusicList)
        },

        //右键菜单
        [types.SET_CONTEXT_MENU]: (state, data) => {
            state.contextMenuIndex = data;
        },

        //切歌
        [types.CHANGE_MUSIC]: (state, data) => {
            let len = state.curMusicList.length;
            //单曲循环
            //列表循环
            if (state.curPlayStatus == 1 || state.curPlayStatus == 0) {
                if (data == 0) {
                    state.curIndex == 0 ? state.curIndex = --len : state.curIndex--;
                    state.curMusicId = state.curMusicList[state.curIndex].id
                } else {
                    state.curIndex == len - 1 ? state.curIndex = 0 : state.curIndex++;
                    state.curMusicId = state.curMusicList[state.curIndex].id
                }
            }
            //随机播放
            else {
                if (data == 0) {
                    state.curIndex == 0 ? state.curIndex = --len : state.curIndex--;
                    state.curMusicId = state.randomlist[state.curIndex].id
                } else {
                    state.curIndex == len - 1 ? state.curIndex = 0 : state.curIndex++;
                    state.curMusicId = state.randomlist[state.curIndex].id
                }
            }
        },

        //切换播放状态
        [types.CHANGE_PLAY_STATUS]: (state, data) => {
            state.curPlayStatus = data
            //列表循环
            if (data == 1 || data == 0) {
                state.curIndex = state.curMusicList.map(item => item.id).indexOf(state.curMusicId);
            }
            //随机播放
            else if (data == 2) {
                state.curIndex = state.randomlist.map(item => item.id).indexOf(state.curMusicId);
            }
        }
    },


    getters: {
        //获取当前播放歌曲的ID
        cur_playing_id: state => {
            return state.curMusicId;
        },

        //获取当前右键选中歌曲的信息
        cur_context_menu_music: state => {
            return state.showMusicList[state.contextMenuIndex]
        },

        cur_play_status: state => {
            return state.curPlayStatus;
        },

        //播放
        cur_play_url: state => {
            if (state.curPlayStatus == 1 || state.curPlayStatus == 0) {
                return state.curMusicList[state.curIndex].url;
            } else {
                return state.randomlist[state.curIndex].url;
            }
        },

        //获取展示歌单的歌曲数
        show_list_len : state => {
            return state.showMusicList.length;
        },

        //获取创建歌单列表
        get_create_list : state => {
            return state.createMusicList;
        }


    }
})