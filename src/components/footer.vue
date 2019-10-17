<!-- 组件说明 -->
<template>
    <div class='footerbar row'>
        <div class="playbtn col-md-auto">   
            <i class= "iconfont-playbar icon-shangyishou icon-space"></i>
            <i class= "iconfont-playbar icon-bofang icon-space" @click="play()"></i> 
            <i class= "iconfont-playbar icon-xiayishou icon-space"></i>
        </div> 

        <div class="timebar row col-md-auto">   
           <slider class="timebar-process" :min=0 :max=100  v-model:value = "per"></slider>
        </div>

        <div class="starttime timefont">
             0{{ctimeMinutes}}:{{ctimeSeconds}}
        </div>

        <div class="endtime timefont">
            {{ntimeMinutes}}:{{ntimeSeconds}}
        </div>

        <audio autoplay="autoplay"
            preload="auto"
            src="https://ego1st.cn/1.mp3" 
            @canplay="canplay"
            ref="audio">
        </audio>


        </div>
</template>

<script>

import timebar from '../components/timebar';



    export default {
        components: {
            'slider' : timebar

        },
        data () {
            return {
                timepercent: '10%',
                per: '',
                time: '',

                secondNum: '',
            }
        },
        computed: {
            

            //总长
            ntimeMinutes:function(){
                return parseInt(this.secondNum/60)
            },

            ntimeSeconds:function(){
                return parseInt(this.secondNum%60)
            },

            //当前播放时间
            ctimeMinutes:function(){
                return parseInt(this.secondNum*this.per/100/60)
            },

            ctimeSeconds:function(){
                return parseInt(this.secondNum*this.per/100%60)
            }


            
        },
        methods: {
            play(){
                alert(this.$refs.audio.duration)
                
            },

            canplay(){
                this.secondNum = this.$refs.audio.duration
            }

        },
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












</style>