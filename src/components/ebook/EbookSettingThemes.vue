<template lang="html">
  <transition name="slide-up">
    <div class="setting-wrapper" v-show=" menuVisible && settingVisible===1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(item.name)">
          <div class="preview"
          :class = "{'selected': item.name === defaultTheme}"
          :style="{background: item.style.body.background}" ></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { themeList, addCss, removeThemeCss } from '@/utils/book.js'
import { ebookMixin } from '@/utils/mixin.js'
import { STsetTheme } from '@/utils/localStorage.js'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      themeList: themeList(this)
    }
  },
  methods: {
    setTheme(themeName) {
      this.setDefaultTheme(themeName).then(()=>{
        //设置主题
        this.currentBook.rendition.themes.select(themeName)
        //设置global主题(先清除以前的样式文件)
        removeThemeCss()
        addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_${themeName.toLowerCase()}.css`)
        //存入缓存
        STsetTheme(this.fileName, themeName)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/styles/global";
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0,0,0,.1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
