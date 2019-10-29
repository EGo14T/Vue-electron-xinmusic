<!-- 组件说明 -->
<template>
    <div class='footerbar row'>
        <div class="playbtn col-md-auto">   
            <i class= "iconfont-playbar iconfont-pSize icon-shangyishou icon-space" @click="last()"></i>
            <i :class= "['iconfont-playbar', 'iconfont-pSize', 'icon-space',audioFlag?'icon-bofang':'icon-zanting' ]" @click="playAudio(audioFlag)"></i> 
            <i class= "iconfont-playbar iconfont-pSize icon-xiayishou icon-space"@click="next()"></i>
        </div> 

        <div class="timebar row col-md-auto">   
           <slider class="timebar-process" :min=0 :max=1000  v-model:value = "per" 
           @getSlide="getSlideValue" 
           @getSlideFlag="getSlideFlagValue">
           </slider>
        </div>

        <div class="volumebar row col-md-auto">
            <volumebar class="timebar-process" :min=0 :max=100  v-model:value = "perr"
            @getVolume="getVolumeValue">
            </volumebar>
        </div>

        <!--当前音乐时间-->
        <div class="starttime timefont">
             {{ctimeMinutes | addZero}}:{{ctimeSeconds | addZero}}
        </div>

        <!--音乐总长-->
        <div class="endtime timefont">
            {{ntimeMinutes | addZero}}:{{ntimeSeconds | addZero}}
        </div>

        <div class="volumebarbtn">
            <i class= "iconfont-playbar iconfont-vSize icon-shengyinkai icon-space"></i>
        </div>

        <audio
            preload="auto"
            src="https://ego1st.cn/1.mp3" 
            @canplay="canplay"
            @timeupdate="updatetime"
            autobuffer
            ref="audio">
        </audio>


        </div>
</template>

<script>

import timebar from '../components/timebar';
import volumebar from '../components/VolumeProgress';

    export default {
        components: {
            'slider' : timebar,
            'volumebar':volumebar


        },
        data () {
            return {
                per: '',
                perr:'60',
                slide: '',
                nowTime: '',
                secondNum: '',
                audioFlag: 'false',
                slideFlag: 'true',
            }
        },
        computed: {
            //总长
            ntimeMinutes:function(){
                return this.secondNum/60 | 0
            },

            ntimeSeconds:function(){
                return this.secondNum%60 | 0
            },

            //当前播放时间
            ctimeMinutes:function(){
                return this.nowTime/60 | 0;
            },

            ctimeSeconds:function(){
                return this.nowTime%60 | 0;
            },

 
        },
        methods: {
            playAudio(flag){
                if(flag){
                    this.$refs.audio.play();
                    this.audioFlag = !this.audioFlag
                }else{
                    this.$refs.audio.pause();
                    this.audioFlag = !this.audioFlag
                }
                
            },

            test(){
                let varint = this.secondNum | 0;
                let minutes = varint / 60 | 0;
                let seconds = varint % 60 | 0;

                console.log(varint);
                console.log(minutes);
                console.log(seconds);
            },

            canplay(){
                this.secondNum = this.$refs.audio.duration
            },

            updatetime(e){
                if(this.slideFlag){
                    this.nowTime = e.target.currentTime;
                    this.per = this.nowTime.toFixed(4) / this.secondNum * 1000;
                }
                
            },

            getSlideValue(data){
                this.slide = data
                this.$refs.audio.currentTime = this.secondNum * this.slide / 1000 ;
                //console.log("slide值"+this.slide)
            },

            getSlideFlagValue(data){
                console.log(data)
                this.slideFlag = data;
            },

            getVolumeValue(data){
                
                this.$refs.audio.volume =  data / 100;
            },

            next(){
                this.$refs.audio.src = "https://ego1st.cn/2.mp3";
                this.audioFlag = false;
                this.$refs.audio.play();

            }

        },

        watch:{
            per: function(){
               this.nowTime = this.secondNum * this.per / 1000;
               console.log("当前时间"+this.nowTime);
            }
            
        },

        filters:{
            addZero:function(value){
                if(value<10){
                    return '0'+value;
                }else{
                    return value;
                }

            }
        }
    }
</script>

<style>

.footerbar{
    height: 108px;
    background: #212124;
}

.playbtn{
    height: 108px;
    position: relative;
    top: 5px;
    left: 27px;

    color: #ffffff;
}

.playbtn .icon-space{
    margin-left: 5px;
    margin-right: 5px;
}

.timebar{
    width: 800px;
    color: #ffffff;
    position: absolute;
    top: 3px;
    left: 230px;

}

.col-md-auto{
    padding: 0px
}


.progress-bar{
    color:#454546;
    background: #b82525;
}

.timebar-process{
    position: relative;
    left: 29px;
    top: 5px;
}


.starttime{
    position: absolute;
    left: 198px;

}

.endtime{
    position: absolute;
    left: 706px;

}

.timefont{
    font-size: 12px;
    color: rgba(255, 255, 255, .9);
    height: 24px;
    letter-spacing: 1px;
    top: 20px;

}

.volumebarbtn{
    position:absolute;
    top: 17px;
    left: 745px;
}

.volumebar{
    position: relative;
    left: 620px;
    top: 3px;
}

</style>