<template>
  <div style="padding:30px">
    歌曲列表--------歌单ID：{{musicList}}----{{ad}}
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
        if(localStorage.user){
          this.ad = JSON.parse(localStorage.getItem("user")).id;
        }
      }
    }


}
</script>

<style>

</style>