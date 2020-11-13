<template>
  <div class="container">
    <div class="row1">
      <div class="title">编辑歌单信息</div>
    </div>
    <div class="row2">
      <div class="editArea">
        <div>歌单名：</div>
        <div>
          <input type="text" class="editInput name" v-model="listInfo.musiclistName" />
        </div>
        <div>标签：</div>
        <div>
          <input type="text" class="editInput name" v-model="listInfo.tags" />
        </div>
        <div>简介：</div>
        <div>
          <textarea class="editInput introduce" v-model="listInfo.description"></textarea>
        </div>
        <div></div>
        <div class="submit">
          <input type="button" class="btn save" @click="saveInfo()" value="保存" />
          <input type="button" class="btn cancle" @click="toMusicListInfo()" value="取消" />
        </div>
      </div>
      <div class="cover">
        <img :src="listCover" width="177px" height="177px" draggable="false" />
        <div class="upload">
          <el-upload
            ref="editUpload"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="upload"
            :limit="1"
          >
            <button class="loadAvatar">修改封面</button>
          </el-upload>
        </div>
      </div>
    </div>
    <uploadAvatar
      :visible.sync="dialogVisible"
      title="上传封面"
      :imgSize="imgSize"
      :cdnPath="cdnPath"
      :fileNo="musiclistid+'cover'"
      :uploadURL="uploadURL"
      @saveClose="saveClose"
    ></uploadAvatar>
  </div>
</template>

<script>
import UploadAvatar from "./UploadAvatar";
import * as types from "../store/types";
import { UpyunCloud } from "../plugins/upload";
import upyunConfig from "../utils/userConfig";
import * as API from "../api/api";

export default {
  components: {
    uploadAvatar: UploadAvatar
  },

  created() {
    this.musiclistid = this.$route.params.id;
    this.isCreated = this.$route.params.isCreated;
    this.getMusicListInfo();
  },

  data() {
    return {
      musiclistid: "",
      isCreated: "",

      listCover: "",

      listInfo: {
        musiclistName: "",
        tags: "",
        description: ""
      },

      dialogVisible: false,
      imgSize: 200,
      cdnPath: "https://cdn.ego1st.cn/xinmusic/musiclistIMG/",
      uploadURL: "/xinmusic/musiclistIMG/"
    };
  },

  methods: {
    saveClose(url) {
      var delfile = this.listCover;
      var reg = /.+\/(.+)$/g;
      var delfileName = reg.exec(delfile)[1];
      var service = new UpyunCloud(upyunConfig);
      if (delfileName != "default.jpg") {
        service.deleteFile(this.uploadURL + delfileName);
      }

      this.patchRequest(API.MUSICLIST_OPERATOR + "/" + this.musiclistid, true, {
        musiclistImg: url
      }).then(resp => {
        if (resp) {
          this.$message.success({ message: "修改封面成功!", duration: 1000 });
          this.listCover = url;
        }
      });
    },

    //获取歌单信息
    getMusicListInfo() {
      this.getRequest(
        API.MUSICLISTINFO_OPERATOR +
          JSON.parse(localStorage.user).id +
          "/" +
          this.musiclistid,
        false
      ).then(resp => {
        //console.log(resp.data.data)
        let listInfo = resp.data.data;
        this.listCover = listInfo.musiclistImg;
        this.listInfo.musiclistName = listInfo.musiclistName;
        this.listInfo.tags = listInfo.tags;
        this.listInfo.description = listInfo.description;
      });
    },

    upload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.dialogVisible = true;
        this.$refs.editUpload.clearFiles();
        this.$store.commit(types.SET_IMG, "");
      } else {
        this.fileinfo = file;
        this.$nextTick(() => {
          this.$refs.editUpload.clearFiles();
          this.$store.commit(types.SET_IMG, file.raw.path);
          this.dialogVisible = true;
        });
      }
    },

    saveInfo() {
      this.patchRequest(
        API.MUSICLIST_OPERATOR + "/" + this.musiclistid,
        true,
        this.listInfo
      ).then(resp => {
        if (resp.data) {
          this.$store.commit(types.RESET_LISTINFO);
          this.toMusicListInfo();
          this.$message.success({ message: "更新信息成功!", duration: 1000 });
        }
      });
    },

    toMusicListInfo() {
      this.$router.push({
        name: "musiclstinfo",
        params: { isCreated: this.isCreated, id: this.musiclistid }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/editListInfo.scss";
</style>