<template>
  <div class="container">
    <div class="row1">
      <span>搜索</span>
      <span style="color:#2e6bb0">"{{keyword}}"</span>
      <span>，找到{{musicNum}}首单曲</span>
    </div>
    <div class="row2">
      <musiclist musicListid="1" isCreated="search" :keyword="keyword"  @getNum="getMusicNum"></musiclist>
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
    font-size: 14px;
    border-bottom: 1px solid #23262c;
  }

  .row2 {
  }
}
</style>