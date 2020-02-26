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
        @click="playAudio(audioFlag)"
      >
        <use :xlink:href="audioFlag?'#icon-bofang':'#icon-zanting'" />
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

    <div class="volumebarbtn" :title="tStatus">
      <svg class="icon svg-icon playStatus" aria-hidden="true" @click="changePlayStatus()">
        <use :xlink:href="pStatus" />
      </svg>
    </div>

    <audio
      preload="auto"
      src="https://ego1st.cn/1.mp3"
      @canplay="canplay"
      @timeupdate="updatetime"
      autobuffer
      ref="audio"
    ></audio>
  </div>
</template>

<script>
import timebar from "../components/timebar";
import volumebar from "../components/VolumeProgress";

export default {
  components: {
    slider: timebar,
    volumebar: volumebar
  },
  data() {
    return {
      per: "",
      vol: "60",
      currentVol: "60",
      slide: "",
      nowTime: "",
      secondNum: "",
      audioFlag: "false",
      slideFlag: "true",

      playStatus: 0
    };
  },
  computed: {
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

    pStatus:function() {
      switch(this.playStatus){
        case 0: return "#icon-danquxunhuan";break;
        case 1: return "#icon-liebiaoxunhuan";break;
        case 2: return "#icon-suiji";break;
      }
    },

    tStatus:function() {
      switch(this.playStatus){
        case 0: return "单曲循环";break;
        case 1: return "列表循环";break;
        case 2: return "随机播放";break;
      }
    }
  },
  methods: {
    playAudio(flag) {
      if (flag) {
        this.$refs.audio.play();
        this.audioFlag = !this.audioFlag;
      } else {
        this.$refs.audio.pause();
        this.audioFlag = !this.audioFlag;
      }
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

    next() {
      this.$refs.audio.src = "https://ego1st.cn/2.mp3";
      this.audioFlag = false;
      this.$refs.audio.play();
    },

    mute() {
      if (this.vol !== 0) {
        this.vol = 0;
      } else {
        this.vol = this.currentVol;
      }
    },

    changePlayStatus(){
      if(this.playStatus==0){
        this.playStatus = 1;
        
      }else if(this.playStatus==1){
        this.playStatus = 2;
        
      }else{
        this.playStatus = 0;
        
      }
    }
  },

  watch: {
    per: function() {
      this.nowTime = (this.secondNum * this.per) / 1000;
      //console.log("当前时间"+this.nowTime);
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
  }
};
</script>

<style scoped>
@import url("../assets/css/footer.css");
</style>>