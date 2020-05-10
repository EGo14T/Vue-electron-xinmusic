<template>
  <div class="container" v-if="isFinish">
    <div class="row1">
      <div class="avatar">
        <img :src="imgsrc" width="199px" height="199px" draggable="false" />
      </div>

      <div class="info">
        <div class="userName">
          <h2>{{userInfo.name}}</h2>
          <div class="editInfo">
            <button class="editInfoBtn" @click="toComponents('editUsers')">编辑个人信息</button>
          </div>
        </div>
        <div class="userInfo">
          <div class="lable">
            <div>生日:</div>
            <div>所在地区:</div>
            <div>个人介绍:</div>
          </div>
          <div class="content">
            <div>{{userInfo.birth}}</div>
            <div>{{userInfo.area}}</div>
            <div>{{userInfo.introduce}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row2">
      <div class="title">我创建的歌单（{{createList.length}}）</div>
      <div class="musiclist">
        <div class="list" v-for="item in createList">
          <div style="cursor: pointer;">
            <img :src="item.musiclistImg" width="100%" draggable="false" />
            <span style="font-size:12px">{{item.musiclistName}}</span>
          </div>
          <span style="font-size:13px;color:#5f5f63">{{Math.floor(Math.random()*100)}}首</span>
        </div>
      </div>
    </div>
    <div class="row3">
      <div class="title">我收藏的歌单（{{collectList.length}}）</div>
      <div class="musiclist">
        <div class="list" v-for="item in collectList">
          <div style="cursor: pointer;">
            <img :src="item.musiclistImg" width="100%" draggable="false" />
            <span style="font-size:12px">{{item.musiclistName}}</span>
          </div>
          <span style="font-size:13px;color:#5f5f63">{{Math.floor(Math.random()*100)}}首</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../store/types";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      createList: "get_create_list",
      collectList: "get_collect_list"
    })
  },

  created() {
    this.getUserInfo();
  },

  data() {
    return {
      isFinish: false,

      imgsrc: "https://cdn.ego1st.cn/xinmusic/useravatar/1.jpg",

      userInfo: {} //用户信息
    };
  },

  methods: {
    getUserInfo() {
      if(localStorage.user){
        let userId = JSON.parse(localStorage.user).id;
        this.getRequest("/users/getUserInfo/" + userId, true).then(resp => {
          this.userInfo = resp.data.data;
          this.isFinish = true;
        });
      }
    },
    toComponents(pathUrl, params) {
      this.$router.push({ name: pathUrl });
      this.$store.commit(types.LOAD_Menu_ID, "editUser");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  color: #dcdde4;
  .row1 {
    padding: 20px 30px 0 30px;
    height: 250px;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 25px;

    .avatar {
    }

    .info {
      .userName {
        border-bottom: 1px solid #23262c;
        display: grid;

        grid-template-columns: 1fr 1fr;
        .editInfo {
          justify-self: end;
          align-self: end;

          margin-bottom: 8px;

          .editInfoBtn {
            font-size: 11px;
            font-weight: 400;
            width: 99px;
            height: 29px;
            border-radius: 5px;
            letter-spacing: 1px;
            border: 0;
            color: #dcdde4;
            background: #25272b;
            cursor: pointer;

            &:hover {
              color: #e2e2e2;
              background: #2c2e32;
            }
          }
        }
      }
      .userInfo {
        display: grid;
        grid-template-columns: 2fr 12fr;
        gap: 10px;
        margin-top: 40px;

        font-weight: 200;
        .lable {
          font-size: 14px;
        }

        .content {
          font-size: 14px;
        }
      }
    }
  }

  .row2,
  .row3 {
    .title {
      font-weight: 200;
      font-size: 14px;
      padding: 5px 10px 5px 30px;

      background: #1c1e23;
    }

    .musiclist {
      width: 100%;
      padding: 10px 0;
      display: grid;
      grid-template-columns: 2fr 2fr 2fr 2fr 2fr;

      gap: 10px 20px;
      justify-items: center;

      .list {
        width: 120px;
        height: 190px;
      }
    }
  }
}
</style>