<template>
  <div class="musicBar">
    <div class="musicImg" @click="toComments()">
      <img :src="imgSrc" width="45px" height="45px" draggable="false" />
    </div>
    <div class="musicInfo">
      <div class="musicTitle">{{musicInfo.name}}</div>
      <div class="album">{{musicInfo.singer}}</div>
    </div>
    <div class="musicFunc">
      <svg
        class="icon svg-icon icon-1"
        aria-hidden="true"
        style="width:15px;height:15px"
        v-show="musicInfo.collection == 1 && isLogin"
        @click="dislike"
      >
        <use xlink:href="#icon-xihuan1-copy" />
      </svg>
      <svg
        class="icon svg-icon icon-2"
        aria-hidden="true"
        style="width:15px;height:15px"
        v-show="!musicInfo.collection == 1 && isLogin"
        @click="like"
      >
        <use xlink:href="#icon-xihuan" />
      </svg>
      <svg class="icon svg-icon icon-3" style="width:15px;height:15px;" aria-hidden="true">
        <use xlink:href="#icon-fenxiang" />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as types from "../store/types";

import {likeMusic, dislikeMusic} from '../api/api'

export default {
  computed: {
    ...mapGetters({
      isLogin: "get_isLogin",
      musicId: "cur_playing_id",
      musicInfo: "cur_playing_info"
    }),

    imgSrc: function() {
      return (
        "http://cdn.ego1st.cn/xinmusic/musicCover/" + this.musicId + ".jpg"
      );
    }
  },

  data() {
    return {};
  },

  methods: {
    toComments() {
      this.$router.push({
        name: "musicComments",
        params: { id: this.musicId }
      });
    },

    //收藏音乐
    like() {
      var data = [this.musicId]
      likeMusic(data).then(resp => {
        this.$store.commit(types.LIKE_MUSIC, 1);
      });
    },

    //取消收藏音乐
    dislike() {
      var data = [this.musicId];
      dislikeMusic(data).then(resp => {
        this.$store.commit(types.LIKE_MUSIC, 0);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.musicBar {
  background: #191b1f;
  padding: 5px;
  border-top: 1px solid #23262c;
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;

  .musicInfo {
    font-size: 12px;
    margin: 4px 0;
    width: 100px;

    .musicTitle {
      color: #dcdde4;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .album {
      margin: 2px 0;
      color: #666666;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .musicFunc {
    text-align: right;
    .icon-1 {
      position: relative;
      top: -3px;
      color: #b82525;
      &:hover {
        color: #cd2929;
        cursor: pointer;
      }
    }

    .icon-2 {
      position: relative;
      top: -3px;
      color: rgb(140, 145, 153);
      &:hover {
        color: #dcdde4;
        cursor: pointer;
      }
    }

    .icon-3 {
      position: relative;
      top: -4px;
      color: #828385;
      &:hover {
        color: #dcdde4;
        cursor: pointer;
      }
    }
  }
}
</style>