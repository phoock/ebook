<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTime}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="prevSection()">
            <span class="icon-back"></span>
          </div>
          <input class="progress" type="range"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { STsetLocationInfo, STgetReadTime } from '@/utils/localStorage.js'
  export default {
    updated() {
      this.updateProgressBG()
    },
    mixins: [ebookMixin],
    computed: {

      getSectionName() {
        if (this.section) {
          const sectionInfo = this.currentBook.section(this.section)
          if (sectionInfo && sectionInfo.href && this.currentBook && this.currentBook.navigation) {
            return this.currentBook.navigation.get(sectionInfo.href).label || ''
          }
        }
        return ' '
      }
    },
    methods: {
      onProgressChange(progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress()
          this.updateProgressBG()
        })
      },
      displayProgress() {
        //通过百分比得到一个cfi
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        //通过这个cfi获得章节信息
        const section = this.currentBook.spine.get(cfi)
        this.setSection(section.index)

        //将这个位置信息渲染出来,渲染完以后保存位置信息
        this.currentBook.rendition.display(cfi).then(() => {
          //获取位置信息
          let locationInfo = this.getLocationInfo()
          //将位置信息保存到本地
          STsetLocationInfo(this.fileName, locationInfo)
        })
      },
      onProgressInput(progress) {
        this.setProgress(progress).then(() => {
          this.updateProgressBG()
        })
      },
      updateProgressBG() {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      prevSection() {
        if (this.section > 0 && this.bookAvailable) {
          this.setSection(this.section - 1).then(() => {
            this.displaySection()
          })
        }
      },
      nextSection() {
        if (this.section < this.currentBook.spine.length && this.bookAvailable) {
          this.setSection(this.section + 1).then(() => {
            this.displaySection()
          })
        }
      },
      displaySection() {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          this.currentBook.rendition.display(sectionInfo.href).then(() => {
            //同步progress
            this.refreshProgress()
            //将位置信息缓存到本地
            let locationInfo = this.getLocationInfo()
            STsetLocationInfo(this.fileName, locationInfo)
          })
        }
      },
      refreshProgress() {
        const currentLocation = this.currentBook.rendition.currentLocation()
        // let progress = currentLocation.start.percentage
        // console.log(1,currentLocation.start.percentage)
        let progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
        this.setProgress(Math.floor(progress * 100))
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 160;
    width: 100%;
    height: px2rem(90);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        font-size: px2rem(12);
        @include center;
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress-icon-wrapper {
          font-size: px2rem(20);
        }
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(10);
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          @include ellipsis;
        }
      }
    }
  }
</style>
