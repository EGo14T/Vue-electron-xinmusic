<!-- 组件说明 -->
<template>
  <div>
    <div class="up">
      <div class="music-list-img">
        <img :src="imgSrc" width="199px" height="199px" draggable="false" />
      </div>
      <div class="music-list-info">
        <div class="line1">
          <span class="font-line1">歌单</span>
          <span class="musiclist-title">{{musicTitle}}</span>
          <p class="musiclist-num" @click="post()">{{user}}</p>
        </div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>

    <div class="down"></div>
  </div>
</template>

<script>
//import x from ''
import * as types from "../store/types";
import qs from "qs";

export default {
  components: {},
  data() {
    return {
      imgSrc: "https://ego1st.cn/images/EGo1ST.jpg",
      musicTitle: "我喜欢的音乐"
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    get() {
      this.getRequest("http://127.0.0.1:8033").then(resp => {
        console.log(123);
      });
    },

    post() {
      var qs = require("qs");
      let json = {
        grant_type: "password",
        username: "test",
        password: "test",
        //scope:all
        client_id: "client",
        client_secret: "secret"
      };
      this.postRequest("/oauth/token", json).then(resp => {
        console.log(resp.data.user);
        this.$store.commit(types.LOGIN, resp.data.user);
      });
    }
  }
};
</script>


<style>
.up {
  position: relative;
  top: 3px;

  padding: 30px;
  height: 250px;
}

.music-list-img {
  height: 199px;
  width: 199px;
  float: left;

  position: relative;
}

.music-list-info {
  background: #000;
  height: 200px;
  width: 530px;

  position: relative;
  left: 230px;
}

.musiclist-num {
  color: white;
  width: 200px;
  height: 100px;
  background: red;

  position: relative;
  top: 0;
  left: 0;
}

.line1 {
  position: relative;
  bottom: 5px;
}

.font-line1 {
  font-size: 15px;
  color: #e03f40;
  border: 1px solid #e03f40;
  padding-left: 3px;
  padding-right: 3px;

  position: relative;
  right: 200px;
}

.musiclist-title {
  color: rgba(255, 255, 255, 0.85);
  font-size: 25px;
  position: relative;
  right: 185px;
  top: 3px;
}
</style>