<template>
<aplayer
  :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://ego1st.cn/1.mp3',
  }"
  /> 
  
</template>

<script>

import Aplayer from 'vue-aplayer'

export default {
    components:{
        'aplayer':Aplayer
    }

}
</script>

<style>

</style>