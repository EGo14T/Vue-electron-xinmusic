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
      <tr class="custom-tr" v-for="(item,index) in musiclist" @dblclick="playMusic(item.id)">
        <td class="td-number">{{index | musicIndex}}</td>
        <td class="td-operate">
          <svg class="icon svg-icon icon-1" aria-hidden="true" style="width:16px;height:16px" @click="dislike(index)" v-show="item.collection==1">
            <use xlink:href="#icon-xihuan1-copy" />
          </svg>

          <svg class="icon svg-icon icon-2" aria-hidden="true" style="width:16px;height:16px" @click="like(index)" v-show="!item.collection==1">
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

  data() {
    return {
      musiclist: [] //歌曲列表
    };
  },

  filters: {
    musicIndex:function(value){
      if(value<10){
        return '0'+(value+1).toString();
      }else{
        return (value+1).toString();
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
          this.$store.commit(types.LOADLIST, resp.data.data);
        });
      } else {
        this.getRequest("/my/musiclist/" + this.musicListid).then(resp => {
          this.musiclist = resp.data.data;
        });
      }
    },

    //双击播放音乐
    playMusic(id){
      console.log("正在播放"+id)
    },

    //收藏音乐
    like(index){
      console.log("喜欢")
      this.musiclist[index].collection = 1;
    },

    //取消收藏音乐
    dislike(index){
      console.log("不喜欢"+index)
      this.musiclist[index].collection = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>