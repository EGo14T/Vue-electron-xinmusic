/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: '',
        accessToken: null,
        refreshToken: null,
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            
            localStorage.user = JSON.stringify(data.user);

            localStorage.accessToken = data.access_token;
            localStorage.refreshToken = data.refresh_token;
            
            state.user = data.user;
            state.accessToken = data.access_token;
            state.refreshToken = data.refresh_token;
            
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})