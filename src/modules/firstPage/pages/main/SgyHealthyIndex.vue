<template>
 <div class="enviroment">
    <p class="heal-index"> 室内平均温度</p>
    <div class="healthy-index" v-if="innerTdb">
       <span class="unitValue" :style="`left:${left}px`">{{innerTdb==null?"--":innerTdb.toFixed(1)}}</span>
       <reference :refer-list="referenceObj['Tdb'].list" :unitText="referenceObj['Tdb'].unitText"></reference>
    </div>
    <p class="outside-tp tips">室内环境</p>
    <div class="outside-div">
      <div class="outside">
        <p>温度</p>
        <p>{{innerTdb==null?"--":innerTdb.toFixed(1)}} ℃</p>
      </div>
      <div class="outside"> 
        <p>湿度</p>
        <p>{{innerRH==null?"--":innerRH.toFixed(1)}} % </p>
      </div>
      <div class="outside">
        <p>PM2.5</p>
        <p>{{innerPM==null?"--":innerPM.toFixed(1)}}</p>
      </div>
    </div>
 </div>
</template>

<script>
var axios = require("axios");
import reference from '../../../environment/component/reference.vue'
export default {
  components: {
    reference
  },
  mixins: [],
  props: {
    width: {
      type: String,
      default: "66px"
    },
    colors: {
      type: Array,
      default: function() {
        return ["#f58788", "#f8b95c", "#77d99b", "#4fa0f6"];
      }
    },
    innerValue: {
      type: Number,
      default: 40
    },
    outerValue: {
      type: Number,
      default: 50
    },
    innerC: 0,
    innerRH: 0,
    innerPM: 0,
    innerTdb: 0
  },
  data() {
    return {
      minValue: 0,
      maxValue: 100,
       referenceObj: {
      //温度
      Tdb: {
        unitText: "℃",
        // 热列表
        list: [
          {
            value: 20,
            color: "#7D40CC"
          },
          {
            value: 22,
            color: "#465CCC"
          },
          {
            value: 24,
            color: "#328E2A"
          },
          {
            value: 26,
            color: "#62C85E"
          },
          {
            value: 28,
            color: "#ECF911"
          },
          {
            value: 30,
            color: "#FFB711"
          },
          {
            value: 32,
            color: "#FF3E13"
          }
        ]
      }
      }
    };
  },
  computed: {
    left(){
      return 21.6 * (this.innerTdb - 20) + 20
    }
  },
  mounted() {
    //this.getData();
  },
  methods: {
    // 返回指针对象
    pointer(currentValue) {
      const itemWidth = parseFloat(this.width);
      // 占比
      const per =
        (currentValue - this.minValue) / (this.maxValue - this.minValue);
      const left = per * (itemWidth * this.colors.length);
      const index = this.index(currentValue);
      return {
        left: `${left + 4 * index}px`,
        color: this.colors[index]
      };
    },
    // 位于第几个
    index(currentValue) {
      let index =
        Math.ceil((parseFloat(currentValue) / 100) * this.colors.length) - 1;
      index = index === -1 ? 0 : index;
      return index;
    }
  }
};
</script>

<style scoped lang="less" >
.heal-index {
  padding-left: 20px;
  padding-top: 20px;
  color: #3b4254;
}
.outside-tp {
  margin: 16px 20px;
  color: #3B4254;
  span:first-child {
    display: inline-block;
    width: 137px;
  }
}
.outside-div{
  display: flex;
  justify-content:space-evenly;
  p{
    line-height: 30px;
  }
}
.healthy-index {
  display: flex;
  align-items: center;
  padding: 32px 0;
  margin:0 20px;
  height: 108px;
  border-bottom: 1px solid #E6E7EC;
  .unitValue{
     display: inline-block;
     text-align: center;
     color: #62697B ;
     position: relative;
     top: -25px;
     &::after {
        content: '▼';
        display: block;
     }
  }
  .healthy-mark {
    position: relative;
    .inner,
    .outer {
      position: absolute;
      left: -3px; // 抵消三角形的边距
      top: -8px;
      width: 0;
      height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 5px solid; /*--三角形的高--*/
      span {
        position: absolute;
        display: inline-block;
        top: -24px;
        left: -12px;
        width: 100px;
      }
    }
    .outer {
      top: 15px;
      border-top: none;
      border-bottom: 5px solid; /*--三角形的高--*/
      span {
        position: absolute;
        display: inline-block;
        top: 6px;
        left: -12px;
        width: 100px;
      }
    }
    .mid {
      ul.rectangle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          margin-right: 4px;
          height: 12px;
          border-radius: 1px;
        }
      }
    }
  }
}
</style>