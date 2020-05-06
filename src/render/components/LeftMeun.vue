<template>
  <myScroll>
    <div class="leftmenu">
      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">推荐</div>
          <div :class="['nav-citem' ,menuId=='discover'?'nav-active':'']">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-ic_addmusic" />
            </svg>
            <span class="navtext" @click="toComponents('user','discover')">发现音乐</span>
          </div>

          <div :class="['nav-citem' ,menuId=='friends'?'nav-active':'']">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-pengyou" />
            </svg>
            <span class="navtext" @click="toComponents('comment','friends')">朋友</span>
          </div>
        </li>
      </ul>

      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">我的音乐</div>
          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-xihuan" />
            </svg>
            <span class="navtext">我的收藏</span>
          </div>

          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-bendiyinle" />
            </svg>
            <span class="navtext">本地音乐</span>
          </div>
        </li>
      </ul>

      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitleMusicList" @click="showAllCr = !showAllCr">
            <span class="span-right">创建的歌单</span>
            <el-popover
              placement="right-start"
              width="270"
              :offset="-10"
              trigger="click"
              popper-class="createList"
              @hide="destroyPop"
              v-model="visible "
            >
              <div style="margin-left:10px;font-size:16px">新建歌单</div>
              <input type="text" class="pop_input" placeholder="请输入新歌单标题" v-model="new_title" />
              <div class="overWord" v-show="isOverWord">歌单名不能超过40个字符，20个汉字</div>
              <el-checkbox v-model="ishide">设置为隐私歌单</el-checkbox>
              <div class="sub_block">
                <input
                  class="sub_btn create"
                  type="button"
                  value="创建"
                  @click="createMusicList()"
                  :disabled="isInput"
                />
                <input class="sub_btn cancle" type="button" value="取消" @click />
              </div>
              <svg class="icon svg-icon leftbtn" aria-hidden="true" @click.stop slot="reference">
                <use xlink:href="#icon-jia" />
              </svg>
            </el-popover>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCr ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            :class="['nav-citem' ,menuId==item.musiclistid?'nav-active':'']"
            v-for="item in showCreateList"
            @click.stop="toMusciList(item.musiclistid,'created')"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musiclistName}}</span>
          </div>
        </li>

        <li class="nav-item">
          <div class="navtitleMusicList" @click="showAllCo = !showAllCo">
            <span style="margin-right:98px">收藏的歌单</span>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCo ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            :class="['nav-citem' ,menuId==item.musiclistid?'nav-active':'']"
            v-for="item in showCollectionList"
            @click="toMusciList(item.musiclistid,'collected')"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musiclistName}}</span>
          </div>
        </li>
      </ul>
    </div>
  </myScroll>
</template>

<script>
import * as types from "../store/types";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      CreateMusicListInfo: [],

      CollectionMusicListInfo: [],

      showAllCr: false,
      showAllCo: false,
      skin: "",
      userID: "", //用户ID

      visible: false,
      ishide: false, //是否创建隐私歌单
      new_title: "" //新建歌单名
    };
  },

  created() {
    //获取歌单列表
    this.getMusicList();
  },

  watch: {
    "$store.state.user": function() {
      this.getMusicList();
    }
  },

  computed: {
    ...mapGetters({
      menuId: "cur_menu_id"
    }),


    showCreateList: function() {
      if (this.showAllCr == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.CreateMusicListInfo;
      }
    },

    showCollectionList: function() {
      if (this.showAllCo == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.CollectionMusicListInfo;
      }
    },

    isInput: function() {
      let len = this.getByteLen(this.new_title);
      if (len > 0 && len < 40) {
        return false;
      } else {
        return true;
      }
    },

    isOverWord: {
      get: function() {
        let len = this.getByteLen(this.new_title);
        if (len > 40) {
          return true;
        } else {
          return false;
        }
      },

      set: function() {
        return false;
      }
    }
  },
  methods: {
    //跳转到歌单
    toMusciList(musiclistid, isCreated) {
      this.$router.push({
        name: "musiclstinfo",
        params: { isCreated: isCreated, id: musiclistid }
      });
    },

    //跳转其他模块
    toComponents(pathUrl, params) {
      this.$store.commit(types.LOAD_Menu_ID,params);
      this.$router.push({ name: pathUrl });
    },

    createMusicList() {
      //是否是隐私歌单
      let ishide = this.ishide ? 2 : 1;

      let json = {
        userid: JSON.parse(localStorage.user).id,
        musiclistName: this.new_title,
        status: ishide
      };

      this.postRequest("/my/musiclist", true, json).then(resp => {
        let newList = {
          musiclistid: resp.data.data,
          musiclistName: this.new_title,
          status: ishide
        };
        this.CreateMusicListInfo.splice(1, 0, newList);

        this.visible = false;
      });
    },

    //获取创建歌单列表
    getMusicList() {
      if (localStorage.user) {
        this.$http
          .all([
            this.getRequest(
              "/my/create/musiclist/" + this.$store.state.user.id,
              true
            ),
            this.getRequest(
              "/my/collect/musiclist/" + this.$store.state.user.id,
              true
            )
          ])
          .then(
            this.$http.spread((createResp, collectResp) => {
              this.CreateMusicListInfo = createResp.data.data;
              this.CollectionMusicListInfo = collectResp.data.data;
              this.$store.commit(types.SET_DEFAULT_LIST, {
                create: createResp.data.data,
                collect: collectResp.data.data
              });
            })
          );
      }
    },

    addclass(i) {
      switch (i) {
        case 0:
          return "#icon-xihuan";
        case 1:
          return "#icon-swticonyinle2";
        case 2:
          return "#icon-lock";
      }
    },

    //初始化泡泡框
    destroyPop() {
      this.ishide = false;
      this.new_title = "";
    },

    //获取字符数  汉字算两个
    getByteLen(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 2;
        } else {
          len += 1;
        }
      }
      return len;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/leftbar.scss";
</style>

<style>
.createList {
  background: #2d2f33 !important;
  border: 1px solid #2d2f33 !important;
  color: #dcdde4 !important;
}

.el-popper[x-placement^="right"] .popper__arrow::after {
  border-right-color: #2d2f33 !important;
}

.el-popper[x-placement^="right"] .popper__arrow {
  border-right-color: #2d2f33 !important;
}
</style>


