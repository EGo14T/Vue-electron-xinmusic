<!-- 组件说明 -->
<template>
  <div class="footerbar row">
    <div class="playbtn col-md-auto">
      <svg class="icon svg-icon footerbtn" aria-hidden="true" @click="last()">
        <use xlink:href="#icon-shangyishou" />
      </svg>

      <svg
        class="icon svg-icon footerbtn"
        style="height:37px;width:37px"
        aria-hidden="true"
        @click="pause()"
        v-show="!isPause"
      >
        <use xlink:href="#icon-zanting" />
      </svg>

      <svg
        class="icon svg-icon footerbtn"
        style="height:37px;width:37px"
        aria-hidden="true"
        @click="play()"
        v-show="isPause"
      >
        <use xlink:href="#icon-bofang" />
      </svg>

      <svg class="icon svg-icon footerbtn" aria-hidden="true" @click="next()">
        <use xlink:href="#icon-xiayishou" />
      </svg>
    </div>

    <div class="timebar row col-md-auto">
      <slider
        class="timebar-process"
        :min="0"
        :max="1000"
        v-model:value="per"
        @getSlide="getSlideValue"
        @getSlideFlag="getSlideFlagValue"
      ></slider>
    </div>

    <div class="volumebar row col-md-auto">
      <volumebar
        class="timebar-process"
        :min="0"
        :max="100"
        v-model:value="vol"
        @getVolume="getVolumeValue"
      ></volumebar>
    </div>

    <!--当前音乐时间-->
    <div class="starttime timefont">{{ctimeMinutes | addZero}}:{{ctimeSeconds | addZero}}</div>

    <!--音乐总长-->
    <div class="endtime timefont">{{ntimeMinutes | addZero}}:{{ntimeSeconds | addZero}}</div>

    <div class="volumebarbtn">
      <svg class="icon svg-icon volbtn" aria-hidden="true" @click="mute">
        <use :xlink:href="isMute?'#icon-shengyinwu':'#icon-shengyin_shiti'" />
      </svg>
    </div>

    <div class="playType" :title="tStatus">
      <svg class="icon svg-icon playStatus" aria-hidden="true" @click="changePlayStatus()">
        <use :xlink:href="pStatus" />
      </svg>
    </div>

    <audio
      preload="auto"
      @canplay="canplay"
      @timeupdate="updatetime"
      @ended="next()"
      autoplay
      ref="audio"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const { ipcRenderer } = window.require('electron');

import timebar from "../footer/timebar";
import volumebar from "../footer/VolumeProgress";

import * as types from "../../store/types";

export default {
  components: {
    slider: timebar,
    volumebar: volumebar
  },

  created(){
    ipcRenderer.on('lastMusic', () => {
      this.last();
    }),
    ipcRenderer.on('nextMusic', () => {
      this.next();
    })
  },
  data() {
    return {
      per: "",
      vol: "60",
      currentVol: "60",
      slide: "",
      nowTime: "",
      secondNum: "",
      isPause: true,
      slideFlag: true,

      curIndex: -1, //当前下标

      loadFinish: false //是否加载完成
    };
  },
  computed: {
    ...mapGetters({
      playStatus : 'cur_play_status',
      musicURL: 'cur_music_url',
      playURL : 'cur_play_url',
    }),

    //总长
    ntimeMinutes: function() {
      return (this.secondNum / 60) | 0;
    },

    ntimeSeconds: function() {
      return this.secondNum % 60 | 0;
    },

    //当前播放时间
    ctimeMinutes: function() {
      return (this.nowTime / 60) | 0;
    },

    ctimeSeconds: function() {
      return this.nowTime % 60 | 0;
    },

    isMute: function() {
      return this.vol === 0;
    },

    pStatus: function() {
      switch (this.playStatus) {
        case 0:
          return "#icon-danquxunhuan";
          break;
        case 1:
          return "#icon-liebiaoxunhuan";
          break;
        case 2:
          return "#icon-suiji";
          break;
      }
    },

    tStatus: function() {
      switch (this.playStatus) {
        case 0:
          return "单曲循环";
          break;
        case 1:
          return "列表循环";
          break;
        case 2:
          return "随机播放";
          break;
      }
    }
  },

    watch: {
    per: function() {
      this.nowTime = (this.secondNum * this.per) / 1000;
      //console.log("当前时间"+this.nowTime);
    },

    "$store.state.curMusicId": function() {
      this.$refs.audio.src = this.playURL;
      this.isPause = false;
      //this.$refs.audio.play();
    }
  },

  //过滤器，小于10的补0
  filters: {
    addZero: function(value) {
      if (value < 10) {
        return "0" + value;
      } else {
        return value;
      }
    }
  },


  methods: {
    //播放音乐
    play() {
      //console.log("播放");
      this.$refs.audio.play();
      this.isPause = !this.isPause;
    },

    //暂停音乐
    pause() {
      //console.log("暂停");
      this.$refs.audio.pause();
      this.isPause = !this.isPause;
    },

    //上一首
    last() {
      this.$store.commit(types.CHANGE_MUSIC,0);
      this.isPause = false;
    },

    //下一首
    next() {
      this.$store.commit(types.CHANGE_MUSIC,1);
      this.isPause = false;
    },

    test() {
      let varint = this.secondNum | 0;
      let minutes = (varint / 60) | 0;
      let seconds = varint % 60 | 0;

      console.log(varint);
      console.log(minutes);
      console.log(seconds);
    },

    canplay() {
      this.secondNum = this.$refs.audio.duration;
      this.loadFinish = true;
    },

    updatetime(e) {
      if (this.slideFlag) {
        this.nowTime = e.target.currentTime;
        this.per = (this.nowTime.toFixed(4) / this.secondNum) * 1000;
      }
    },

    getSlideValue(data) {
      this.slide = data;
      this.$refs.audio.currentTime = (this.secondNum * this.slide) / 1000;
      //console.log("slide值"+this.slide)
    },

    //拖动的时候 歌曲仍然继续播放
    getSlideFlagValue(data) {
      //console.log(data)
      this.slideFlag = data;
    },

    getVolumeValue(data) {
      this.currentVol = data;
      this.$refs.audio.volume = data / 100;
    },

    mute() {
      if (this.vol !== 0) {
        this.vol = 0;
      } else {
        this.vol = this.currentVol;
      }
    },

    changePlayStatus() {
      if (this.playStatus == 0) {
        this.$store.commit(types.CHANGE_PLAY_STATUS,1)
        this.$refs.audio.loop = false;
        //console.log("当前是列表循环");
      } else if (this.playStatus == 1) {
        this.$store.commit(types.CHANGE_PLAY_STATUS,2)
        this.$refs.audio.loop = false;
        //console.log("当前是随机播放");
      } else {
        this.$store.commit(types.CHANGE_PLAY_STATUS,0)
        //console.log("当前是单曲循环");
        this.$refs.audio.loop = true;
      }
    },

    
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/footer.scss";
</style>