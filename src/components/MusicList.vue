<!-- 组件说明 -->
<template>
    <div>
        <div class="up">
            <div class="music-list-img">
                <img :src="imgSrc" width="199px" height="199px" draggable="false">
            </div>

            <div class="music-list-info">
                <div class="line1">
                    <span class="font-line1">歌单</span>
                    <span class="musiclist-title">{{musicTitle}}</span>
                </div>

                <div class="line2">

                </div>

                <div class="line3">

                </div>


            </div>
        </div>

        <div class="down" @click=getRequest()>
            {{count}}
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {
                imgSrc: 'https://ego1st.cn/images/EGo1ST.jpg',
                musicTitle: 'Z_ce的年度歌单',

            };
        },
        computed: {
            count(){
                return this.$store.state.count
            },
        },
        methods: {

            getRequest(){
                this.$http.get("http://localhost:8082/my/music/musiclist/1")
                .then((res) => {
                console.log(res);
                }).catch((err) => {
                console.log(err);
                });
            }

        },
    }
</script>


<style>

.up {
    position: relative;
    top: 3px;

    padding: 30px;
    height: 250px;
}

.music-list-img {
    height: 199px;
    width: 199px;
    float: left;

    position: relative;
}

.music-list-info {
    height: 200px;
    width: 500px;

    position: relative;
    left: 230px;
}

.line1 {
   position: relative;
   bottom: 5px;
    
}


.font-line1 {
    font-size: 15px;
    color: #e03f40;
    Border:1px solid #e03f40;
    padding-left: 3px;
    padding-right: 3px;

    position: relative;
    right: 200px; 
}

.musiclist-title {
    color: white;
    font-size: 25px;
    position: relative;
    right: 185px; 
    top: 3px;
}

</style>