<template>
  <div class="sgy-marquee" :data-guid="guid">
    <p :class="myClass">
      <template v-if="$slots.default">
        <i class="real-text"><slot></slot></i>
        <i class="text" :style="`visibility: ${isMarquee ? 'visible': 'hidden'}`">
          {{this.$slots.default[0].text}}
        </i>
      </template>
      <template v-else>
        <i v-html="html"></i><i class="text" :style="`visibility: ${isMarquee ? 'visible': 'hidden'}`" v-html="html"></i>
      </template>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    hover: {
      type: Boolean,
      default: false
    },
    html: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      guid: "",
      textWidth: 0,
      offsetWidth: 0
    };
  },
  computed: {
    isMarquee() {
      return (this.textWidth - 80) / 2 > this.offsetWidth;
    },
    myClass() {
      if (this.isMarquee) {
        return this.hover ? "is-hover-marquee" : "is-marquee";
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 避免样式覆盖
      this.guid = this.guidFunc();
      this.$nextTick(() => {
        this.textWidth = document.querySelector(
          `.sgy-marquee[data-guid="${this.guid}"]`
        ).scrollWidth;
        this.offsetWidth = document.querySelector(
          `.sgy-marquee[data-guid="${this.guid}"]`
        ).offsetWidth;
        this.initCss();
      });
    },
    guidFunc() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        let r = (Math.random() * 16) | 0;
        let v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    initCss() {
      let cssText = `
      .sgy-marquee[data-guid="${this.guid}"] .is-marquee {
        animation: marquee-${this.guid} ${this.textWidth /
        200}s linear infinite;
      }
      .sgy-marquee[data-guid="${this.guid}"] .is-hover-marquee:hover {
        animation: marquee-${this.guid} ${this.textWidth /
        200}s linear infinite;
      }
      @keyframes marquee-${this.guid} {
        0% {
          transform: translateX(0px);
        }
        100% {
          transform: translateX(${-this.textWidth / 2 - 40}px);
        }
      }`;
      this.insertCss(cssText);
    },
    insertCss(cssText) {
      let head = document.head || document.getElementsByTagName("head")[0];
      let style = document.createElement("style");
      style.type = "text/css";
      let textNode = document.createTextNode(cssText);
      style.appendChild(textNode);
      head.appendChild(style);
    }
  }
};
</script>

<style scoped lang="less" style="text/less">
.sgy-marquee {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  > p {
    display: inline-block;
  }
  .text {
    padding-left: 80px;
  }
}
</style>