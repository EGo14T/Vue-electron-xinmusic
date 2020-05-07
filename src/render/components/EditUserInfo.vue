<template>
  <div class="container">
    <div class="row1">
      <div class="title">编辑个人信息</div>
    </div>
    <div class="row2">
      <div class="editArea">
        <div>昵称：</div>
        <div>
          <input type="text" class="editInput name" />
        </div>
        <div>介绍：</div>
        <div>
          <textarea class="editInput introduce"></textarea>
        </div>
        <div>性别：</div>
        <div class="genderRadio">
          <div>
            <input class="radio_type" type="radio" id="secret" value="secret" v-model="gender" />
            <label for="secret">保密</label>
          </div>
          <div>
            <input class="radio_type" type="radio" id="male" value="male" v-model="gender" />
            <label for="male">男</label>
          </div>
          <div>
            <input class="radio_type" type="radio" id="female" value="female" v-model="gender" />
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
                    <div class="option" @click="setDate('y',item.value)">{{item.label}}</div>
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
                    <div class="option" @click="setDate('m',item.value)">{{item.label}}</div>
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
                    <div class="option" @click="setDate('d',item.value)">{{item.label}}</div>
                  </div>
                </div>
              </myScroll>
            </div>
          </div>
        </div>
        <div>地区：</div>
      </div>
      <div class="avatar"></div>
    </div>
  </div>
</template>

<script>
export default {

  mounted() {
    document.addEventListener("click", e => {
      if (
        typeof e.target.className == "string" &&
        e.target.className.indexOf("Label") == -1
      ) {
        this.showYear = false;
        this.showMonth = false;
        this.showDay = false;
      }
    });
  },

  computed: {
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
      for (var i = 1; i <= 30; i++) {
        var dayItem = {};
        dayItem.value = i;
        dayItem.label = i + "日";
        dayList.push(dayItem);
      }
      return dayList;
    }
  },
  data() {
    return {
      gender: "", //性别 0保密 1男 2女
      showYear: false,
      showMonth: false,
      showDay: false,
      u_year: 1998,
      u_month: 12,
      u_day: 20
    };
  },

  methods: {
    showSelect(type) {
      if (type == "y") {
        this.showYear = !this.showYear;
        this.showMonth = false;
        this.showDay = false;
      } else if (type == "m") {
        this.showYear = false;
        this.showMonth = !this.showMonth;
        this.showDay = false;
      } else if (type == "d") {
        this.showYear = false;
        this.showMonth = false;
        this.showDay = !this.showDay;
      }
    },

    setDate(type, value) {
      if (type == "y") {
        this.u_year = value;
        this.showYear = false;
      } else if (type == "m") {
        this.u_month = value;
        this.showMonth = false;
      } else if (type == "d") {
        this.u_day = value;
        this.showDay = false;
      }
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

      .date_select {
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
    }

    .avatar {
      height: 200px;
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