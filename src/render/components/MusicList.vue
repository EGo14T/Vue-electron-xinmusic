<template>
  <div class="container">
    <table class="music-table" width="100%">
      <tr>
        <th class="custom-th"></th>
        <th>操作</th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr class="custom-tr" v-for="(item,index) in musiclist" @dblclick="playMusic(index)">
        <td class="td-number">
          {{ item.id === $store.getters.cur_playing_id ? "none": index | musicIndex}}
          <svg
            class="icon svg-icon icon-2"
            aria-hidden="true"
            style="width:16px;height:16px"
            v-show="item.id === $store.getters.cur_playing_id"
          >
            <use xlink:href="#icon-shengyinwu-copy" />
          </svg>
        </td>
        <td class="td-operate">
          <svg
            class="icon svg-icon icon-1"
            aria-hidden="true"
            style="width:16px;height:16px"
            @click="dislike(index)"
            v-show="item.collection==1"
          >
            <use xlink:href="#icon-xihuan1-copy" />
          </svg>

          <svg
            class="icon svg-icon icon-2"
            aria-hidden="true"
            style="width:16px;height:16px"
            @click="like(index)"
            v-show="!item.collection==1"
          >
            <use xlink:href="#icon-xihuan" />
          </svg>

          <svg class="icon svg-icon icon-2" aria-hidden="true" style="width:16px;height:16px">
            <use xlink:href="#icon-xiazai" />
          </svg>
        </td>
        <td class="td-name">{{item.name}}</td>
        <td class="td-singer">{{item.singer}}</td>
        <td class="td-album">{{item.album}}</td>
        <td class="td-length">{{item.length}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as types from "../store/types";

export default {
  props: ["musicListid"],

  watch: {
    "$store.state.curIndex": function() {
      this.m_cur_play = this.$store.state.curIndex;
      console.log(this.m_cur_play);
    }
  },

  data() {
    return {
      musiclist: [], //歌曲列表

      m_cur_play: -1 //当前下标
    };
  },

  filters: {
    musicIndex: function(value) {
      if (value == "none") {
        return "";
      } else if (value < 9) {
        return "0" + (value + 1).toString();
        //return "<svg class='icon svg-icon icon-2' aria-hidden='true' style='width:16px;height:16px'><use xlink:href='#icon-xiazai'/></svg>"
      } else {
        return (value + 1).toString();
      }
    }
  },

  created() {
    this.getMusicInList();
  },

  methods: {
    //获取歌单中的音乐列表
    getMusicInList() {
      if (localStorage.user) {
        let userID = JSON.parse(localStorage.user).id;
        this.getRequest(
          "/my/musiclist/" + userID + "/" + this.musicListid,
          true
        ).then(resp => {
          this.musiclist = resp.data.data;
          this.$store.commit(types.LOAD_SHOW_LIST, this.musiclist);
        });
      } else {
        this.getRequest("/my/musiclist/" + this.musicListid).then(resp => {
          this.musiclist = resp.data.data;
          this.$store.commit(types.LOAD_SHOW_LIST, this.musiclist);
        });
      }
    },

    //双击播放音乐
    playMusic(index) {
      this.$store.commit(types.LOAD_LIST, index);
    },

    //收藏音乐
    like(index) {
      this.musiclist[index].collection = 1;
      this.postRequest(
        "/my/song/" +
          localStorage.defaultMusicListID +
          "/" +
          this.musiclist[index].id,
        true
      ).then(resp => {
        
      });
    },

    //取消收藏音乐
    dislike(index) {
      this.musiclist[index].collection = 0;
      this.delRequest(
        "/my/song/" +
          localStorage.defaultMusicListID +
          "/" +
          this.musiclist[index].id,
        true
      ).then(resp => {
        this.musiclist.splice(index,1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>