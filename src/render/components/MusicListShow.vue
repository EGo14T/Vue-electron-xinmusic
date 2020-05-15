<template>
  <div class="musiclist">
    <div class="list" v-for="item in list">
      <div style="cursor: pointer;" @click.stop="toMusciList(item.musiclistid)">
        <img :src="item.musiclistImg" width="100%" draggable="false" />
        <span style="font-size:12px">{{item.musiclistName}}</span>
      </div>
      <span style="font-size:13px;color:#5f5f63">{{Math.floor(Math.random()*100)}}首</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list","isCreated"],

  data() {
    return {};
  },

  methods: {
    toMusciList(id) {
      this.$router.push({
        name: "musiclstinfo",
        params: { isCreated: this.isCreated, id: id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.musiclist {
  color: #dcdde4;
  width: 100%;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;

  gap: 10px 20px;
  justify-items: center;

  .list {
    width: 120px;
    height: 190px;
  }
}
</style>