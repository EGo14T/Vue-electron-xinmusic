<template>
  <div class="container">
    <table class="music-table" width="100%">
      <tr>
        <th class="custom-th"></th>
        <th class="td-operate">操作</th>
        <th class="td-name">音乐标题</th>
        <th class="td-singer">歌手</th>
        <th>专辑</th>
        <th class="td-length">时长</th>
      </tr>
      <tr
        class="custom-tr"
        v-for="(item,index) in musiclist"
        @dblclick="playMusic(index)"
        v-contextmenu:contextmenu
        :contextindex="index"
        :contextId="item.id"
      >
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

    <v-contextmenu ref="contextmenu" @contextmenu="menu">
      <v-contextmenu-item @click="contextPlay">
        <svg class="icon svg-icon contextBtn" aria-hidden="true">
          <use xlink:href="#icon-bofangbtn-copy" />
        </svg>
        播放
      </v-contextmenu-item>
      <v-contextmenu-item @click>
        <svg class="icon svg-icon contextBtn" aria-hidden="true">
          <use xlink:href="#icon-fenxiang" />
        </svg>
        分享
      </v-contextmenu-item>
      <v-contextmenu-submenu>
        <span slot="title">
          <svg class="icon svg-icon contextBtn" aria-hidden="true">
            <use xlink:href="#icon-xinjianwenjian" />
          </svg>
          收藏到歌单
        </span>
        <v-contextmenu-item
          v-for="item in createList"
          :key="item.id"
          @click="collectMusicToList(item.musiclistid)"
        >{{item.musiclistName | overWordNum}}</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item v-if="isCreated=='created'" @click="delMusicFromList()">
        <svg class="icon svg-icon contextBtn" aria-hidden="true">
          <use xlink:href="#icon-lajitong" />
        </svg>从歌单中删除
      </v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
import * as types from "../store/types";
import { mapGetters } from "vuex";

export default {
  props: ["musicListid", "isCreated"],

  watch: {
    "$store.state.curIndex": function() {
      this.m_cur_play = this.$store.state.curIndex;
      //console.log(this.m_cur_play);
    }
  },

  data() {
    return {
      musiclist: [], //歌曲列表

      m_cur_play: -1, //当前下标

      contextMenuIndex: 0, //右键下标

      contextId: 0 //右键ID
    };
  },

  computed: {
    ...mapGetters({
      musicInfo: "cur_context_menu_music",
      createList: "get_create_list"
    })
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
    },

    overWordNum: function(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    }
  },

  created() {
    this.getMusicInList();
  },

  methods: {
    menu(vnode) {
      let index = vnode.data.attrs.contextindex;
      this.contextId = vnode.data.attrs.contextId;
      this.contextMenuIndex = index;
      this.$store.commit(types.SET_CONTEXT_MENU, index);
    },

    contextPlay() {
      this.playMusic(this.contextMenuIndex);
    },

    //收藏歌曲
    collectMusicToList(listId) {
      //console.log(listId + "============" + this.contextId);
      this.postRequest(
        "/my/song/" + listId + "/" + this.contextId,
        true
      ).then(resp => {});
    },

    //从歌单中删除歌曲
    delMusicFromList() {
      this.delRequest(
        "/my/song/" + this.musicListid + "/" + this.contextId,
        true
      ).then(resp => {
        this.musiclist.splice(this.contextMenuIndex, 1);
      });
    },

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
      ).then(resp => {});
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
        if (this.musicListid == localStorage.defaultMusicListID) {
          this.musiclist.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>

<style lang="scss">
@import "../assets/css/contextMenu.scss";
</style>