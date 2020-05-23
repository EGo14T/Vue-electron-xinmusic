<template>
  <div class="musicComments">
    <div class="info">
      <img :src="imgSrc" width="70px" height="70px" draggable="false" />
      <div class="musicInfo">
        <div class="title">{{musicInfo.name}}</div>
        <div class="singer">
            <span style="color:#828385">专辑：</span>
            <span style="color:#5f5f63;margin-right:30px;">{{musicInfo.album}}</span>
            <span style="color:#828385">歌手：</span>
            <span style="color:#5f5f63">{{musicInfo.singer}}</span>
        </div>
      </div>
    </div>
    <comments :itemId="musicId" title="评论"></comments>
  </div>
</template>

<script>
import Comments from "./Comments";

export default {
  components: {
    comments: Comments
  },

  created() {
    this.musicId = this.$route.params.id;
    this.getMusicInfo();
  },

  computed: {
    imgSrc: function() {
      return (
        "http://cdn.ego1st.cn/xinmusic/musicCover/" + this.musicId + ".jpg"
      );
    }
  },

  data() {
    return {
      musicId: "",
      musicInfo: {}
    };
  },

  methods: {
    getMusicInfo() {
      this.getRequest("/my/song/" + this.musicId).then(resp => {
        this.musicInfo = resp.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.musicComments {
  .info {
    padding: 15px 30px 0 30px;

    display: grid;
    grid-template-columns: 1fr 8fr;

    .musicInfo {
      .title {
        color: #dcdde4;
        font-size: 24px;
      }

      .singer {
          font-size: 12px;
          margin-top: 6px;
      }
    }
  }
}
</style>
