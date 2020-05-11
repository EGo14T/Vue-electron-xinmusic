<template>
  <div class="container">
    <div class="row1">
      <div class="title">编辑个人信息</div>
    </div>
    <div class="row2">
      <div class="editArea">
        <div>昵称：</div>
        <div>
          <input type="text" class="editInput name" v-model="userInfo.name" />
        </div>
        <div>介绍：</div>
        <div>
          <textarea class="editInput introduce" v-model="userInfo.introduce"></textarea>
        </div>
        <div>性别：</div>
        <div class="genderRadio">
          <div>
            <input class="radio_type" type="radio" id="secret" value="0" v-model="userInfo.gender" />
            <label for="secret">保密</label>
          </div>
          <div>
            <input class="radio_type" type="radio" id="male" value="1" v-model="userInfo.gender" />
            <label for="male">男</label>
          </div>
          <div>
            <input class="radio_type" type="radio" id="female" value="2" v-model="userInfo.gender" />
            <label for="female">女</label>
          </div>
          <div></div>
        </div>
        <div>生日：</div>
        <div class="date_select">
          <div class="Select">
            <div class="Label year" @click="showSelect('y')">{{u_year + '年'}}</div>
            <div class="optionSelect year" v-show="showYear">
              <myScroll>
                <div class="selectOptions">
                  <div v-for="item in year">
                    <div class="option" @click="setValue('y',item.value)">{{item.label}}</div>
                  </div>
                </div>
              </myScroll>
            </div>
          </div>
          <div class="Select">
            <div class="Label month" @click="showSelect('m')">{{u_month + '月'}}</div>
            <div class="optionSelect month" v-show="showMonth">
              <myScroll>
                <div class="selectOptions">
                  <div v-for="item in month">
                    <div class="option" @click="setValue('m',item.value)">{{item.label}}</div>
                  </div>
                </div>
              </myScroll>
            </div>
            <div></div>
          </div>
          <div class="Select">
            <div class="Label day" @click="showSelect('d')">{{u_day + '日'}}</div>
            <div class="optionSelect day" v-show="showDay">
              <myScroll>
                <div class="selectOptions">
                  <div v-for="item in day">
                    <div class="option" @click="setValue('d',item.value)">{{item.label}}</div>
                  </div>
                </div>
              </myScroll>
            </div>
          </div>
        </div>
        <div>地区：</div>
        <div class="area_select">
          <div class="Select">
            <div class="Label province" @click="showSelect('p')">{{u_province}}</div>
            <div class="optionSelect province" v-show="showProvince">
              <myScroll>
                <div class="selectOptions">
                  <div v-for="item in province">
                    <div class="option" @click="setValue('p',item.value)">{{item.label}}</div>
                  </div>
                </div>
              </myScroll>
            </div>
          </div>
          <div class="Select">
            <div class="Label city" @click="showSelect('c')">{{u_city}}</div>
            <div class="optionSelect city" v-show="showCity">
              <myScroll>
                <div class="selectOptions">
                  <div v-for="item in city">
                    <div class="option" @click="setValue('c',item.value)">{{item.label}}</div>
                  </div>
                </div>
              </myScroll>
            </div>
          </div>
        </div>
        <div></div>
        <div class="submit">
          <input type="button" class="btn save" @click="saveInfo()" value="保存" />
          <input type="button" class="btn cancle" @click="cancleEdit()" value="取消" />
        </div>
      </div>
      <div class="avatar">
        <img :src="avatarURL" width="177px" height="177px" draggable="false" />
        <div class="upload">
          <el-upload
            ref="editUpload"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="upload"
            :limit="1"
          >
            <button class="loadAvatar">修改头像</button>
          </el-upload>
        </div>
      </div>
    </div>
    <uploadAvatar :visible.sync="dialogVisible"></uploadAvatar>
  </div>
</template>

<script>
import province from "../utils/country-level2-data";

import UploadAvatar from "./UploadAvatar";

import * as types from "../store/types";

import { mapGetters } from "vuex";

