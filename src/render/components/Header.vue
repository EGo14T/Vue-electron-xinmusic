<template>
  <div class="header row">
    <div class="col-auto ico">
      <svg class="icon svg-icon" aria-hidden="true" style="width:30px;height:30px;">
        <use xlink:href="#icon-tips_music" />
      </svg>
      <span class="ico-title">昕音乐</span>
    </div>

    <div class="col-auto history">
      <svg class="icon svg-icon historyBtn" aria-hidden="true" @click="history(-1)">
        <use xlink:href="#icon-Group-" />
      </svg>
      <svg class="icon svg-icon historyBtn" aria-hidden="true" @click="history(1)">
        <use xlink:href="#icon-Group-2" />
      </svg>
    </div>

    <div class="col-auto search">
      <input type="text" class="searchinput" v-model="keyword" placeholder="搜索音乐" />
      <svg class="icon svg-icon searchbtn" aria-hidden="true" @click="searchMusic()">
        <use xlink:href="#icon-sousuo" />
      </svg>
    </div>

    <div class="col-auto userInfo" v-if="islogin">
      <img
        style="border-radius: 50%;margin-right:10px;cursor:pointer"
        :src="this.$store.state.user.avatar"
        width="24"
        height="24"
        draggable="false"
        @click="toUserInfo"
      />
      <span  class="userName" @click.prevent= "showUserPop = !showUserPop">{{this.$store.state.user.name}}</span>
      <div class="userPop" v-if="showUserPop">
        <div class="u_Pop_item" @click="toEditUserInfo">
          编辑个人信息
        </div>
        <div class="u_Pop_item" @click="logOut">
          注销
        </div>
      </div>
    </div>

    <div class="col-auto userInfo" v-if="!islogin">
      <div @click="openLogin()">未登录</div>
    </div>

    <div class="col-auto tools row">
      <div class="col-auto" title="最小化窗口" @click="minwindow()">
        <svg class="icon svg-icon toolBtn" aria-hidden="true">
          <use xlink:href="#icon-minimum" />
        </svg>
      </div>

      <div class="col-auto" title="最小化到任务栏" @click="minToTask()">
        <svg class="icon svg-icon toolBtn" aria-hidden="true">
          <use xlink:href="#icon-zuixiaohua1" />
        </svg>
      </div>

      <div class="col-auto" title="最小化到任务栏" @click="closewindow()">
        <svg class="icon svg-icon toolBtn" aria-hidden="true">
          <use xlink:href="#icon-close" />
        </svg>
      </div>
    </div>
    <login :visible.sync="dialogVisible"></login>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { Minimatch } from "minimatch";

import * as types from "../store/types";

import Login from "./Login";

import { mapGetters } from "vuex";

export default {
  components: {
    login: Login
  },

  mounted() {
    document.addEventListener("click", e => {
      if (
        typeof e.target.className == "string" &&
        e.target.className.indexOf("userName") == -1
      ) {
        this.showUserPop = false;
      }
    });
  },

  computed: {
    ...mapGetters({
      islogin: "get_isLogin",
      userId: "get_user_id"
    })
  },

  data() {
    return {
      dialogVisible: false,

      showUserPop: false,

      keyword: "" //关键字
    };
  },

  created() {
    this.oauthLogin();
  },

  methods: {
    history(val) {
      this.$router.go(val);
    },


    //登出
    logOut() {
      this.$store.commit(types.LOGOUT);
      this.$store.commit(types.LOAD_Menu_ID, 'discover');
      this.$router.push({ name: 'discovery' });
    },


    //验证登录，若没登录则使用refrsh token刷新登录，若第一次登录，则弹窗登录
    oauthLogin() {
      if (localStorage.refreshToken) {
        //console.log(localStorage.refreshToken)
        let json = {
          grant_type: "refresh_token",
          client_id: "client",
          client_secret: "secret",
          refresh_token: localStorage.refreshToken
        };
        this.oauthRequest("/oauth/token", json).then(resp => {
          //console.log(resp.data.user);
          this.$store.commit(types.LOGIN, resp.data);
        });
      } else {
      }
    },

    searchMusic() {
      if (this.keyword.trim().length != 0) {
        this.$router.push({
          name: "searchMusic",
          params: { keyword: this.keyword }
        });
      }
    },

    openLogin() {
      this.dialogVisible = !this.dialogVisible;
    },

    toUserInfo() {
      this.$router.push({ name: "user",params:{userId: this.userId} });
      this.$store.commit(types.LOAD_Menu_ID, "user");
    },

    toEditUserInfo() {
      this.$router.push({ name: 'editUsers' });
      this.$store.commit(types.LOAD_Menu_ID, "editUser");
    },

    closewindow() {
      ipcRenderer.send("close");
    },

    minwindow() {
      ipcRenderer.send("minwindow");
    },

    minToTask() {
      ipcRenderer.send("minToTask");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/header.scss";
</style>