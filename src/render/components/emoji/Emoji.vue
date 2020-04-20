<template>
  <span
    class="emoji-item-common"
    :class="['emoji-'+EN,isInput?'emoji-size-small':'emoji-size-large']"
    @click="emojiClick"
  ></span>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: ["EN", "CN", "isInput"],
  methods: {
    emojiClick() {
      console.log(this.EN);
      this.$emit("onClick", this.CN,this.EN);
    }
  }
};
</script>