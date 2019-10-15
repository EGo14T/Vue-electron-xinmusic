<template>
  <div>
    <h1>我的音乐</h1>
    <slider :min=0 :max=100 v-model = "per"></slider>
  </div>

  
    
</template>

<script>
import timebar from '../components/progress-pc';

  export default {
    components: {
      'slider' : timebar
          
     },
     data(){
       return{
         per:''
       }
     }
  }
</script>

<style>

</style>