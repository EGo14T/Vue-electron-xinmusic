<template>
  <div class="slider" ref="slider">
    <div class="process" ref="process" :style="{width}"></div>
    <div class="thunk" ref="trunk" :style="{left}">
      <div class="block"></div>
      <div class="tips">
        <span>{{per}}</span>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
/*
 * min 进度条最小值
 * max 进度条最大值
 * v-model 对当前值进行双向绑定实时显示拖拽进度
 * */
export default {
  props: ["min", "max", "value"],
  data() {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      process:null,
      per: this.value //当前值
    };
  },

  watch: {
	    per : {
	      handler (newVal) {
          console.log("当前"+newVal)
          this.$emit('input', newVal);
        },
        deep:true,
	      immediate: true,
      },
      value : {
	      handler (newVal) {
          this.per = newVal;
          console.log("当前"+newVal)
        },
        deep:true,
	      immediate: true,
	    }
    },


  //渲染到页面的时候
  mounted() {
    this.slider = this.$refs.slider;
    this.thunk = this.$refs.trunk;
    this.process = this.$refs.process;
    var _this = this;


    this.thunk.onmousedown = function(e) {
      var width = parseInt(_this.width);
      var disX = e.clientX;

      
      document.onmousemove = function(e) {
        // value, left, width
        // 当value变化的时候，会通过计算属性修改left，width

        // 拖拽的时候获取的新width
        var newWidth = e.clientX - 247;
        // 拖拽的时候得到新的百分比
        var scale = newWidth / _this.slider.offsetWidth;
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
        _this.per = Math.max(_this.per, _this.min);
        _this.per = Math.min(_this.per, _this.max);
        
      };
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
      };
      
      return false;
    };

    this.process.onclick = function(e){
      var width = parseInt(_this.width);
      var disX = e.clientX;
      e.cancelBubble = true;
      var newWidth = e.clientX-247;
      console.log("process点击到边框的距离"+e.clientX)
      console.log("process点击到dom的距离"+e.offsetX)
      console.log(newWidth);

      var scale = newWidth / 447;
      console.log(scale)
      console.log(Math.ceil((_this.max - _this.min)*scale));
      _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
      _this.per = Math.max(_this.per, _this.min);
      _this.per = Math.min(_this.per, _this.max);


    }

    this.slider.onclick = function(e){
      var width = parseInt(_this.width);
      var disX = e.clientX;
      e.cancelBubble = true;
      var newWidth = e.clientX-247;
      console.log("slider点击到边框的距离"+e.clientX)
      console.log("slider点击到dom的距离"+e.offsetX)
      console.log(newWidth);

      var scale = newWidth / 447;
      console.log(scale)
      console.log(Math.ceil((_this.max - _this.min)*scale));
      _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
      _this.per = Math.max(_this.per, _this.min);
      _this.per = Math.min(_this.per, _this.max);
      
    }

  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left =  slider进度width + trunk宽度/2
    scale() {
      return (this.per - this.min) / (this.max - this.min);
    },
    width() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    }
  }
};
</script>
<style>
.box {
  margin: 100px auto 0;
  width: 80%;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.slider {
  position: relative;
  margin: 20px 0;
  width: 447px;
  height: 4px;
  background:#454546;
  border-radius: 5px;
  cursor:default;
}
.slider .process {
  position: absolute;
  left: 0;
  top: 0;
  height: 4px;
  border-radius: 5px;
  background: #b82525;
}
.slider .thunk {
  position: absolute;
  left: 100px;
  top: -5px;
  width: 14px;
  height: 14px;
}
.slider .block {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  background:#b82525;

  cursor:pointer;

}
.slider .tips {
  position: absolute;
  left: -7px;
  bottom: 30px;
  min-width: 15px;
  text-align: center;
  padding: 4px 8px;
  background: #000;
  border-radius: 5px;
  height: 24px;
  color: #fff;
}
.slider .tips i {
  position: absolute;
  margin-left: -5px;
  left: 50%;
  bottom: -9px;
  font-size: 16px;
  color: #000;
}
</style>
