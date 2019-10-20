<template>
  <div class="app">
    <div class="header">
        <appHeader></appHeader>
    </div>

    <div class="leftbar">
      <LeftMenu></LeftMenu>
    </div>

    <div class="container">
        <router-view></router-view>
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
  height: 563px;

  overflow-y:scroll;

  background: rgb(22, 24, 28);
}

.container{
   position:absolute;
  top: 50px;
  left: 200px;
  background: rgb(22, 24, 28);
  
  width: 830px;
  height: 563px;
  overflow-y:scroll

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

::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    background-color: rgb(22, 24, 28);
}

 
/*定义滚动条的轨道，内阴影及圆角*/
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgb(22, 24, 28);
}
 
/*定义滑块，内阴影及圆角*/
::-webkit-scrollbar-thumb{
    width: 10px;
    height: 10px;
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: rgba(44, 46, 50,.85);
}


::-webkit-scrollbar-thumb:hover{
    
    background-color: rgb(48, 50, 54);
}

</style>