export default {
  components: {
    uploadAvatar: UploadAvatar
  },

  created() {
    this.initInfo();
  },

  mounted() {
    document.addEventListener("click", e => {
      if (
        typeof e.target.className == "string" &&
        e.target.className.indexOf("Label") == -1
      ) {
        this.showYear = false;
        this.showMonth = false;
        this.showDay = false;
        this.showProvince = false;
      }
    });
  },

  computed: {
    ...mapGetters({
      imgUrl: "get_select_img",
      avatarURL: "get_avatar_url",
      userid: "get_user_id"
    }),

    year: function() {
      var date = new Date();
      var year = date.getFullYear();
      var yearList = [];
      for (var i = year - 100; i <= year; i++) {
        var yearItem = {};
        yearItem.value = i;
        yearItem.label = i + "年";
        yearList.push(yearItem);
      }
      return yearList;
    },

    month: function() {
      var monthList = [];
      for (var i = 1; i <= 12; i++) {
        var monthItem = {};
        monthItem.value = i;
        monthItem.label = i + "月";
        monthList.push(monthItem);
      }
      return monthList;
    },

    day: function() {
      var dayList = [];
      var j = new Date(this.u_year, this.u_month, 0).getDate();
      for (var i = 1; i <= j; i++) {
        var dayItem = {};
        dayItem.value = i;
        dayItem.label = i + "日";
        dayList.push(dayItem);
      }
      return dayList;
    },

    province: function() {
      return province;
    },

    city: function() {
      var city = this.getDataName(
        province,
        "value",
        "children",
        this.u_province
      );
      return city;
    }
  },
  data() {
    return {

      showYear: false,
      showMonth: false,
      showDay: false,
      showProvince: false,
      showCity: false,
      u_year: 1998,
      u_month: 12,
      u_day: 20,
      u_province: "",
      u_city: "",

      userInfo: {
        id: "",
        name: "",
        gender: "", //性别 0保密 1男 2女
        introduce: "",
        birth: "",
        area: "",
      },

      dialogVisible: false,

      flieList: [],
      fileinfo: "",
      img: ""
    };
  },

  methods: {
    initInfo() {
      var userInfo = JSON.parse(localStorage.user);
      var birth = new Date(userInfo.birth);
      var areaReg = /新疆|宁夏|西藏|.+?(省|市|澳门|区|县|盟|自治州)|香港|澳门/g;

      //id 昵称 介绍 性别
      this.userInfo.id = userInfo.id;
      this.userInfo.name = userInfo.name;
      this.userInfo.introduce = userInfo.introduce;
      this.userInfo.gender = userInfo.gender;
      //出生年月日
      this.u_year = birth.getFullYear();
      this.u_month = birth.getMonth() + 1;
      this.u_day = birth.getDate();
      //所在地
      this.u_province = userInfo.area.match(areaReg)[0];
      this.u_city = userInfo.area.match(areaReg)[1];
    },

    showSelect(type) {
      switch (type) {
        case "y":
          this.showYear = !this.showYear;
          this.showMonth = false;
          this.showDay = false;
          break;

        case "m":
          this.showYear = false;
          this.showMonth = !this.showMonth;
          this.showDay = false;
          break;

        case "d":
          this.showYear = false;
          this.showMonth = false;
          this.showDay = !this.showDay;
          break;

        case "p":
          this.showProvince = !this.showProvince;
          this.showCity = false;
          break;

        case "c":
          this.showProvince = false;
          this.showCity = !this.showCity;
          break;
      }
    },

    setValue(type, value) {
      switch (type) {
        case "y":
          this.u_year = value;
          this.u_day = 1;
          this.showYear = false;
          break;

        case "m":
          this.u_month = value;
          this.u_day = 1;
          this.showMonth = false;
          break;

        case "d":
          this.u_day = value;
          this.showDay = false;
          break;

        case "p":
          this.u_province = value;
          this.u_city = this.city[0]["value"];
          this.showProvince = false;
          break;

        case "c":
          this.u_city = value;
          this.showCity = false;
          break;
      }
    },

    upload(file, fileList) {
      console.log("11111");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.dialogVisible = true;
        this.$refs.editUpload.clearFiles();
        this.$store.commit(types.SET_IMG, "");
      } else {
        this.fileinfo = file;
        this.$nextTick(() => {
          this.$refs.editUpload.clearFiles();
          this.$store.commit(types.SET_IMG, file.raw.path);
          this.dialogVisible = true;
        });
      }
    },

    saveInfo() {
      this.userInfo.id = this.userid;
      let month = this.u_month<10?'0'+this.u_month:this.u_month;
      let day = this.u_day<10?'0'+this.u_day:this.u_day;
      this.userInfo.birth = this.u_year +'-' + month + '-' + day;
      this.userInfo.area = this.u_province + this.u_city;
      this.patchRequest('/users/UserInfo',true,this.userInfo).then(resp => {
        console.log(resp)
        if(resp.data){
          this.$store.commit(types.SET_USERINFO,resp.data.data);
          this.$message.success("更新信息成功！")
        }
      })
      
      
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 25px;
  margin: 0;
  .row1 {
    padding-bottom: 6px;
    border-bottom: 1px solid #23262c;
    .title {
      font-size: 18px;
      font-weight: 500;

      color: #dcdde4;
    }
  }

  .row2 {
    display: grid;
    grid-template-columns: 4fr 3fr;
    height: 350px;

    .editArea {
      padding-top: 40px;
      height: 200px;
      display: grid;
      grid-template-columns: 1fr 3fr;
      row-gap: 25px;

      & > div:nth-child(odd) {
        font-size: 12px;
        color: #5f5f63;
      }

      .editInput {
        background: #25272b;
        border: none;
        width: 100%;
        outline: none;
        color: #828385;
        padding-left: 10px;
        font-size: 12px;
        &:focus {
          color: #dcdde4;
        }
      }

      .name {
        height: 25px;
      }

      .introduce {
        resize: none;
        height: 75px;
      }

      .genderRadio {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 3fr;
        color: #5f5f63;
        font-size: 12px;

        .radio_type {
          vertical-align: middle;
          margin-top: -6px;

          appearance: none;
          position: relative;
          outline: none;

          &:before {
            content: "";
            width: 16px;
            height: 16px;
            border: 1px solid #7d7d7d;
            display: inline-block;
            border-radius: 50%;
            vertical-align: middle;
          }

          &:checked:before {
            content: "";
            width: 16px;
            height: 16px;
            display: inline-block;
            border-radius: 50%;
            vertical-align: middle;
          }

          &:checked:after {
            content: "";
            width: 6px;
            height: 5px;
            border-radius: 50%;
            background-color: #b82525;
            text-align: center;
            display: block;
            position: absolute;
            top: 9px;
            left: 5px;
          }
        }

        label {
          margin-left: 5px;
        }
      }

      .date_select,
      .area_select {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 2fr;
        .Label {
          background: #25272b;
          color: #dcdde4;
          padding-left: 10px;
          height: 23px;
          font-size: 12px;
          line-height: 23px;
        }

        .year {
          width: 75px;
          border-radius: 3px;
        }

        .month {
          width: 55px;
          margin-left: 10px;
          border-radius: 3px;
        }

        .day {
          width: 55px;
          margin-left: 5px;
          border-radius: 3px;
        }

        .province {
          width: 100px;
          border-radius: 3px;
        }

        .city {
          width: 160px;
          margin-left: 10px;
          border-radius: 3px;
        }

        .optionSelect {
          background: #25272b;
          margin-top: 2px;
          color: #dcdde4;
          font-size: 12px;
          line-height: 23px;
          position: absolute;
          .selectOptions {
            position: relative;
            max-height: 210px;

            .option {
              padding-left: 10px;
              margin-right: 18px;
              color: #828385;

              &:hover {
                background: #2a2c30;
                color: #d0dde4;
              }
            }
          }
        }
      }

      .submit {
        .btn {
          font-size: 16px;
          font-weight: 400;
          width: 80px;
          height: 30px;
          border-radius: 5px;
          border: 0;
          padding: 0;
          margin-top: 60px;
          &:hover {
            cursor: pointer;
          }
        }

        .save {
          background: #2e4e7e;
          color: #ffffff;

          margin-right: 20px;
        }

        .cancle {
          background: #25272b;
          color: #dcdde4;
        }
      }
    }

    .avatar {
      padding-top: 40px;
      text-align: center;

      .upload {
        margin: 15px 0;
        .loadAvatar {
          font-size: 11px;
          font-weight: 400;
          width: 99px;
          height: 29px;
          border-radius: 5px;
          letter-spacing: 1px;
          border: 0;
          color: #dcdde4;
          background: #25272b;
          cursor: pointer;

          &:hover {
            color: #e2e2e2;
            background: #2c2e32;
          }
        }
      }
    }
  }

  ::-webkit-scrollbar {
    position: absolute;
    left: 20px;
    width: 8px;
    &:hover {
      cursor: pointer;
    }
  }
  /*定义滚动条的轨道，内阴影及圆角*/
  ::-webkit-scrollbar-track {
    border-radius: 0px;
    background-color: #25272b;
  }
  /*定义滑块，内阴影及圆角*/
  ::-webkit-scrollbar-thumb {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #3d3f43;
    &:hover {
      background-color: #484a4e;
    }
  }
}
</style>