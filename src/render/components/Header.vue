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
      <input type="text" class="searchinput" placeholder="搜索音乐" />
      <svg class="icon svg-icon searchbtn" aria-hidden="true">
        <use xlink:href="#icon-sousuo" />
      </svg>
    </div>

    <div class="col-auto userInfo" v-if="islogin">
      <img
        style="border-radius: 50%;margin-right:10px"
        :src="this.$store.state.user.avatar"
        width="24"
        height="24"
        @click="toComponents('user')"
      />
      <a href class="userName">{{this.$store.state.user.name}}</a>
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

  computed: {
    ...mapGetters({
      islogin: "get_isLogin"
    })
  },

  data() {
    return {
      dialogVisible: false
    };
  },

  created() {
    this.oauthLogin();
  },

  methods: {
    history(val){
      this.$router.go(val);
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

    openLogin() {
      this.dialogVisible = !this.dialogVisible;
    },

    toComponents(pathUrl, params) {
      this.$router.push({ name: pathUrl });
      this.$store.commit(types.LOAD_Menu_ID,"user");
    },

    closewindow() {
      ipcRenderer.send("close");
    },

    minwindow() {
      3;
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