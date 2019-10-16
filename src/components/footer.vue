<!-- 组件说明 -->
<template>
    <div class='footerbar row'>
        <div class="playbtn col-md-auto">   
            <i class= "iconfont-playbar icon-shangyishou icon-space"></i>
            <i class= "iconfont-playbar icon-bofang icon-space" @click="play()"></i> 
            <i class= "iconfont-playbar icon-xiayishou icon-space"></i>
        </div> 

        <div class="timebar row col-md-auto">   
          <div class="starttime">
        </div>
           <slider class="timebar-process" :min=0 :max=100  v-model = "per"></slider>
        </div>   
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
                per: 10,
                pper: ''
            };
        },
        computed: {

        },
        methods: {
            play(){
                $refs.audio.play();
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
    top: 2px;
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












</style>