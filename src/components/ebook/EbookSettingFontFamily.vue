<template lang="html">
  <transition name="pop-up">
    <div class="setting-font-family" v-show="fontFamilyVisible">
      <div class="title">
        <div class="icon-wrapper">
          <span class="icon-down2" @click="hide"></span>
        </div>
        <div class="text-wrapper">
          <span class="text">{{$t('book.selectFont')}}</span>
        </div>
      </div>
      <div class="list">
        <div class="list-item" @click="setFontFamily(item.font)" v-for="(item, index) in fontFamilyList" keys="index">
          <div class="family-name" :class="{'selected':isSelected(item)}">{{item.font}}</div>
          <div class="select-icon-wrapper">
            <span class="icon-check" v-if="isSelected(item)"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { STsetFontFamily } from '@/utils/localStorage.js'
import { FONT_FAMILY } from '@/utils/book.js'
import { ebookMixin } from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY,
    }

  },
  methods: {
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      if(font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
      //设置缓存
      STsetFontFamily(this.fileName, font)

    },
    isSelected(item) {
      return item.font === this.defaultFontFamily
    },
    hide() {
      this.setFontFamilyVisible()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/styles/global";
.setting-font-family {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 300;
  width: 100%;
  background: #fff;
  .title {
    display: flex;
    position: relative;
    .icon-wrapper {
      position: absolute;
      left: px2rem(15);
      height: 100%;
      @include center;
      .icon {
        font-size: px2rem(14);
      }
    }
    .text-wrapper {
      width: 100%;
      height: 100%;
      padding: px2rem(15);
      box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .15);
      border-bottom: px2rem(1) solid #eee;
      @include center;
      .text {
        font-size: px2rem(14);
      }
    }
  }
  .list {
    .list-item {
      display: flex;
      padding: px2rem(15);
      .family-name {
        flex: 1;
        font-size: px2rem(14);
        @include left;
        &.selected {
          color: #346cb9;
        }
      }
      .select-icon-wrapper {
        flex: 1;
        font-size: px2rem(14);
        color: #346cb9;
        @include right;
      }
    }
  }
}
</style>
