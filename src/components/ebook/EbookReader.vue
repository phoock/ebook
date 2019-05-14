<template lang="html">
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import {
  STgetFontFamily,
  STgetFontSize,
  STgetTheme,
  STsetLocationInfo,
  STgetLocationInfo } from '@/utils/localStorage.js'
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin.js'
import { themeList, addCss } from '@/utils/book.js'
global.ePub = Epub
const baseUrl = `${process.env.VUE_APP_RES_URL}/epub/`

export default {
  mounted() {
    let fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  },
  data() {
    return {
      themeList: themeList(this)
    }
  },
  mixins: [ ebookMixin ],
  methods: {
    initThemeStyle() {
      //根据themeList注册主题样式
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })

      //选择一个默认的主题样式
      this.rendition.themes.select(this.defaultTheme)
    },
    prev() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          let locationInfoObj = this.getLocationInfo()
          STsetLocationInfo(this.fileName, locationInfoObj)
        })
        this.hideMenuTitleBar()
      }
    },
    next() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          let locationInfoObj = this.getLocationInfo()
          STsetLocationInfo(this.fileName, locationInfoObj)
        })
        this.hideMenuTitleBar()
      }
    },
    toggleMenuTitleBar() {
      this.setFontFamilyVisible(false)
      this.setSettingVisible(-1)
      this.setMenuVisible(!this.menuVisible)
    },
    hideMenuTitleBar() {
      this.setFontFamilyVisible(false)
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
    },
    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      //渲染book到页面,并在渲染完成以后读取缓存,后设置初始状态
      //获取缓存中cfi信息
      let cfi = STgetLocationInfo(this.fileName).cfi || ''
      this.rendition.display(cfi).then(() => {
        //注册主题样式
        this.initThemeStyle()
        //读取缓存数据并设置
        this.loadStorage()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
          console.log('字体全部加载完成')
        })
      })
    },
    initGestrue() {
      this.rendition.on('touchstart', (e) => {
        this.startOffset = e.targetTouches[0].clientX
        this.startTime = e.timeStamp
      })
      this.rendition.on('touchend', (e) => {
        let touchOffset = e.changedTouches[0].clientX - this.startOffset
        let touchTime = e.timeStamp - this.startTime

        // 大于40位移量和500ms时,翻页.否则toggle menuTitleBar
        if (touchOffset > 40 && touchTime < 500) {
          this.prev()
        } else if (touchOffset < -40 && touchTime < 500) {
          this.next()
        } else {
          this.toggleMenuTitleBar()
        }
        e.stopPropagation()
        e.preventDefault()
      })
    },
    loadStorage() {
      //获取缓存中的fontFamily,并设置字体种类
      let fontFamily = STgetFontFamily(this.fileName) || 'Default'

      this.setDefaultFontFamily(fontFamily)
      this.rendition.themes.font(fontFamily)

      //获取缓存中的fontSize,并设置字体大小
      let fontSize = STgetFontSize(this.fileName) || 16
      this.setDefaultFontSize(fontSize)
      this.rendition.themes.fontSize(fontSize)

      //获取缓存中的themeName,并设置主题,以及全局主题
      let theme = STgetTheme(this.fileName)
      this.setDefaultTheme(theme)
      this.rendition.themes.select(theme)
      addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_${theme.toLowerCase()}.css`)

      //获取缓存中的locationInfo,并同步vuex中的cfi,progress(进度条),section(章节号)
      let locationInfoObj = STgetLocationInfo(this.fileName)
      this.setProgress(locationInfoObj.progress)
      this.setSection(locationInfoObj.section)
    },
    parseBook() {
      this.book.loaded.cover.then(res => {
        this.book.archive.createUrl(res).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(res => {
        this.setMetadata(res)
      })
    },
    initEpub() {
      let ebookUrl = `${baseUrl}${this.fileName}.epub`
      this.book = new Epub(ebookUrl)
      // 将book对象缓存到vuex中
      this.setCurrentBook(this.book)
      //初始化rendition
      this.initRendition()
      //初始化手势
      this.initGestrue()
      //解析书籍信息(作者,封面,简介等)
      this.parseBook()
      //生成分页信息
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (STgetFontSize(this.fileName) / 16))
      }).then(res => {
        // console.log(res)
        this.setBookAvailable(true)
      })
    }

  }
}
</script>

<style lang="scss" rel="stylesheet/css" scoped>
@import "../../assets/styles/global";
</style>
