<template>
  <div class="container">
    <h5>听友评论</h5>
    <div v-for="item in comments" style="margin:10px;">
      <div class="media">
        <img
          class="avatar align-self-start mr-3"
          :src="item.fromAvatar"
          width="36"
          height="36"
        />
        <div class="media-body">
          <a href="" class="fromName">{{ item.fromName }}：</a
          >{{ item.content }}
          <div class="row justify-content-between comments-footer">
            <div class="col-4">
              <p>{{ item.date }}</p>
            </div>
            <div class="col-4" align="right">
              <span class="comments-func" @click="toLike()"
                >点赞({{ item.likeNum }})</span >| <span class="comments-func" @click="test()">分享</span> | <span class="comments-func" @click="toComments()">回复</span>
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
      <el-input
        type="textarea"
        placeholder="发表评论"
        v-model="textarea"
        :rows="4"
        maxlength="140"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comments: [
        {
          id: "1577779551073240367",
          date: "2020-01-02 10:04:05",
          ownerId: "1",
          fromId: "456",
          fromName: "帅比昕",
          fromAvatar: "https://cdn.ego1st.cn/avatar/昕.jpg",
          likeNum: 2550,
          content: "地表最帅！",
          reply: [
            {
              id: 3,
              commentId: "1577779551073240367",
              fromId: "2",
              fromName: "ego",
              fromAvatar: "src/ggg",
              toId: "456",
              toName: "ja",
              toAvatar: "src/sd",
              content: "这只是一个测试的评论",
              date: "2019-12-31 18:06:56"
            },
            {
              id: 4,
              commentId: "1577779551073240367",
              fromId: "2",
              fromName: "ego",
              fromAvatar: "src/ggg",
              toId: "456",
              toName: "ja",
              toAvatar: "src/sd",
              content: "这只是一个测试的评论",
              date: "2020-01-02 10:04:40"
            }
          ]
        },
        {
          id: "1577934436009562909",
          date: "2020-01-02 11:07:16",
          ownerId: "1",
          fromId: "456",
          fromName: "狗猴",
          fromAvatar: "https://cdn.ego1st.cn/avatar/猴.jpg",
          likeNum: 9999999,
          content: "欲擒故纵猴！",
          reply: []
        },
        {
          id: "1577934436009562909",
          date: "2020-01-02 11:07:16",
          ownerId: "1",
          fromId: "456",
          fromName: "狗楠",
          fromAvatar: "https://cdn.ego1st.cn/avatar/楠.jpg",
          likeNum: 9999999,
          content: "21年单身男！",
          reply: []
        },
        {
          id: "1577934436009562909",
          date: "2020-01-02 11:07:16",
          ownerId: "1",
          fromId: "456",
          fromName: "狗胖",
          fromAvatar: "https://cdn.ego1st.cn/avatar/胖.jpg",
          likeNum: 9999999,
          content: "还能再吃胖！",
          reply: []
        }
      ],
      commentsTitle: "歌曲：", //评论抬头  歌曲名称

      textarea: "",   //评论内容

      dialogVisible: false
    };
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

    
  },
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

.comments-footer {
  color: #4e4e52;
}

.comments-func {
  color: #4e4e52;
}

.comments-func:hover {
  cursor: Pointer;
  color: #828385;
}

::v-deep .dialogStyle {
  background-color: #2d2f33;
}

::v-deep .el-textarea__inner:hover {
    border:1px solid #3b3a3d;
}
 
::v-deep .el-textarea__inner:focus {
    border:1px solid #3b3a3d;
    box-shadow: none;
}

::v-deep textarea::-webkit-input-placeholder {
    color: #5f5f63;
  }

::v-deep ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    background-color: rgb(0, 85, 255);
}

 
/*定义滚动条的轨道，内阴影及圆角*/
::v-deep ::-webkit-scrollbar-track {
    border-radius: 0px;
    background-color: #292b2f;
}
 
/*定义滑块，内阴影及圆角*/
::v-deep ::-webkit-scrollbar-thumb{
    width: 10px;
    height: 10px;
    border-radius: 10px;

    background-color: #3d3f43;
}


::v-deep ::-webkit-scrollbar-thumb:hover{
    cursor:pointer;
    background-color: #484a4e;
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
  padding: 20px;
}

.dialogStyle .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}

.dialogStyle .el-textarea__inner {
  resize: none;
  background-color: #292b2f;
  border: 1px solid #3b3a3d;
}

.dialogStyle .el-textarea .el-input__count {
  color: #727275;
  background: none;
  bottom: -20px;
}

</style>
