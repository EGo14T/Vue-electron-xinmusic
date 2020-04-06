<template>
  <div>
    <span class="m-content overflow-line" id="J_description">简介：{{introduce}}</span>
    <!-- <button
      type="button"
      class="btn-more"
      v-if="isShowMore"
      @click="showmoreDesc($event)"
    >查看更多</button> -->
    <svg class="icon svg-icon morebtn" aria-hidden="true" @click.stop="showmoreDesc($event)" v-if="isShowMore">
      <use :xlink:href="isDescStatus ? '#icon-Group-3' : '#icon-Group-1'" />
    </svg>
  </div>
</template>
<script>
export default {
  name: "Spread",
  data() {
    return {
      isShowMore: false,
      isDescStatus: true,
      introduce: ""
    };
  },
  props: {
    mes2: {
      type: String,
      default: ""
    }
  },
  methods: {
    showmoreDesc(e) {
      let el = e.currentTarget;
      el.previousElementSibling.classList[
        !this.isDescStatus ? "add" : "remove"
      ]("overflow-line");
      el.classList[this.isDescStatus ? "add" : "remove"]("more-collapse");
      this.isDescStatus = !this.isDescStatus;
      this.isShowMore = true;
    }
  },
  watch: {
    mes2(val) {
    if(val!=null){
        this.introduce = val;
    }
      if (this.introduce.length > 75) {
        this.isShowMore = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.m-content {
  &.overflow-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.morebtn {
    color: #adafb2;
    width: 18px;
    height: 18px;
    margin-right: 6px;

    position: absolute;
    right: 0;
    top: 200px;
}
</style>