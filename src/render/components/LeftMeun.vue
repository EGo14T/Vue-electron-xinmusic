<template>
  <div class="left">
    <div class="leftmenu">
      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">推荐</div>
          <div :class="['nav-citem' ,menuId=='discover'?'nav-active':'']">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-ic_addmusic" />
            </svg>
            <span class="navtext" @click="toComponents('discovery','discover')">发现音乐</span>
          </div>

          <div :class="['nav-citem' ,menuId=='friends'?'nav-active':'']">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-pengyou" />
            </svg>
            <span class="navtext" @click="toComponents('friends','friends')">朋友</span>
          </div>
        </li>
      </ul>

      <!-- <ul class="nav flex-column">
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
      </ul>-->

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
                <input class="sub_btn cancle" type="button" value="取消" @click="visible=false" />
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
            :class="['nav-citem' ,menuId==item.musiclistid?'nav-active':(contextMenuId==item.musiclistid?'nav-active':'')]"
            v-for="(item,index) in showCreateList"
            :key="item.musiclistid"
            v-contextmenu:lcontextmenu
            :contextId="item.musiclistid"
            :contextIndex="index"
            :listID="item.musiclistid"
            :listName="item.musiclistName"
            contextType="created"
            :contextStatus="item.status"
            @click.stop="toMusciList(item.musiclistid,'created')"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musiclistName}}</span>
          </div>
        </li>
        <div v-contextmenu:lcontextmenu></div>
        <li class="nav-item" style="margin-top:5px">
          <div class="navtitleMusicList" @click="showAllCo = !showAllCo">
            <span style="margin-right:98px">收藏的歌单</span>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCo ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            :class="['nav-citem' ,menuId==item.musiclistid?'nav-active':(contextMenuId==item.musiclistid?'nav-active':'')]"
            v-for="(item,index) in showCollectionList"
            v-contextmenu:lcontextmenu
            :contextId="item.musiclistid"
            :contextIndex="index"
            :listID="item.musiclistid"
            :listName="item.musiclistName"
            contextType="collected"
            :contextStatus="item.status"
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

    <v-contextmenu ref="lcontextmenu" @contextmenu="menu" @hide="anActiveContext">
      <v-contextmenu-item @click="shareList()">
        <svg class="icon svg-icon contextBtn" aria-hidden="true">
          <use xlink:href="#icon-fenxiang" />
        </svg>分享(Share)
      </v-contextmenu-item>
      <v-contextmenu-item @click="toEditList()" v-show="contextType =='created'">
        <svg class="icon svg-icon contextBtn" aria-hidden="true">
          <use xlink:href="#icon-pan_icon-copy" />
        </svg>编辑歌单(Edit)
      </v-contextmenu-item>
      <v-contextmenu-item @click="delDialog = true" v-show="contextStatus!=0">
        <svg class="icon svg-icon contextBtn" aria-hidden="true">
          <use xlink:href="#icon-lajitong" />
        </svg>删除歌单(Delete)
      </v-contextmenu-item>
    </v-contextmenu>

    <el-dialog
      title="确认删除该歌单？"
      :visible.sync="delDialog"
      width="250px"
      top="30%"
      :show-close="false"
      center
      custom-class="c_delDialog"
    >
      <input type="button" class="btn save" @click="deleteList()" value="确定" />
      <input type="button" class="btn cancle" @click="delDialog = false" value="取消" />
    </el-dialog>
  </div>
</template>

<script>
import * as types from "../store/types";
import * as API from "../api/api"

import { mapGetters } from "vuex";

import { clipboard } from "electron";

