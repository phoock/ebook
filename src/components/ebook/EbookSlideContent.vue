<template lang="html">
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
        @click = "showSearchVisible"
        type="text"
        :placeholder="$t('book.searchHint')"
        class="slide-contents-search-input">
      </div>
      <div
      @click = "hideSearchVisible"
      v-if = "searchVisible"
      class="slide-contents-search-cancel">{{$t('book.cancel')}}</div>
    </div>
    <div class="book-wrapper">
      <div class="book-img-wrapper">
        <img :src="cover" class="book-img">
      </div>
      <div class="book-info-wrapper">
        <div class="book-title">{{metadata.title}}</div>
        <div class="book-author">{{metadata.createor}}</div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <div class="progress-text">{{$t('book.haveRead2')}}</div>
        </div>
        <div class="book-time">{{getReadTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ ebookMixin ],
  data() {
    return {
      searchVisible: false
    }
  },
  methods: {
    showSearchVisible() {
      this.searchVisible = true
    },
    hideSearchVisible() {
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/styles/global";
.ebook-slide-contents{
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      display: flex;
      flex: 1;
      @include center;
      .slide-contents-search-icon{
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border:none;
        &:focus{
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    .book-img-wrapper {
      flex: 0 0 px2rem(45);
      .book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .book-info-wrapper {
      flex: 1;
      .book-title {
        font-size: px2rem(14);
      }
      .book-author {
        font-size: px2rem(12);
      }
    }
    .book-progress-wrapper {
      .book-progress {
        .progress {

        }
        .progress-text {

        }
      }
      .book-time {

      }
    }
  }
}
</style>
