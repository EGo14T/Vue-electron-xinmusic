<template>
  <div class="container">
    <div class="row1">
      <span>搜索</span>
      <span style="color:#2e6bb0">"{{keyword}}"</span>
      <span v-show="musicNum>0">，找到{{musicNum}}首单曲</span>
    </div>
    <div class="row2">
      <musiclist musicListid="1" isCreated="search" :keyword="keyword" @getNum="getMusicNum"></musiclist>
    </div>
    <div class="row3" v-show="musicNum == 0">
      <span>很抱歉,未能找到与</span>
      <span style="color:#2e6bb0">"{{keyword}}"</span>
      <span>相关的任何歌曲</span>
    </div>
  </div>
</template>

<script>
import MusicList from "./MusicList";

export default {
  components: {
    musiclist: MusicList
  },

  created() {
    this.keyword = this.$route.params.keyword;
  },

  data() {
    return {
      keyword: "",

      musicNum: 0
    };
  },

  methods: {
    getMusicNum(val) {
      this.musicNum = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
  margin: 0;

  .row1 {
    height: 70px;
    padding-left: 20px;
    line-height: 70px;
    color: #dcdde4;
    font-size: 13px;
    border-bottom: 1px solid #23262c;
  }

  .row3 {
    height: 240px;
    line-height: 240px;
    color: #dcdde4;
    font-size: 13px;
    text-align: center;
  }
}
</style>