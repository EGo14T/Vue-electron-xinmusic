<template>
  <div class="container">
    <table class="music-table" width="100%">
      <tr>
        <th class="custom-th"></th>
        <th>操作</th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr class="custom-tr">
        <td class="td-number">01</td>
        <td></td>
        <td>侧脸</td>
        <td class="td-singer">于果</td>
        <td class="td-album">侧脸</td>
        <td class="td-length">03:59</td>
      </tr>
      <tr class="custom-tr">
        <td class="td-number">02</td>
        <td class="td-operate">
          <svg class="icon svg-icon" aria-hidden="true" style="width:16px;height:16px">
            <use xlink:href="#icon-icon-at" />
          </svg>
          <svg class="icon svg-icon" aria-hidden="true" style="width:16px;height:16px">
            <use xlink:href="#icon-icon-at" />
          </svg>
        </td>
        <td>晴天</td>
        <td class="td-singer">周杰伦</td>
        <td class="td-album">听妈妈的话</td>
        <td class="td-length">03:12</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/css/musiclist.scss";
</style>