<template lang="html">
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible===3">
      <transition name="fade-slide-right">
        <div class="content" v-show="settingVisible===3">
          <div class="content-page-wrapper">
            <div class="content-page">
              <component :is="currentTab===1?'ContentCpt':'BookmarkCpt'"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item"
              :class = "{'selected':currentTab === 1}"
              @click = "selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div class="content-page-tab-item"
              :class = "{'selected':currentTab === 2}"
              @click = "selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hide"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSlideContent from '@/components/ebook/EbookSlideContent.vue'
import EbookSlideBookmark from '@/components/ebook/EbookSlideBookmark.vue'
export default {
  mixins: [ ebookMixin ],
  components: {
    ContentCpt: EbookSlideContent,
    BookmarkCpt: EbookSlideBookmark
  },
  data() {
    return {
      currentTab: 1
    }
  },
  methods: {
    hide() {
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
    },
    selectTab(key) {
      this.currentTab = key
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/styles/global";
.slide-content-wrapper {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  .content {
    flex: 0 0 85%;
    height: 100%;
    width: 85%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        height: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        flex: 0 0 px2rem(48);
        height:px2rem(48);
        width: 100%;
        display: flex;
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          @include center;
        }
      }
    }
  }
  .content-bg{
    flex: 0 0 15%;
    width: 15%;
    height: 100%
  }
}
</style>
