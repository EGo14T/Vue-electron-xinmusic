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
      <tr class="custom-tr" v-for="(item,index) in musiclist">
        <td class="td-number">{{index | musicIndex}}</td>
        <td class="td-operate">
          <svg :class="['icon','svg-icon',item.collection==1?'icon-1':'icon-2']" aria-hidden="true" style="width:16px;height:16px">
            <use :xlink:href="item.collection==1?'#icon-xihuan1-copy':'#icon-xihuan'" />
          </svg>
          <svg class="icon svg-icon icon-2" aria-hidden="true" style="width:16px;height:16px">
            <use xlink:href="#icon-xiazai" />
          </svg>
        </td>
        <td>{{item.name}}</td>
        <td class="td-singer">{{item.singer}}</td>
        <td class="td-album">{{item.album}}</td>
        <td class="td-length">{{item.length}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
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
          "/my/musiclist/" + this.musicListid + "/" + userID,
          true
        ).then(resp => {
          this.musiclist = resp.data.data;
        });
      } else {
        this.getRequest("/my/musiclist/" + this.musicListid).then(resp => {
          this.musiclist = resp.data.data;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>