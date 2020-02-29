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
          <span class="content" v-html="item.replyComments.content">
          </span>
          <div class="reply">
            <a href class="fromName">@{{ item.originComments.name }}：</a>
            <span class="content" v-html="item.originComments.content"></span>
          </div>
        </div>
        <div v-else>
          <a href class="fromName">{{ item.replyComments.name }}：</a>
          <span class="content" v-html="item.replyComments.content">
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
      @keyup.enter.native="postComment"
      :close-on-click-modal="false"
      custom-class="dialogStyle"
    >
      <el-input type="textarea" placeholder="发表评论" v-model="textarea" @input="descInput" :rows="4" ref="inputComment" ></el-input>
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
      <svg class="icon svg-icon commentsbtn" aria-hidden="true" @click.stop="addAt">
        <use xlink:href="#icon-icon-at" />
      </svg>
      <!-- # -->
      <svg class="icon svg-icon commentsbtn" aria-hidden="true" @click.stop="addTarget">
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

      ccc:"<span class='emoji-item-common emoji-smile emoji-size-small'></span>",

      emojis: [
        { EN: "smile", CN: "微笑" },
        { EN: "blush", CN: "可爱" },
        { EN: "relaed", CN: "憨笑" },
        { EN: "heart_eyes", CN: "色" },
        { EN: "kissing_heart", CN: "亲亲" },
        { EN: "scream", CN: "惊恐" },
        { EN: "sob", CN: "大哭" },
        { EN: "kissing_closed_eyes", CN: "亲" },
        { EN: "flushed", CN: "呆" },
        { EN: "unamused", CN: "无趣" },
        { EN: "angry", CN: "生气" },
        { EN: "sweat", CN: "汗" },
        { EN: "confounded", CN: "痛苦" },
        { EN: "cold_sweat", CN: "冷汗" },
        { EN: "fearful", CN: "恐惧" },
        { EN: "mask", CN: "生病" },
        { EN: "joy", CN: "大笑" },
        { EN: "astonished", CN: "吃惊" },
        { EN: "stuck_out_tongue_winking_eye", CN: "鬼脸" },
        { EN: "triumph", CN: "抱怨" },
        { EN: "tired_face", CN: "疲倦" },
        { EN: "grin", CN: "呲牙" },
        { EN: "anger", CN: "生气的" },
        { EN: "heart", CN: "心" },
        { EN: "broken_heart", CN: "心碎" },
        { EN: "cow", CN: "牛" },
        { EN: "beers", CN: "啤酒" },
        { EN: "baby_chick", CN: "小鸡" },
        { EN: "dog", CN: "狗" },
        { EN: "birthday", CN: "蛋糕" },
        { EN: "clapx", CN: "鼓掌" },
        { EN: "pray", CN: "拍手" },
        { EN: "thumbsupx", CN: "强" },
        { EN: "thumbsdown", CN: "弱" },
        { EN: "100", CN: "100" },
        { EN: "lemon", CN: "柠檬" },
        { EN: "peach", CN: "桃" },
        { EN: "ghost", CN: "幽灵" },
        { EN: "eyes", CN: "眼睛" },
        { EN: "underage", CN: "18" },
        { EN: "accept", CN: "可" },
        { EN: "ok_hand", CN: "OK" }
      ]
    };
  },

  components: {
    EmojiPanel
  },

  mounted(){
    document.addEventListener('click',e => { 
      if(e.target.className.indexOf("emoji-item-common")==-1
      &&e.target.className.indexOf("emoji-panel-wrap")==-1){
        this.isShowEmojiPanel = false;
      }else{
        this.isShowEmojiPanel = true;
      }
    })
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

    emoji(word) {
      // 生成html
      var type = word.substring(1, word.length - 1);
      type = this.getDataName(this.emojis,"CN","EN",type);
      return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`;
    },

    appendEmoji(CN,EN) {
      let emoji = "[" + CN + "]";
      this.textarea = this.textarea + emoji;
      this.$refs.inputComment.focus();
      this.descInput();
    },

    addAt() {
      this.textarea = this.textarea + "@";
      this.$refs.inputComment.focus();
      this.descInput();
    },

    addTarget() {
      this.textarea = this.textarea + "#输入想说的话#";
      var pos = this.textarea.length;
      //console.log(pos)
      setTimeout(() => {
        this.$refs.inputComment.$refs.textarea.selectionStart = pos - 7
        this.$refs.inputComment.$refs.textarea.selectionEnd= pos - 1
        this.$refs.inputComment.focus();
      })
      this.descInput();
    },

    //获取评论
    getComments() {
      this.getRequest("/comments/getComments/123456789/1/10").then(resp => {
        //console.log(resp.data);
        for (const iterator of resp.data) {
          //console.log(iterator.replyComments.content)
          iterator.replyComments.content = iterator.replyComments.content.replace(/\[.*?\]/g, this.emoji);
          if(iterator.originComments!==null){
             iterator.originComments.content = iterator.originComments.content.replace(/\[.*?\]/g, this.emoji);
          }
        }
        this.comments = resp.data;
      });
    },

    //提交评论
    postComment() {
      //console.log(this.currentId)
      if(this.wordNumber<0){
        alert("字数超过限制");
      }else{
          let commentJson = {
          showId: "123456789",
          fromId: "1",
          toId: this.currentId,
          content: this.textarea
          };
          this.postRequest("/comments/saveComments", commentJson).then(resp => {
          //this.comments.push(this.content.replace(/:.*?:/g, this.emoji)); // 替换":"符号包含的字符串,通过emoji方法生成表情<span></span>
          //console.log(resp.data.replyComments.content);
          resp.data.replyComments.content = resp.data.replyComments.content.replace(/\[.*?\]/g, this.emoji);
          this.comments.unshift(resp.data);
          console.log(resp.data.replyComments)
          this.dialogVisible = false;
          });
      }
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