export default {
  data() {
    return {
      showAllCr: false,
      showAllCo: false,
      skin: "",
      userID: "", //用户ID

      visible: false,

      ishide: false, //是否创建隐私歌单
      new_title: "", //新建歌单名

      contextMenuId: "", //右键歌单ID
      contextStatus: "", //右键歌单的状态
      contextType: "", //右键歌单的类型 收藏or创建
      contextIndex: 0,
      listID: "",
      listName: "",

      delDialog: false
    };
  },

  created() {},

  watch: {
    "$store.state.user": function() {
      this.getMusicList();

      if (this.$store.state.user == "") {
        this.showAllCr = false;
        this.showAllCo = false;
      } else {
        this.showAllCr = true;
        this.showAllCo = true;
      }
    },

    "$store.state.isEditList": function() {
      this.getMusicList();
    }
  },

  computed: {
    ...mapGetters({
      menuId: "cur_menu_id",
      createList: "get_create_list",
      collectList: "get_collect_list"
    }),

    showCreateList: function() {
      if (this.showAllCr == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.createList;
      }
    },

    showCollectionList: function() {
      if (this.showAllCo == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.collectList;
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
    menu(vnode) {
      this.contextMenuId = vnode.data.attrs.contextId;
      this.contextStatus = vnode.data.attrs.contextStatus;
      this.contextType = vnode.data.attrs.contextType;
      this.contextIndex = vnode.data.attrs.contextIndex;
      this.listID = vnode.data.attrs.listID;
      this.listName = vnode.data.attrs.listName;
    },

    contextPlay() {},

    anActiveContext() {
      this.contextMenuId = "unActive";
    },

    //右键分享歌单
    shareList() {
      clipboard.writeText(this.listName);
      this.$message.success({ message: "歌单名已复制到剪贴板!", duration: 1000 });
    },

    //删除歌单
    deleteList() {
      this.delRequest(
        API.MUSICLIST_OPERATOR + "/" + JSON.parse(localStorage.user).id + "/" + this.listID,
        true
      ).then(resp => {
        this.$store.commit(types.DEL_MUSICLIST, {
          index: this.contextIndex,
          type: this.contextType
        });
        this.delDialog = false;

        if (this.contextType == "created") {
          this.toMusciList(
            this.createList[
              this.contextIndex - 1 < 0 ? 0 : this.contextIndex - 1
            ].musiclistid,
            this.contextType
          );
        } else {
          this.toMusciList(
            this.collectList[
              this.contextIndex - 1 < 0 ? 0 : this.contextIndex - 1
            ].musiclistid,
            this.contextType
          );
        }
      });
    },

    //跳转到歌单
    toMusciList(musiclistid, isCreated) {
      this.$refs.lcontextmenu.hide();
      this.$store.commit(types.LOAD_Menu_ID, musiclistid);
      this.contextMenuId = "unActive";
      this.$router.push({
        name: "musiclstinfo",
        params: { isCreated: isCreated, id: musiclistid }
      });
    },

    //跳转到编辑歌单
    toEditList() {
      var musiclistid = this.contextMenuId;
      this.$store.commit(types.LOAD_Menu_ID, musiclistid);
      this.contextMenuId = "unActive";
      this.$router.push({
        name: "editListInfo",
        params: { isCreated: this.contextType, id: musiclistid }
      });
    },

    //跳转其他模块
    toComponents(pathUrl, params) {
      this.$store.commit(types.LOAD_Menu_ID, params);
      this.$router.push({ name: pathUrl });
    },

    //创建歌单
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
        this.$store.commit(types.CREATE_MUSICLIST, newList);
        this.visible = false;
        this.toMusciList(resp.data.data, "created");
      });
    },

    //获取创建歌单列表
    getMusicList() {
      if (localStorage.user) {
        this.$http
          .all([
            this.getRequest(
              API.MUSICLIST_OPERATOR + "/create" + this.$store.state.user.id,
              true
            ),
            this.getRequest(
              API.MUSICLIST_OPERATOR + "/collect" + this.$store.state.user.id,
              true
            )
          ])
          .then(
            this.$http.spread((createResp, collectResp) => {
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

<style lang="scss">
@import "../assets/css/contextMenu.scss";
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


