<!-- 组件说明 -->
<template>
  <div class="container">
    <div class="musicListInfo row">
      <div class="musicListImg col-auto">
        <img :src="musicListInfo.musiclistImg" width="199px" height="199px" draggable="false" />
      </div>
      <div class="listInfo col-auto">
        <div class="listInfoUp row">
          <span class="listTitle">歌单</span>
          <div class="musiclist-title">{{musicListInfo.musiclistName}}</div>
          <div class="musicNum row" align="right">
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
            :src="musicListInfo.avatar"
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
            <spread :mes2="musicListInfo.description"></spread>
          </div>
        </div>
      </div>
    </div>

    <div class="musiclist">
      <div class="musiclistHeader row">
        <div
          :class="['col-row',comName=='musiclist'?'tabsBtn':'']"
          style="margin: 0 25px 0 70px"
          @click.prevent="comName='musiclist'"
        >歌曲列表</div>

        <div :class="['col-row',comName=='comment'?'tabsBtn':'']" @click.prevent="comName='comment'">评论</div>
        <div :class="['col-row',comName=='collector'?'tabsBtn':'']" @click.prevent="comName='collector'">收藏</div>
      </div>
      <component :is="comName" :musicListid="this.musicListId"></component>
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

import Comments from "./Comments";
import MusicList from "./MusicList";
import Collector from "./Collector";
import Spread from "./Spread/spread"

export default {
  components: {
    comment: Comments,
    musiclist: MusicList,
    collector: Collector,
    spread: Spread
    //musiclist :
  },
  data() {
    return {
      comName: "musiclist",

      musicListId: "",

      musicListInfo: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.musicListId = this.$route.params.id;
    this.getMusicListInfo();
  },

  watch: {},

  methods: {

    get() {
      this.getRequest("/my/musiclist/1", true).then(resp => {
        console.log(resp.data);
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
      this.postRequest(
        "http://rap2.taobao.org:38080/app/mock/248213/postJson",
        json
      ).then(resp => {
        console.log(resp.data);
      });
    },

    oauth() {
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

    //获取歌单信息
    getMusicListInfo() {
      this.getRequest("/my/musiclistinfo/" + this.musicListId,false).then(resp => {
        //console.log(resp.data.data)
        this.musicListInfo = resp.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/musiclistinfo.scss";
</style>