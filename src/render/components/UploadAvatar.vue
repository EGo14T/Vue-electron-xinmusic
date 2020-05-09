<template>
  <div class="cropper_panel">
    <transition name="a_animate">
      <div class="cropper-content" v-show="visible">
        <div class="c_header">上传头像</div>
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="img"
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
            @realTime="realTime"
          ></vueCropper>
        </div>
        <div class="preview">
          <div :style="previewBig">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
          <p>大尺寸封面</p>
          <div :style="previewSm">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
          <p>小尺寸封面</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["visible", "img"],

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
        limitMinSize: 17
      },

      previews: {},
      previewBig: {},
      previewSm: {},
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/uploadAvatar.scss";
</style>