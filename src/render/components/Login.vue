<template>
  <transition name="L_animate">
    <div class="loginPanel" v-show="visible">
      <div class="close" @click="close()">
        <svg class="icon svg-icon closebtn" aria-hidden="true">
          <use xlink:href="#icon-close" />
        </svg>
      </div>
      <svg class="icon svg-icon logo" aria-hidden="true">
        <use xlink:href="#icon-tips_music" />
      </svg>
      <form>
        <input class="tbx" type="text" placeholder="账号" v-model="account" />
        <input class="tbx" type="password" placeholder="密码" v-model="password" />
        <input class="sub" type="button" value="登录" @click="login()" />
      </form>
      <span>
        没有账号？
        <span class="register">立即注册</span>
      </span>
    </div>
  </transition>
</template>

<script>
import * as types from "../store/types";

export default {
  props: ["visible"],
  data() {
    return {
      account: "",
      password: ""
    };
  },

  methods: {
    //关闭窗口
    close() {
      this.$emit("update:visible", false);
      this.account = "";
      this.password = "";
    },

    login() {
      let json = {
        grant_type: "password",
        username: this.account,
        password: this.password,
        //scope:all
        client_id: "client",
        client_secret: "secret"
      };
      this.oauthRequest("/oauth/token", json).then(resp => {
        //console.log(resp.data);
        this.$store.commit(types.LOGIN, resp.data);
        this.close();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>