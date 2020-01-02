<template>
<div class="container">
  <h5>听友评论</h5>
  <div v-for="item in comments" style="margin:10px;">
    <div class="media">
      <img class="avatar align-self-start mr-3" :src="item.fromAvatar" width="36" height="36"/>
      <div class="media-body">
        <a href="" class="fromName">{{item.fromName}}：</a>{{item.content}}
          <div class="row justify-content-between comments-footer">
            <div class="col-4">
              <p>{{item.date}}</p>
            </div>
            <div class="col-4" align="right">
              <span  class="comments-func" @click="test()">点赞({{item.likeNum}})</span> | <span class="comments-func" @click="test()">分享</span> | <span class="comments-func" @click="test()">回复</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>


export default {

  data(){
    return{
      comments:[
      {
          "id": "1577779551073240367",
          "date": "2020-01-02 10:04:05",
          "ownerId": "1",
          "fromId": "456",
          "fromName": "帅比昕",
          "fromAvatar": 'https://cdn.ego1st.cn/avatar/昕.jpg',
          "likeNum": 2550,
          "content": "地表最帅！",
          "reply": [
              {
                  "id": 3,
                  "commentId": "1577779551073240367",
                  "fromId": "2",
                  "fromName": "ego",
                  "fromAvatar": "src/ggg",
                  "toId": "456",
                  "toName": "ja",
                  "toAvatar": "src/sd",
                  "content": "这只是一个测试的评论",
                  "date": "2019-12-31 18:06:56"
              },
              {
                  "id": 4,
                  "commentId": "1577779551073240367",
                  "fromId": "2",
                  "fromName": "ego",
                  "fromAvatar": "src/ggg",
                  "toId": "456",
                  "toName": "ja",
                  "toAvatar": "src/sd",
                  "content": "这只是一个测试的评论",
                  "date": "2020-01-02 10:04:40"
              }
          ]
      },
      {
          "id": "1577934436009562909",
          "date": "2020-01-02 11:07:16",
          "ownerId": "1",
          "fromId": "456",
          "fromName": "狗猴",
          "fromAvatar": 'https://cdn.ego1st.cn/avatar/猴.jpg',
          "likeNum": 9999999,
          "content": "欲擒故纵猴！",
          "reply": []
      },
      {
          "id": "1577934436009562909",
          "date": "2020-01-02 11:07:16",
          "ownerId": "1",
          "fromId": "456",
          "fromName": "狗楠",
          "fromAvatar": 'https://cdn.ego1st.cn/avatar/楠.jpg',
          "likeNum": 9999999,
          "content": "21年单身男！",
          "reply": []
      },
      {
          "id": "1577934436009562909",
          "date": "2020-01-02 11:07:16",
          "ownerId": "1",
          "fromId": "456",
          "fromName": "狗胖",
          "fromAvatar": 'https://cdn.ego1st.cn/avatar/胖.jpg',
          "likeNum": 9999999,
          "content": "还能再吃胖！",
          "reply": []
      }
      ],
    }
  },

  methods:{
    test(){
      alert("123")
    }

  },



}
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
  border-radius:50%;
}

.fromName {
  color: #2e6bb0;
}

.fromName:hover{
  text-decoration:none;
  
  color: #2c7ad1;
}

.media {
  width: 600px;
}

.media-body {
  font-size: 12.5px;
  white-space: pre-line;
}

.comments-footer{
  color: #4e4e52;
  
}

.comments-func {
  color: #4e4e52;
}

.comments-func:hover{
  cursor:Pointer;
  color: #828385;
}

</style>