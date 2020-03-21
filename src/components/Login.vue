<template>
  <div style="padding:30px">
    歌曲列表--------歌单ID：{{musicList}}
  </div>
</template>

<script>
export default {
  props: ['musicList'],
  created(){
    this.test();
  },

    methods: {
      test(){
        alert(this.musicList)
      }
    }


}
</script>

<style>

</style>