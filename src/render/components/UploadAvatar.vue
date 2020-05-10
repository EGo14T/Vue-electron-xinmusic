<template>
  <div class="cropper_panel">
    <transition name="a_animate">
      <div class="cropper-content" v-show="visible">
        <div class="c_header">上传头像</div>
        <div class="close" @click="close()">
          <svg class="icon svg-icon closebtn" aria-hidden="true">
            <use xlink:href="#icon-close" />
          </svg>
        </div>

        <div class="cropper" style="text-align:center">
          <div class="no_img" v-if="imgUrl==''">请选择不超过5M的图片</div>
          <vueCropper
            v-else
            ref="cropper"
            :img="imgUrl"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="option.info"
            :full="option.full"
            :canScale="option.canScale"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            :limitMinSize="option.limitMinSize"
            :enlarge="option.enlarge"
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div class="preview">
          <div class="no_b_img" v-if="imgUrl==''"></div>
          <div :style="previewBig" v-else>
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
          <p @click="test()">大尺寸封面</p>
          <div class="no_s_img" v-if="imgUrl==''"></div>
          <div :style="previewSm" v-else>
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
          <p>小尺寸封面</p>
        </div>
        <div class="c_footer1">
          <el-upload
            ref="selectUpload"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="reSelect"
            :limit="1"
          >
            <input class="re_select f_btn" type="button" value="重新选择" />
          </el-upload>
        </div>
        <div class="c_footer2">
          <input
            class="save_close f_btn"
            type="button"
            :disabled="imgUrl==''"
            @click="saveClose()"
            value="保存并关闭"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as types from "../store/types";

import { mapGetters } from "vuex";

import { UpyunCloud } from '../plugins/upload'

export default {
  props: ["visible"],

  computed: {
    ...mapGetters({
      imgUrl: "get_select_img"
    })
  },

  data() {
    return {
      option: {
        img: "", // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        info: false, // 裁剪框的大小信息
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        //autoCropWidth: 200, // 默认生成截图框宽度
        //autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMove: false,
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        limitMinSize: 17,
        enlarge: 1
      },

      fileinfo: "",

      previews: {},
      previewBig: {},
      previewSm: {},

      downImg: "#"
    };
  },

  methods: {
    realTime(data) {
      var previews = data;
      this.previewBig = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 120 / previews.w
      };

      this.previewSm = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        zoom: 60 / previews.w
      };

      this.previews = data;
    },

    close() {
      this.$emit("update:visible", false);
      this.$refs.selectUpload.clearFiles();
      this.$store.commit(types.SET_IMG, "");
    },

    reSelect(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$store.commit(types.SET_IMG, "");
      } else {
        this.fileinfo = file;
        var path = file.raw.path;
        this.$nextTick(() => {
          this.$refs.selectUpload.clearFiles();
          this.$store.commit(types.SET_IMG, path);
        });
      }
    },

    saveClose() {
      this.option.enlarge = 180/this.$refs.cropper.cropW;

      var options = {
        serviceName: 'ego1stcdn',
        operatorName: 'ego1st',
        operatorPassword: 'IzvKQEiz7NfacZ6zPTMCyTf7PImArMXf'
      }
      

      this.$refs.cropper.getCropBlob(data => {
        var a = new UpyunCloud(options);
        a.upload('/demo.jpeg',data);
        console.log(a);
        //console.log(data);
      });
    },

    test() {
      var options = {
        serviceName: '',
        operatorName: '',
        operatorPassword: ''
      }

      var a = new UpyunCloud(options);
      a.deleteFile("/demo.jpeg");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/uploadAvatar.scss";
</style>