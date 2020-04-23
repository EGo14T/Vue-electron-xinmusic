<template>
  <myScroll>
    <div class="leftmenu">
      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">推荐</div>
          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-ic_addmusic" />
            </svg>
            <span class="navtext" @click="toComponents('user')">发现音乐</span>
          </div>

          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-pengyou" />
            </svg>
            <span class="navtext" @click="toComponents('comment')">朋友</span>
          </div>
        </li>
      </ul>

      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">我的音乐</div>
          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-xihuan" />
            </svg>
            <span class="navtext">我的收藏</span>
          </div>

          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-bendiyinle" />
            </svg>
            <span class="navtext">本地音乐</span>
          </div>
        </li>
      </ul>

      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitleMusicList" @click="showAllCr = !showAllCr">
            <span class="span-right">创建的歌单</span>
            <svg class="icon svg-icon leftbtn" aria-hidden="true" @click.stop="addmusic()">
              <use xlink:href="#icon-jia" />
            </svg>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCr ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            class="nav-citem"
            v-for="item in showCreateList"
            @click.stop="toMusciList(item.musiclistid)"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musiclistName}}</span>
          </div>
        </li>

        <li class="nav-item">
          <div class="navtitleMusicList" @click="showAllCo = !showAllCo">
            <span style="margin-right:97px">收藏的歌单</span>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCo ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            class="nav-citem"
            v-for="item in showCollectionList"
            @click="toMusciList(item.musiclistid)"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musiclistName}}</span>
          </div>
        </li>
      </ul>
    </div>
  </myScroll>
</template>

<script>

import * as types from "../store/types";

export default {
  data() {
    return {
      CreateMusicListInfo: [],

      CollectionMusicListInfo: [],

      showAllCr: false,
      showAllCo: false,
      skin: "",
      userID: "" //用户ID
    };
  },

  created() {
    //获取歌单列表
    this.getMusicList();
  },

  watch: {
    '$store.state.user' : function(){
        this.getMusicList();
    }
  },

  computed: {
    showCreateList: function() {
      if (this.showAllCr == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.CreateMusicListInfo;
      }
    },

    showCollectionList: function() {
      if (this.showAllCo == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.CollectionMusicListInfo;
      }
    }
  },
  methods: {
    toMusciList(musiclistid) {
      this.toComponents("musiclstinfo", musiclistid);
    },

    //获取创建歌单列表
    getMusicList() {
      if (localStorage.user) {
        this.$http.all([
          this.getRequest("/my/create/musiclist/"+this.$store.state.user.id, true),
          this.getRequest("/my/collect/musiclist/"+this.$store.state.user.id, true)
        ]).then(this.$http.spread((createResp,collectResp) => {
          this.CreateMusicListInfo = createResp.data.data;
          this.CollectionMusicListInfo = collectResp.data.data;
          this.$store.commit(types.SET_DEFAULT_LIST,createResp.data.data)
          }))
      }
    },

    addclass(i) {
      switch (i) {
        case 0:
          return "#icon-xihuan";
        case 1:
          return "#icon-swticonyinle2";
        case 2:
          return "#icon-lock";
      }
    },

    toComponents(pathUrl, params) {
      this.$router.push({ name: pathUrl, params: { id: params } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/leftbar.scss";
</style>
