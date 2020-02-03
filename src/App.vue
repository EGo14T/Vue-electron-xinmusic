<template>
  <div class="app">
    <div class="header">
        <appHeader></appHeader>
    </div>
    
      <div class="leftbar">
        <LeftMenu></LeftMenu>
      </div>

    <div class="main">
      <myScroll>
        <router-view></router-view>
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
import footerbar from './components/footer'

export default {
  components:{
    'appHeader':Header,
    'musicplayer':Music,
    'LeftMenu':LeftMenu,
    'footerbar': footerbar
  }

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
  height: calc(100% - 106px);
  background: rgb(22, 24, 28);
}

.main{
  position:absolute;
  top: 50px;
  left: 200px;
  background: rgb(22, 24, 28);
  
  width: calc(100% - 200px);;
  height: calc(100% - 106px);

}

.footer{
  position: fixed;
        margin: auto;
        bottom: 0;
        width: 100%;
   z-index: 9999;
   background: #ffffff;
   height: 56px;
}

.header{
  -webkit-app-region: drag;
  
  position: fixed;
        margin: auto;
        top: 0;
        width: 100%;
   z-index: 9999;

  border-bottom: 1.5px transparent solid;
  border-image:linear-gradient(to right,#770b0b,#b72424,#770b0b)1;
}

</style>
