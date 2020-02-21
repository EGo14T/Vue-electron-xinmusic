<template>
  <div class="container">
    <h5>听友评论</h5>
    <div v-for="item in comments" style="margin:10px;">
      <div class="media">
        <img class="avatar align-self-start mr-3" :src="item.replyComments.avatar" width="36" height="36" />
        <div class="media-body">
          <div v-if="item.originComments==null?false:true">
            <a href class="fromName">{{ item.replyComments.name }}：</a><span class="content">{{ item.replyComments.content }}</span>
            <div class="reply">
              <a href class="fromName">@{{ item.originComments.name }}：</a><span class="content">{{ item.originComments.content }}</span>
            </div>
          </div>
          <div v-else>
            <a href class="fromName">{{ item.replyComments.name }}：</a><span class="content">{{ item.replyComments.content }}</span>
          </div>
          
          <div class="row justify-content-between comments-footer">
            <div class="col-4">
              <p>{{ item.date }}</p>
            </div>
            <div class="col-4" align="right">
              <span class="comments-func" @click="toLike()">点赞({{ item.replyComments.like }})</span>| <span class="comments-func" @click="test()">分享</span> | <span class="comments-func" @click="toComments()">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="commentsTitle"
      :visible.sync="dialogVisible"
      width="477px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="dialogStyle"
    >
      <el-input type="textarea" placeholder="发表评论" v-model="textarea" @input="descInput" :rows="4"></el-input>

      <i :class="['iconfont-comments','icon-biaoqing',isShowEmojiPanel?'iconfont-comments-alive':'']" @click.stop="showEmojiPanel"></i>
      <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel" ></emoji-panel>
      <i class="iconfont-comments icon-icon-test"></i>
      <i class="iconfont-comments icon-jinghao"></i>

      <span :class="['wordNum',isOver?'wordLimit':'']">{{wordNumber}}</span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled.sync="isTextNull">评论</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import EmojiPanel from "../components/emoji/EmojiPanel";

