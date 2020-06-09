/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

import { shuffle } from '../utils/shuffle'
import { stat } from 'fs';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        islogin: false,       //是否登录
        user: '',             //用户信息
        accessToken: null,    //令牌
        refreshToken: null,   //刷新令牌

        //--------------------------------------------------------

        defaultMusicListID: "",  //用户默认歌单的ID （“我喜欢的音乐”的ID）

        createMusicList: [],   //用户创建的歌单列表

        showListIndex: 0,

        collectMusicList: [],  //用户收藏歌单列表

        showMusicList: [],     //展示的歌单，没有点击

        menuId: "",            //leftmenu菜单ID

        contextMenuIndex: 0,   //右键菜单

        curMusicList: [],      //当前播放的音乐列表  点击歌单里的歌曲

        randomlist: [],        //随机播放列表

        curIndex: -1,          //当前正在播放

        curMusicId: "",        //当前正在播放的ID

        curPlayStatus: 1,       //当前的播放状态 0单曲循环  1列表循环  2随机播放

        historylist: [],

        //--------------------------------------------------------------------------
        selectImg: "",          //当前选择的图片

        //--------------------------------------------------------------------------
        isEditList: 0
    },


    mutations: {
        //登录
        [types.LOGIN]: (state, data) => {

            localStorage.user = JSON.stringify(data.user);
            localStorage.accessToken = data.access_token;
            localStorage.refreshToken = data.refresh_token;

            state.islogin = true;
            state.user = data.user;
            state.accessToken = data.access_token;
            state.refreshToken = data.refresh_token;
        },
        //注销
        [types.LOGOUT]: (state) => {
            localStorage.clear();

            state.islogin = false;
            state.user = '';
            state.accessToken = null;
            state.refreshToken = null;
            state.defaultMusicListID = "";
            state.createMusicList = [];
            state.collectMusicList = [];
            state.showMusicList = [];
            state.menuId = "";

        },

        //获取用户默认歌单ID （我喜欢的音乐 的 歌单ID）
        [types.SET_DEFAULT_LIST]: (state, data) => {
            state.defaultMusicListID = data.create[0]?.musiclistid;
            state.createMusicList = data.create;
            state.collectMusicList = data.collect;

            //console.log(state.createMusicList)
            localStorage.defaultMusicListID = state.defaultMusicListID;
        },

        [types.RESET_LISTINFO]: (state) => {
            state.isEditList++;
        },

        [types.LOAD_Menu_ID]: (state, data) => {

            for (let i = 0; i < state.collectMusicList.length; i++) {
                if (state.collectMusicList[i]['musiclistid'] == data) {
                    state.showListIndex = i;
                }
            }
            state.menuId = data;
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

        //创建歌单
        [types.CREATE_MUSICLIST]: (state, data) => {
            state.createMusicList.splice(1, 0, data);
        },

        //删除歌单
        [types.DEL_MUSICLIST]: (state, data) => {
            if (data.type == "created") {
                state.createMusicList.splice(data.index, 1);
            } else {
                if (data.index == null) {
                    state.collectMusicList.splice(state.showListIndex, 1);
                } else {
                    state.collectMusicList.splice(data.index, 1);
                }
            }
        },

        //收藏歌单
        [types.COLLECT_MUSICLIST]: (state, data) => {
            state.collectMusicList.unshift(data);
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
        },


        //设置选择的图片
        [types.SET_IMG]: (state, data) => {
            state.selectImg = data;
        },

        [types.SET_AVATAR]: (state, data) => {
            state.user.avatar = data;
        },

        [types.SET_USERINFO]: (state, data) => {
            state.user = data;
            localStorage.user = JSON.stringify(data);
        },


        [types.LIKE_MUSIC]: (state, data) => {
            if (state.curPlayStatus == 1 || state.curPlayStatus == 0) {
                state.curMusicList[state.curIndex].collection = data;
            } else {
                return state.randomlist[state.curIndex].collection = data;
            }
        },
    },


    getters: {
        //是否登录
        get_isLogin: state => {
            return state.islogin;
        },

        //获取右键菜单ID
        cur_menu_id: state => {
            return state.menuId;
        },


        //获取当前播放歌曲的ID
        cur_playing_id: state => {
            return state.curMusicId;
        },

        //获取当前播放歌曲的信息
        cur_playing_info: state => {
            if (state.curPlayStatus == 1 || state.curPlayStatus == 0) {
                return state.curMusicList[state.curIndex];
            } else {
                return state.randomlist[state.curIndex];
            }
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
        show_list_len: state => {
            return state.showMusicList.length;
        },

        //获取创建歌单列表
        get_create_list: state => {
            return state.createMusicList;
        },

        //获取收藏歌单列表
        get_collect_list: state => {
            return state.collectMusicList;
        },

        //获取图片路径
        get_select_img: state => {
            return state.selectImg;
        },

        get_avatar_url: state => {
            return state.user.avatar;
        },

        get_user_id: state => {
            return state.user.id;
        }


    }
})