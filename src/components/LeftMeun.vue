<template>
  <myScroll>
    <div class="leftmenu">
      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">推荐</div>
          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-ic_addmusic" />
            </svg>
            <span class="navtext">发现音乐</span>
          </div>

          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-pengyou" />
            </svg>
            <span class="navtext" @click="toComponents('comment')">朋友</span>
          </div>
        </li>
      </ul>

      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitle">我的音乐</div>
          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-xihuan" />
            </svg>
            <span class="navtext">我的收藏</span>
          </div>

          <div class="nav-citem">
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use xlink:href="#icon-bendiyinle" />
            </svg>
            <span class="navtext">本地音乐</span>
          </div>
        </li>
      </ul>

      <ul class="nav flex-column">
        <li class="nav-item">
          <div class="navtitleMusicList" @click="showAllCr = !showAllCr">
            <span class="span-right">创建的歌单</span>
            <svg class="icon svg-icon leftbtn" aria-hidden="true" @click.stop="addmusic()">
              <use xlink:href="#icon-jia" />
            </svg>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCr ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            class="nav-citem"
            v-for="item in showCreateList"
            @click="toMusciList(item.musicListID)"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musicListName}}</span>
          </div>
        </li>

        <li class="nav-item">
          <div class="navtitleMusicList" @click="showAllCo = !showAllCo">
            <span style="margin-right:97px">收藏的歌单</span>
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="showAllCo ? '#icon-Group-3' : '#icon-Group-2'" />
            </svg>
          </div>

          <div
            class="nav-citem"
            v-for="item in showCollectionList"
            @click="toMusciList(item.musicListID)"
          >
            <svg class="icon svg-icon leftbtn" aria-hidden="true">
              <use :xlink:href="addclass(item.status)" />
            </svg>
            <span class="navitem">{{item.musicListName}}</span>
          </div>
        </li>
      </ul>
    </div>
  </myScroll>
</template>

<script>
export default {
  data() {
    return {
      CreateMusicListInfo: [
        {
          musicListID: 8,
          musicListName: "我喜欢的音乐",
          status: 0,
          isCollecting: 0
        },
        {
          musicListID: 7,
          musicListName: "音乐",
          status: 0,
          isCollecting: 0
        }
      ],

      CollectionMusicListInfo: [
        {
          musicListID: 8,
          musicListName: "我喜欢的音乐",
          status: 0,
          isCollecting: 0
        }
      ],

      showAllCr: false,
      showAllCo: false,
      skin: "",
      userID: '', //用户ID
    };
  },


  created(){
    //获取歌单列表
    this.getMusicList();
  },


  computed: {
    showCreateList: function() {
      if (this.showAllCr == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.CreateMusicListInfo;
      }
    },

    showCollectionList: function() {
      if (this.showAllCo == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        return showList; //返回当前数组
      } else {
        return this.CollectionMusicListInfo;
      }
    }
  },
  methods: {
    toMusciList(musicListID) {
      this.toComponents("musicList", musicListID);
    },

    //获取歌单列表
    getMusicList() {
      // if(localStorage.user){
      // this.userID = JSON.parse(localStorage.getItem("user")).id;
      // alert(this.userID)
      // }else{
      //   alert()
      // }
      this.getRequest("/my/musiclist/1").then(resp => {
        console.log(resp.data);
      });

    },
    
    addclass(i) {
      switch (i) {
        case 0:
          return "#icon-xihuan";
        case 1:
          return "#icon-swticonyinle2";
        case 2:
          return "#icon-lock";
      }
    },

    toComponents(pathUrl, params) {
      this.$router.push({ name: pathUrl, params: { id: params } });
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/leftbar.css");
</style>
