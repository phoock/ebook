<template lang="html">
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>

import EbookReader from 'components/ebook/EbookReader.vue'
import EbookTitle from 'components/ebook/EbookTitle.vue'
import EbookMenu from 'components/ebook/EbookMenu.vue'
import { STsetReadTime, STgetReadTime } from '@/utils/localStorage.js'
import { ebookMixin } from '@/utils/mixin.js'

export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.loopReadTask) {
      clearInterval(this.loopReadTask)
    }
  },
  methods: {
    startLoopReadTime() {
      let readTime = 0
      if (STgetReadTime(this.fileName)) {
        readTime = STgetReadTime(this.fileName)
      }
      STsetReadTime(this.fileName, readTime)
      this.loopReadTask = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          STsetReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>
