<!-- 组件说明 -->
<template>
    <div class='footerbar row'>
        <div class="playbtn col-md-auto">   
            <i class= "iconfont-playbar icon-shangyishou icon-space"></i>
            <i class= "iconfont-playbar icon-bofang icon-space"></i> 
            <i class= "iconfont-playbar icon-xiayishou icon-space"></i>
        </div> 

        <div class="timebar row col-md-auto">   
            <div class="starttime col-md-auto">
                {{timepercent}}
            </div>

            <slider :min=0 :max=100 v-model = "per"></slider>

            <div class="endtime col-md-auto">
                
            </div>
        </div>   

        
        </div>
</template>

<script>

import timebar from '../components/progress-pc';



    export default {
        components: {
            'slider' : timebar

        },
        data () {
            return {
                timepercent: '10%',
                per: '',
                time: this.per+123
            };
        },
        computed: {

        },
        methods: {

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
    width: 500PX;
    color: #ffffff;
    position: relative;
    top: 5px;
    left: 50px;

}

.col-md-auto{
    padding: 0px
}

.time{
    width: 300px;
}

.progress-bar{
    color:#454546;
    background: #b82525;
}












</style>