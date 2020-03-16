<!-- 组件说明 -->
<template>
  <div class="container">
    <div class="musicListInfo row">
      <div class="musicListImg col-auto">
        <img :src="musicListInfo.musiclistImg" width="199px" height="199px" draggable="false" />
      </div>

      <div class="listInfo col-auto">
        <div class="listInfoUp row">
          <div class="createInfo col-auto">
            <span class="listTitle">歌单</span>
            <span class="musiclist-title">{{musicListInfo.musiclistName}}</span>
          </div>
          <div class="musicNum col-auto row" align="right">
            <div class="col-md-auto separator" style=" margin: 0 12px 0 12px;">
              <div>歌曲数</div>
              <div>123</div>
            </div>
            <div class="col-md-auto" style=" margin: 0 12px 0 12px;">
              <div>播放数</div>
              <div>456</div>
            </div>
          </div>
        </div>
        <div class="listInfoCenter">
          <img
            class="align-self-start mr-3"
            style="border-radius: 50%;"
            :src="musicListInfo.musiclistImg"
            width="32"
            height="32"
          />
          <a href class="createUser">{{musicListInfo.username}}</a>
          <span class="createTime">{{musicListInfo.createTime}}创建</span>
        </div>
        <div class="listInfoDown">
          <el-button>
            播放全部  
          </el-button>
          <el-button>
            收藏  
          </el-button>
          <el-button>
            分享  
          </el-button>
          <el-button>
            下载全部  
          </el-button>
        </div>
      </div>
    </div>
  </div>

  <!-- <img
            class="align-self-start mr-3"
            style="border-radius: 50%;"
            :src="musicListInfo.musiclistImg"
            width="32"
            height="32"
           />
            <span>123</span>
  <span>456</span>-->
</template>

<script>
//import x from ''
import * as types from "../store/types";
import qs from "qs";

export default {
  components: {},
  data() {
    return {
      musicListId: "",

      musicListInfo: {
        userid: "1",
        musiclistid: "3",
        musiclistName: "我喜欢的音乐",
        createTime: "2020-02-02",
        tags: "日系",
        description: "日系",
        musiclistImg: "https://cdn.ego1st.cn/avatar/昕.jpg",
        status: 1,
        iscollecting: 1,
        username: "egoist",
        avatar: "https://cdn.ego1st.cn/avatar/昕.jpg"
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.musicListId = this.$route.params.id;
  },

  watch: {
    $route() {
      this.musicListId = this.$route.params.id;
    }
  },

  methods: {
    get() {
      this.getRequest("http://127.0.0.1:8033").then(resp => {
        console.log(123);
      });
    },

    post() {
      let json = {
        grant_type: "password",
        username: "test",
        password: "test",
        //scope:all
        client_id: "client",
        client_secret: "secret"
      };
      this.oauthRequest("/oauth/token", json).then(resp => {
        console.log(resp.data.user);
        this.$store.commit(types.LOGIN, resp.data.user);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>