<template>
  <div>
    <h1>我的音乐</h1>
  

    <audio autoplay="autoplay"
    controls="controls"
    preload="auto"
    src="https://ego1st.cn/1.mp3" ref="audio">
  </audio>

  <button @click="play()">bofang</button>
  </div>

  
    
</template>

<script>


  export default {
    components: {
      
          
     },
     data(){
       return{
         per:''
       }
     },

     methods:{
       play(){
         this.$refs.audio.play();
       }
     }
  }
</script>

<style>

</style>