export default {
  data() {
    return {
      comments:
      [
        {
          "replyComments": {
            "id": "1581758854743154730",
            "showId": "11231231412",
            "fromId": "2",
            "toId": "1581673273524334290",
            "content": "这只是一个测",
            "like": 999,
            "state": 1,
            "createTime": "2020-02-15 17:27:35",
            "avatar": "https://cdn.ego1st.cn/avatar/昕.jpg",
            "name": "昕哥"
          },
          "originComments": {
            "id": "1581673273524334290",
            "showId": "11231231412",
            "fromId": "1",
            "toId": "",
            "content": "这只是一个测试的评论",
            "like": 666,
            "state": 1,
            "createTime": "2020-02-14 17:41:14",
            "avatar": "https://cdn.ego1st.cn/avatar/猴.jpg",
            "name": "egoist"
          }
        },
        {
          "replyComments": {
            "id": "1581673273524334290",
            "showId": "11231231412",
            "fromId": "1",
            "toId": "",
            "content": "这只是一个测试的评论",
            "like": 666,
            "state": 1,
            "createTime": "2020-02-14 17:41:14",
            "avatar": "https://cdn.ego1st.cn/avatar/猴.jpg",
            "name": "egoist"
          },
          "originComments": null
          }
      ] ,
      commentsTitle: "歌曲：", //评论抬头  歌曲名称

      textarea: "", //评论内容

      dialogVisible: false,

      wordNumber: 140, //字数

      isShowEmojiPanel: false, //显示emoji表情框
    };
  },

  components:{
      EmojiPanel
  },


  computed: {
    isOver: function() {
      return this.wordNumber < 0;
    },

    isTextNull: function() {
      return this.wordNumber === 140 || this.wordNumber < 0;
    }
  },

  methods: {
    //点赞是一种美德
    toLike() {
      alert("点赞成功");
    },

    toComments() {
      this.dialogVisible = true;
    },

    handleClose() {
      this.dialogVisible = false;
    },

    descInput() {
      var txtVal = this.textarea.length;
      this.wordNumber = 140 - txtVal;
    },
    //emoji面板显示控制
    showEmojiPanel(){
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    appendEmoji(text) {
      let emoji = "[" + text + "]"
      this.textarea = this.textarea + emoji;
      this.descInput();
    }
  }
};
</script>

<style scoped>
.container {
  color: #dcdde4;
  padding: 30px;
}

.comments {
  display: inline-block;
}

.avatar {
  border-radius: 50%;
}

.fromName {
  color: #2e6bb0;
}

.fromName:hover {
  text-decoration: none;

  color: #2c7ad1;
}

.media {
  width: 600px;
}

.media-body {
  font-size: 12.5px;
  white-space: pre-line;
}

.reply {
  margin: 5px 0 5px 1px;
  padding: 8px;
  background-color: #1c1e23;
}

.comments-footer {
  color: #4e4e52;
}

.comments-func {
  color: #4e4e52;
}

.comments-func:hover {
  color: #828385;
}

.wordNum {
  position: relative;
  left: 335px;
}

.wordLimit {
  color: #c51919ee;
}

.content {
  user-select: text;
}

::v-deep .dialogStyle {
  background-color: #2d2f33;
}

::v-deep .el-textarea__inner:hover {
  border: 1px solid #3b3a3d;
}

::v-deep .el-textarea__inner:focus {
  border: 1px solid #3b3a3d;
  box-shadow: none;
}

::v-deep textarea::-webkit-input-placeholder {
  color: #5f5f63;
}

::v-deep ::-webkit-scrollbar {
  width: 8px;
  cursor: pointer !important;
}

/*定义滚动条的轨道，内阴影及圆角*/
::v-deep ::-webkit-scrollbar-track {
  border-radius: 0px;
  background-color: #292b2f;
}

/*定义滑块，内阴影及圆角*/
::v-deep ::-webkit-scrollbar-thumb {
  width: 10px;
  height: 10px;
  border-radius: 10px;

  background-color: #3d3f43;
}

::v-deep ::-webkit-scrollbar-thumb:hover {
  background-color: #484a4e;
}

::v-deep ::-webkit-scrollbar-button :hover {
  /*当鼠标在水平滚动条下面的按钮上的状态*/
  cursor: pointer;
}

/* 更改element-UI按钮样式 */
.el-button--primary {
  color: #fff;
  font-size: 16px;
  background-color: #2e4e7e;
  border-color: #2e4e7e;

  padding: 6px 18px 6px 18px;
}
.el-button--primary:hover {
  background-color: #3a6098;
  border-color: #3a6098;
}
.el-button--primary:focus {
  background-color: #3a6098;
  border-color: #3a6098;
}

.el-button--primary.is-disabled,
.el-button--primary.is-disabled:hover {
  color: #667180;
  background-color: #26354b;
  border-color: #26354b;
}
</style>

<!-- 全局style -->
<style>
.dialogStyle .el-dialog__title {
  font-size: 16px;
  color: #adafb2;
}

.dialogStyle .el-dialog__header {
  padding: 10px 0 0 15px;
}

.dialogStyle .el-dialog__body {
  padding: 20px 20px 15px 20px;
}

.dialogStyle .el-dialog__footer {
  background-color: #292b2f;
  padding: 15px 20px 15px 20px;
}

.dialogStyle .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}

.dialogStyle .el-textarea__inner {
  cursor: default;
  resize: none;
  background-color: #292b2f;
  border: 1px solid #3b3a3d;
}

.dialogStyle .el-textarea .el-input__count {
  color: #727275;
  background: none;
  bottom: -20px;
}

.el-popover_self {
  background: #2d2f33 !important;
  box-shadow: 0px #000;
}

.el-popper[x-placement^=bottom] .popper__arrow::after{
  border-bottom-color:#2d2f33 !important;
}

.popper__arrow{
  border-bottom-color:#212326 !important;
}

</style>

<style  lang="scss">
// 注意 这里因为v-html的原因 不能使用scoped 不然样式不能失效
.emoji-item-common {
background: url("../assets/img/emoji_sprite.png");
display: inline-block;
  &:hover {
    cursor: pointer;
  }
}

.emoji-size-small {
// 表情大小
zoom: 0.3;
}

.emoji-size-large {
zoom: 0.4; // emojipanel表情大小
margin: 4px;
}
.comments-list {
margin-top: 20px;
.comments-list-item {
  margin-bottom: 20px;
  .comments-list-item-heading {
    display: inline-block;
    img {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .comments-list-item-username {
      margin-left: 5px;
      font-weight: bold;
    }
  }
}
}
@import "../assets/css/emoji.css"; // 导入精灵图样式
</style>