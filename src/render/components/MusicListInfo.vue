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
            style="border-radius: 50%;cursor:pointer"
            :src="musicListInfo.avatar"
            width="32"
            height="32"
            draggable="false"
            @click="toUserInfo"
          />
          <span class="createUser" @click="toUserInfo">{{musicListInfo.username}}</span>
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
            <svg class="icon svg-icon" style="height:17px;width:17px;" aria-hidden="true">
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
            <span v-if="musicListInfo.tags == null" style="color:#2e6bb0;cursor:pointer;" @click="toEditList()">添加标签</span>
            <span v-else v-for="(item,index) in listTags">
              <span style="color:#2e6bb0;cursor:pointer;">{{item}}</span>
              <span v-if="index !=2">/</span>
            </span>
          </div>

          <div class="description">
            <spread :mes2="musicListInfo.description" v-show="musicListInfo.description!=null"></spread>
            <span v-show="musicListInfo.description == null">
              <span>简介：</span>
              <span style="color:#2e6bb0;cursor:pointer;" @click="toEditList()">添加简介</span>
            </span>
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
      </div>
      <component
        :is="comName"
        :musicListid="this.musicListId"
        :itemId="this.musicListId"
        :isCreated="this.isCreated"
        title="评论"
      ></component>
    </div>

    <el-dialog
      title="确定不再收藏该歌单？"
      :visible.sync="delDialog"
      width="250px"
      top="30%"
      :show-close="false"
      center
      custom-class="c_delDialog"
    >
      <input type="button" class="btn save" @click="cancleCollect()" value="确定" />
      <input type="button" class="btn cancle" @click="delDialog = false" value="取消" />
    </el-dialog>
  </div>
</template>

<script>
//import x from ''
import * as types from "../store/types";
import * as API from "../api/api";
import qs from "qs";

import { mapGetters } from "vuex";

import Comments from "./Comments";
import MusicList from "./MusicList";
import Spread from "./Spread/spread";

export default {
  components: {
    comment: Comments,
    musiclist: MusicList,
    spread: Spread
  },
  data() {
    return {
      comName: "musiclist",

      musicListId: "",

      isCreated: "",

      delDialog: false,

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
      if (this.isCreated == "collected") {
        return "已收藏";
      } else {
        return "收藏  ";
      }
    },

    listTags() {
      let tag = this.musicListInfo.tags;
      let tags = tag.split("|");
      return tags;
    }
  },
  created() {
    let musiclistId = this.$route.params.id;
    this.musicListId = musiclistId;
    this.isCreated = this.$route.params.isCreated;
    this.getMusicListInfo();
    this.$store.commit(types.LOAD_Menu_ID, musiclistId);
  },

  watch: {},

  methods: {
    //收藏歌单
    collectMusicList() {
      if (this.isCreated == "collected") {
        //取消收藏对话框
        this.delDialog = true;
      } else {
        //收藏歌单
        this.postRequest(
          API.MUSICLIST_OPERATOR + "/collect" +
            JSON.parse(localStorage.user).id +
            "/" +
            this.musicListId,
          true
        ).then(resp => {
          if (resp.data.data == 1) {
            let newList = {
              musiclistid: this.musicListId,
              musiclistName: this.musicListInfo.musiclistName,
              musiclistImg: this.musicListInfo.musiclistImg,
              status: this.musicListInfo.status,
              sumMusic: this.lenOfList
            };
            this.$store.commit(types.COLLECT_MUSICLIST, newList);
            this.isCreated = "collected";
          }
        });
      }
    },

    cancleCollect() {
      //取消收藏歌单
      this.delRequest(
        API.MUSICLIST_OPERATOR + "/" +
          JSON.parse(localStorage.user).id +
          "/" +
          this.musicListId,
        true
      ).then(resp => {
        this.isCreated = "unCollected";
        this.delDialog = false;
        this.$store.commit(types.DEL_MUSICLIST, {
          index: null,
          type: "collected"
        });
      });
    },

    //编辑歌单
    toEditList() {
      this.$store.commit(types.LOAD_Menu_ID, this.musicListId);
      this.$router.push({
        name: "editListInfo",
        params: { isCreated: 'created', id: this.musicListId }
      });
    },

    //获取歌单信息
    getMusicListInfo() {
      this.getRequest(
        API.MUSICLISTINFO_OPERATOR +
          JSON.parse(localStorage.user).id +
          "/" +
          this.musicListId,
        false
      ).then(resp => {
        //console.log(resp.data.data)
        this.musicListInfo = resp.data.data;

        if (resp.data.data.isCollected == 1) {
          this.isCreated = "collected";
        }
      });
    },

    toUserInfo() {
      this.$router.push({
        name: "user",
        params: { userId: this.musicListInfo.userid }
      });
      this.$store.commit(types.LOAD_Menu_ID, "user");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/musiclistinfo.scss";
</style>