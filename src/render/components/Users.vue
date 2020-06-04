<template>
  <div class="container" v-if="isFinish">
    <div class="row1">
      <div class="avatar">
        <img :src="avatarURL" width="199px" height="199px" draggable="false" v-if="isSelf" />
        <img :src="userInfo.avatar" width="199px" height="199px" draggable="false" v-if="!isSelf" />
      </div>

      <div class="info">
        <div class="userName">
          <h2>{{userInfo.name}}</h2>
          <div class="editInfo" v-if="isSelf">
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
      <musicListShow :list="createList" isCreated="created"></musicListShow>
    </div>
    <div class="row3">
      <div class="title">我收藏的歌单（{{collectList.length}}）</div>
      <musicListShow :list="collectList" isCreated="collected"></musicListShow>
    </div>
  </div>
</template>

<script>
import * as types from "../store/types";

import { mapGetters } from "vuex";

import MusicListShow from "./MusicListShow";

export default {
  props: ["userId"],

  computed: {
    ...mapGetters({
      avatarURL: "get_avatar_url",
      selfID: "get_user_id"
    }),

    isSelf: function() {
      if (this.userId == this.selfID) {
        return true;
      } else {
        return false;
      }
    }
  },

  components: {
    musicListShow: MusicListShow
  },

  created() {
    this.getUserInfo();

    this.getMusicList();
  },

  data() {
    return {
      isFinish: false,

      userInfo: {}, //用户信息

      createList: [],
      collectList: [],
    };
  },

  methods: {
    getUserInfo() {
      if (localStorage.user) {
        this.getRequest("/users/UserInfo/" + this.userId, true).then(resp => {
          this.userInfo = resp.data.data;
          this.isFinish = true;
        });
      }
    },

    toComponents(pathUrl, params) {
      this.$router.push({ name: pathUrl });
      this.$store.commit(types.LOAD_Menu_ID, "editUser");
    },

    getMusicList() {
      this.$http
        .all([
          this.getRequest("/my/create/musiclist/" + this.userId, false),
          this.getRequest("/my/collect/musiclist/" + this.userId, false)
        ])
        .then(
          this.$http.spread((createResp, collectResp) => {
            this.createList = createResp.data.data;
            this.collectList = collectResp.data.data;
          })
        );
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