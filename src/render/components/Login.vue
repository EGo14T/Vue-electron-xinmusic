<template>
  <transition name="L_animate">
    <div class="Panel" v-show="visible">
      <div class="close" @click="close()">
        <svg class="icon svg-icon closebtn" aria-hidden="true">
          <use xlink:href="#icon-close" />
        </svg>
      </div>
      <transition name="p_animate">
        <div class="login" v-if="changePanel">
          <div class="logoArea">
            <svg class="icon svg-icon logo" aria-hidden="true">
              <use xlink:href="#icon-tips_music" />
            </svg>
          </div>
          <div class="editArea">
            <input class="tbx" type="text" placeholder="账号" v-model="login.account" />
            <input class="tbx" type="password" placeholder="密码" v-model="login.password" />
            <input class="sub" type="button" value="登录" @click="userLogin()" />
          </div>
        </div>
      </transition>
      <transition name="p_animate">
        <div class="register" v-if="!changePanel">
          <input class="tbx" type="text" placeholder="昵称" v-model="register.nickName" />
          <input class="tbx" type="text" placeholder="账号" v-model="register.account" />
          <input class="tbx" type="password" placeholder="密码" v-model="register.password" />
          <input class="tbx" type="password" placeholder="再次输入密码" v-model="register.repassword" />
          <input class="sub" type="button" value="注册" @click="userRegister()" />
        </div>
      </transition>

      <div class="l_footer">
        <span v-if="changePanel">
          没有账号？
          <span class="r_word" @click="change()">立即注册</span>
        </span>
        <span v-else>
          已有账号？
          <span class="r_word" @click="change()">立即登录</span>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import * as types from "../store/types";

export default {
  props: ["visible"],
  data() {
    return {
      login: {
        account: "",
        password: ""
      },

      register: {
        nickName: "",
        account: "",
        password: "",
        repassword: ""
      },

      changePanel: true
    };
  },

  methods: {
    //关闭窗口
    close() {
      this.$emit("update:visible", false);
      this.login = {};
      this.register = {};
    },

    change() {
      this.changePanel = !this.changePanel;
      this.login = {};
      this.register = {};
    },

    userLogin() {
      let json = {
        grant_type: "password",
        username: this.login.account,
        password: this.login.password,
        //scope:all
        client_id: "client",
        client_secret: "secret"
      };
      this.oauthRequest("/oauth/token", json).then(resp => {
        if (resp) {
          this.$store.commit(types.LOGIN, resp.data);
          this.close();
        }
      });
    },

    userRegister() {
      if(this.register.password == this.register.repassword){
        let json = {
        nickName: this.register.nickName,
        username: this.register.account,
        password: this.register.password
      };

      this.postRequest("/users/register",false,json).then(resp => {
        if(resp.status == 200){
          this.$message.success("注册成功，现在登录吧");
          this.change();
        }
      })
      }else {
        this.$message.error("两次密码输入不一致，请重新输入！");
        this.register.password = "";
        this.register.repassword = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";
</style>