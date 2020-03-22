<!-- 组件说明 -->
<template>
  <div class="container">
    <div class="musicListInfo row">
      <div class="musicListImg col-auto">
        <img :src="musicListInfo.musiclistImg" width="199px" height="199px" draggable="false" />
      </div>
      <div class="listInfo col-auto">
        <div class="listInfoUp row">
          <div class="createInfo col-auto">
            <span class="listTitle">歌单</span>
            <span class="musiclist-title">{{musicListInfo.musiclistName}}{{musicListId}}</span>
          </div>
          <div class="musicNum col-auto row" align="right">
            <div class="col-md-auto separator" style=" margin: 0 12px 0 12px;">
              <div>歌曲数</div>
              <div>123</div>
            </div>
            <div class="col-md-auto" style=" margin: 0 12px 0 12px;">
              <div>播放数</div>
              <div>456</div>
            </div>
          </div>
        </div>
        <div class="listInfoCenter">
          <img
            class="align-self-start mr-3"
            style="border-radius: 50%;"
            :src="musicListInfo.musiclistImg"
            width="32"
            height="32"
          />
          <a href class="createUser">{{musicListInfo.username}}</a>
          <span class="createTime">{{musicListInfo.createTime}}创建</span>
        </div>
        <div class="listInfoDown">
          <el-button class="bofang">
            <svg
              class="icon svg-icon"
              style="height:17px;width:17px;color:white"
              aria-hidden="true"
            >
              <use xlink:href="#icon-bofangbtn-copy" />
            </svg>
            播放全部
          </el-button>
          <el-button class="addToList">
            <svg
              class="icon svg-icon"
              style="height:17px;width:17px;color:white"
              aria-hidden="true"
            >
              <use xlink:href="#icon-plus" />
            </svg>
          </el-button>

          <el-button class="listFunc">
            <svg
              class="icon svg-icon"
              style="height:17px;width:17px;color:white"
              aria-hidden="true"
            >
              <use xlink:href="#icon-xinjianwenjian" />
            </svg>
            收藏 (999)
          </el-button>

          <el-button class="listFunc">
            <svg
              class="icon svg-icon"
              style="height:17px;width:17px;color:white"
              aria-hidden="true"
            >
              <use xlink:href="#icon-fenxiang" />
            </svg>
            分享 (2333)
          </el-button>

          <el-button class="listFunc">
            <svg
              class="icon svg-icon"
              style="height:17px;width:17px;color:white"
              aria-hidden="true"
            >
              <use xlink:href="#icon-xiazai" />
            </svg>
            下载全部
          </el-button>

          <div class="tag">
            <span>标签：</span>
            <a class="tagLink" href>日系</a>/
            <a class="tagLink" href>开口跪</a>/
            <a class="tagLink" href>电子</a>
          </div>

          <div class="description">
            <span>简介：昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了昕哥牛逼就完事儿了</span>
          </div>
        </div>
      </div>
    </div>

    <div class="musiclist">
      <div class="musiclistHeader row">
        <div class="col-row" style="margin: 0 25px 5px 100px" @click.prevent="comName='login'">歌曲列表</div>
        <div class="col-row tabsBtn" @click.prevent="comName='home'">评论</div>
        <div class="col-row tabsBtn" @click.prevent="post()">收藏者</div>
      </div>
      <component :is="comName" :musicList="this.musicListId"></component>
    </div>
  </div>

  <!-- <img
            class="align-self-start mr-3"
            style="border-radius: 50%;"
            :src="musicListInfo.musiclistImg"
            width="32"
            height="32"
           />
            <span>123</span>
  <span>456</span>-->
</template>

<script>
//import x from ''
import * as types from "../store/types";
import qs from "qs";

import Home from './Home'
import Login from './Login'

export default {
  components: {
    'home':Home,
    'login':Login
  },
  data() {
    return {

      comName:'login',

      musicListId: "",

      musicListInfo: {
        userid: "1",
        musiclistid: "3",
        musiclistName: "我喜欢的音乐",
        createTime: "2020-02-02",
        tags: "日系",
        description: "日系",
        musiclistImg: "https://cdn.ego1st.cn/avatar/昕.jpg",
        status: 1,
        iscollecting: 1,
        username: "egoist",
        avatar: "https://cdn.ego1st.cn/avatar/昕.jpg"
      }
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
        console.log(resp.data);
        this.$store.commit(types.LOGIN, resp.data);
      });
    },

    test(pathUrl, params) {
      this.$router.push({ name: pathUrl, params: { id: params } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>