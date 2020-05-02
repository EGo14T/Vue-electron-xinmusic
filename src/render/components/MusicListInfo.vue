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
            <div class="col-md-auto separator" style=" margin: 0 10px; padding:0;">
              <div>歌曲数</div>
              <div>{{lenOfList}}</div>
            </div>
            <div class="col-md-auto" style=" margin: 0 10px; padding:0;">
              <div>播放数</div>
              <div>999</div>
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

          <el-button class="listFunc" :disabled="isCreated=='created'" @click="collectMusicList()">
            <svg
              class="icon svg-icon"
              style="height:17px;width:17px;"
              aria-hidden="true"
            >
              <use xlink:href="#icon-xinjianwenjian" />
            </svg>
            {{collection}}
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

        <div
          :class="['col-row',comName=='comment'?'tabsBtn':'']"
          @click.prevent="comName='comment'"
        >评论</div>
        <div
          :class="['col-row',comName=='collector'?'tabsBtn':'']"
          @click.prevent="comName='collector'"
        >收藏</div>
      </div>
      <component :is="comName" :musicListid="this.musicListId" :isCreated="this.isCreated"></component>
    </div>
  </div>
</template>

<script>
//import x from ''
import * as types from "../store/types";
import qs from "qs";

import { mapGetters } from "vuex";

import Comments from "./Comments";
import MusicList from "./MusicList";
import Collector from "./Collector";
import Spread from "./Spread/spread";

export default {
  components: {
    comment: Comments,
    musiclist: MusicList,
    collector: Collector,
    spread: Spread
  },
  data() {
    return {
      comName: "musiclist",

      musicListId: "",

      isCreated: "",

      musicListInfo: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    ...mapGetters({
      lenOfList: "show_list_len"
    }),

    collection() {
      if(this.isCreated=='collected'){
        return "已收藏"
      }else {
        return "收藏  "
      }
    }
  },
  created() {
    this.musicListId = this.$route.params.id;
    this.isCreated = this.$route.params.isCreated;
    this.getMusicListInfo();
  },

  watch: {},

  methods: {
    //收藏歌单
    collectMusicList() {
      
    },
    //获取歌单信息
    getMusicListInfo() {
      this.getRequest("/my/musiclistinfo/" + this.musicListId, false).then(
        resp => {
          //console.log(resp.data.data)
          this.musicListInfo = resp.data.data;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/musiclistinfo.scss";
</style>