<template>
  <div style="padding:30px">
    歌曲列表--------歌单ID：{{musicList}}  {{ad}}
  </div>
</template>

<script>
export default {
  props: ['musicList'],
  data(){
    return{
      ad: ""
    }
  },
  created(){
    this.test();
  },

    methods: {
      test(){
        //alert(this.musicList)
        this.ad = localStorage.accessToken;
      }
    }


}
</script>

<style>

</style>