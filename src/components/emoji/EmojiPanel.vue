<template>
  <div class="emoji-panel-wrap">
    <emoji
      v-for="(item,index) in emojis"
      :EN="item.EN"
      :CN="item.CN"
      v-bind:key="index"
      @onClick="handleEmojiClick"
    ></emoji>
  </div>
</template>
<script>
import Emoji from "./Emoji.vue";
export default {
  data() {
    return {
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
    Emoji
  },
  methods: {
    handleEmojiClick(a) {
      console.log(a);
      this.$emit("emojiClick", a);
    }
  }
};
</script>
<style scoped>
.emoji-panel-wrap {
  box-sizing: border-box;
  box-shadow: 0 0 3px 1px #25262a;
  border-radius: 5px;
  background-color: #2d2f33;
  width: 262px;
  height: 170px;
  position: fixed;
  margin-top: 5px;
}
</style>