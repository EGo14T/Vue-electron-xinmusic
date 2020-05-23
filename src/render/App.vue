<template>
  <div class="app">
    <div class="header">
        <appHeader></appHeader>
    </div>
    
      <div :class="['leftbar',musicId == ''?'noplaying':'playing']">
        <myScroll>
        <LeftMenu></LeftMenu>
        </myScroll>


        <MusicBar v-if="musicId != ''"></MusicBar>
      </div>

    <div class="main">
      <myScroll>
        <router-view :key="$route.path"></router-view>
      </myScroll>
    </div>
    <div class="footer">
        <footerbar></footerbar>
    </div>
  </div>  
</template>

<script>
import Header from './components/Header'
import Music from './components/music'
import LeftMenu from './components/LeftMeun'
import MusicBar from './components/MusicBar'
import footerbar from './components/footer/footer'

import { mapGetters } from "vuex";

export default {
  components:{
    'appHeader':Header,
    'musicplayer':Music,
    'LeftMenu':LeftMenu,
    'MusicBar':MusicBar,
    'footerbar': footerbar
  },
  

  computed: {
    ...mapGetters({
      musicId: "cur_playing_id",
    })
  },

}
</script>

<style>
.app{
  height: 100%;
}

.leftbar{
  position: absolute;
  left: 0;
  top: 50px;
  width: 199px;
  background: rgb(22, 24, 28);
}

.playing{
  height: calc(100% - 155px);
}

.noplaying{
  height: calc(100% - 99px);
}

.main{
  position:absolute;
  top: 50px;
  left: 200px;
  background: rgb(22, 24, 28);
  
  width: calc(100% - 200px);
  height: calc(100% - 99px);

}

.footer{
  position: fixed;
        margin: auto;
        bottom: 0;
        width: 100%;
   z-index: 999;
   background: #ffffff;
}

.header{
  -webkit-app-region: drag;
  
  position: fixed;
        margin: auto;
        top: 0;
        width: 100%;
   z-index: 999;
  border-bottom: 2px transparent solid;
  border-image:linear-gradient(to right,#770b0b,#b72424,#770b0b)1;
}

</style>
