<template>
  <header>
    <nav class="navbar navbar-dark navbar-expand-lg navbar-fixed-top bg-header">
      <svg
        class="icon svg-icon"
        aria-hidden="true"
        style="width:30px;height:30px; margin-right:5px;"
      >
        <use xlink:href="#icon-tips_music" />
      </svg>
      <div class="navbar-brand" @click>昕音乐</div>
      <div class="history">
        <svg class="icon svg-icon historybtn" aria-hidden="true">
          <use xlink:href="#icon-Group-" />
        </svg>
        <svg class="icon svg-icon historybtn" aria-hidden="true">
          <use xlink:href="#icon-Group-2" />
        </svg>
      </div>
      <div class="search">
        <input type="text" class="searchinput" placeholder="搜索音乐" />
        <svg class="icon svg-icon searchbtn" aria-hidden="true">
          <use xlink:href="#icon-sousuo" />
        </svg>
      </div>
      <ul class="nav navbar-nav navbar-tools">
        <li>
          <div class="svgspace" title="最小化窗口" @click="minwindow()">
            <svg class="icon svg-icon toolbtn" aria-hidden="true">
              <use xlink:href="#icon-minimum" />
            </svg>
          </div>
        </li>
        <li>
          <div class="svgspace" title="最小化到任务栏" @click="minToTask()">
            <svg class="icon svg-icon toolbtn" aria-hidden="true">
              <use xlink:href="#icon-zuixiaohua1" />
            </svg>
          </div>
        </li>
        <li>
          <div class="svgspace" title="关闭" @click="closewindow()">
            <svg class="icon svg-icon toolbtn" aria-hidden="true" style="width:13px;height:13px">
              <use xlink:href="#icon-guanbi" />
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ipcRenderer } from "electron";
import { Minimatch } from "minimatch";

export default {
  methods: {
    closewindow() {
      ipcRenderer.send("close");
    },

    minwindow() {
      ipcRenderer.send("minwindow");
    },

    minToTask() {
      ipcRenderer.send("minToTask");
    }
  }
};
</script>


<style scoped>
@import url("../assets/css/header.css");
</style>