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

          <div class="row musiclist-num">
            <div class="col-md-auto musiclist-num-font separator separator">
              <div>歌曲数</div>
              <div>123</div>
            </div>

            <div class="col-md-auto musiclist-num-font">
              <div>播放数</div>
              <div>456</div>
            </div>
          </div>
        </div>
        <div class="line2">
          <img
            class="align-self-start mr-3"
            style="border-radius: 50%;"
            :src="imgSrc"
            width="32"
            height="32"
          />
          <span>123</span>
          <span>456</span>
        </div>

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
      musicListId: "",

      imgSrc: "https://ego1st.cn/images/EGo1ST.jpg",



      musicTitle: "我喜欢的音乐"
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.musicListId = this.$route.params.id;
  },

  watch: {
    $route() {
      this.musicListId = this.$route.params.id;
    }
  },

  methods: {
    get() {
      this.getRequest("http://127.0.0.1:8033").then(resp => {
        console.log(123);
      });
    },

    post() {
      let json = {
        grant_type: "password",
        username: "test",
        password: "test",
        //scope:all
        client_id: "client",
        client_secret: "secret"
      };
      this.oauthRequest("/oauth/token", json).then(resp => {
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
  height: 200px;
  width: 530px;
  position: relative;
  left: 230px;
}

.musiclist-num {
  position: relative;
  top: -28px;
  left: 210px;
}

.musiclist-num-font {
  color: #58585c;
  font-size: 13px;
  text-align: right;
  margin: 0 12px 0 12px;
}

.separator:after {
  position: absolute;
  top: 0.1em;
  height: calc(100% - 0.2em);
  left: 50px;
  content: "";
  width: 0;
  border-left: solid#23262c 2px;
}

.line1 {
  position: relative;
  bottom: 5px;
}

.line2 {
  color: #e03f40;
}

.font-line1 {
  font-size: 15px;
  color: #e03f40;
  border: 1px solid #e03f40;
  padding-left: 3px;
  padding-right: 3px;
  position: relative;
  right: 200px;
  top: 2px;
}

.musiclist-title {
  color: rgba(255, 255, 255, 0.85);
  font-size: 22px;
  position: relative;
  right: 195px;
  top: 3px;
}
</style>