<template>
  <div class="container">
    <h5>听友评论</h5>
    <div class="media" v-for="item in comments">
      <img
        class="align-self-start mr-3"
        style="border-radius: 50%;"
        :src="item.replyComments.avatar"
        width="36"
        height="36"
      />
      <div class="media-body">
        <div v-if="item.originComments==null?false:true">
          <a href class="fromName">{{ item.replyComments.name }}：</a>
          <span class="content">{{ item.replyComments.content }}</span>
          <div class="reply">
            <a href class="fromName">@{{ item.originComments.name }}：</a>
            <span class="content">{{ item.originComments.content }}</span>
          </div>
        </div>
        <div v-else>
          <a href class="fromName">{{ item.replyComments.name }}：</a>
          <span class="content" v-html="ccc">

          </span>
        </div>

        <div class="row justify-content-between" style="color: #4e4e52;">
          <div class="col-4">
            <p>{{ item.replyComments.createTime }}</p>
          </div>
          <div class="col-4" align="right">
            <span
              class="comments-func"
              @click="toLike(item.replyComments.id)"
            >点赞({{ item.replyComments.like }})</span>|
            <span class="comments-func" @click="toShare(item.replyComments.id)">分享</span> |
            <span class="comments-func" @click="toComments(item.replyComments.id)">回复</span>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="commentsTitle"
      :visible.sync="dialogVisible"
      width="477px"
      @closed="handleClose"
      :close-on-click-modal="false"
      custom-class="dialogStyle"
    >
      <el-input type="textarea" placeholder="发表评论" v-model="textarea" @input="descInput" :rows="4"></el-input>
      <!-- 表情emoji -->
      <svg
        :class="['icon svg-icon','commentsbtn',isShowEmojiPanel?'commentsbtn-alive':'']"
        aria-hidden="true"
        @click.stop="showEmojiPanel"
      >
        <use xlink:href="#icon-biaoqing" />
      </svg>
      <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel"></emoji-panel>
      <!-- @ -->
      <svg class="icon svg-icon commentsbtn" aria-hidden="true">
        <use xlink:href="#icon-icon-at" />
      </svg>
      <!-- # -->
      <svg class="icon svg-icon commentsbtn" aria-hidden="true">
        <use xlink:href="#icon-jinghao" />
      </svg>

      <span :class="['wordNum',isOver?'wordLimit':'']">{{wordNumber}}</span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled.sync="isTextNull" @click="postComment">评论</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EmojiPanel from "../components/emoji/EmojiPanel";

export default {
  data() {
    return {
      comments: [], //评论

      commentsTitle: "歌曲：", //评论抬头  歌曲名称

      currentId: "", //当前操作的id

      textarea: "", //评论内容

      dialogVisible: false,

      wordNumber: 140, //字数

      isShowEmojiPanel: false, //显示emoji表情框

      ccc:"<span class='emoji-item-common emoji-joy emoji-size-small'></span>"
    };
  },

  components: {
    EmojiPanel
  },

  created() {
    this.getComments();
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
    toLike() {},

    toComments(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },

    //评论框关闭 初始化数据
    handleClose() {
      this.textarea = "";
      this.wordNumber = 140;
      this.dialogVisible = false;
    },

    descInput() {
      var txtVal = this.textarea.length;
      this.wordNumber = 140 - txtVal;
    },
    //emoji面板显示控制
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    appendEmoji(text) {
      let emoji = "[" + text + "]";
      this.textarea = this.textarea + emoji;
      this.descInput();
    },

    //获取评论
    getComments() {
      this.getRequest("/comments/getComments/123456789/1/10").then(resp => {
        //console.log(resp.data);
        this.comments = resp.data;
      });
    },

    //提交评论
    postComment() {
      //console.log(this.currentId)
      let commentJson = {
        showId: "123456789",
        fromId: "1",
        toId: this.currentId,
        content: this.textarea
      };

      this.postRequest("/comments/saveComments", commentJson).then(resp => {
        //console.log(resp.data.replyComments);
        this.comments.unshift(resp.data);
        this.dialogVisible = false;
      });
    }
  }
};
</script>
<style  lang="scss">
@import "../assets/css/emojiPanel.scss";
@import "../assets/css/emoji.css"; // 导入精灵图样式
</style>
<style lang="scss" scoped>
@import "../assets/css/comments.scss";
</style>


