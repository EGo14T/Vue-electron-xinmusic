<template>
  <div class="container">
    <div class="row-1">
      <el-carousel :interval="4000" type="card" height="240px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">广告位</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="row-2">
      <div class="title">推荐歌单</div>
    </div>
    <div class="row-3">
      <musicListShow :list="this.list" isCreated="discoved"></musicListShow>
    </div>
  </div>
</template>

<script>
import MusicListShow from "./MusicListShow";

export default {
  components: {
    musicListShow: MusicListShow
  },

  created() {
    this.getDiscoverLists();
  },

  data() {
    return {
      list: []
    };
  },

  methods: {
    getDiscoverLists() {
      this.getRequest("/my/discover/musiclist", false).then(resp => {
        this.list = resp.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

::v-deep .el-carousel__arrow {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #7e7e7e;
  &:hover {
    color: white;
  }
}

.container {
  margin: 0;
  padding: 10px 0;
  .title {
    color: #dcdde4;
  }

  .row-1{
    margin: 10px 20px;
  }
  
  .row-2 {
    margin: 10px 20px;
    border-bottom: 1px solid #23262c;
    .title {
      margin-bottom: 5px;
    }
  }
}
</style>