<template>
  <div>
    <h1>我的音乐</h1>
  

    <audio autoplay="autoplay"
    controls="controls"
    preload="auto"
    src="https://ego1st.cn/1.mp3" 
    @timeupdate="updatetime"
    ref="audio">
  </audio>

  <button @click="playing()">播放</button>
  <button @click="pausing()">暂停</button>
  <button @click="jump()">跳到20s</button>
  <button @click="duration()">查看当前时间</button>

  <div class="ttt">
    {{time}}
  </div>
  </div>



  
    
</template>

<script>
import { timeout } from 'q';


  export default {
    components: {
       
     },
     data(){
       return{
         per:'',
         time: '',
       }
     },

     methods:{
       playing(){
         
         this.$refs.audio.play();
       },

       pausing(){
        this.$refs.audio.pause();
       },

       jump(){
         var audio = this.$refs.audio;
         audio.currentTime = 20;
       },

       getTime(){
         alert(this.$refs.audio.currentTime);
       },

       updatetime(e){
        this.time = e.target.currentTime;
       },

       duration(e){
        alert(this.$refs.audio.duration)
       }




     }
  }
</script>

<style>

.ttt{
  color:aliceblue
}

</style>