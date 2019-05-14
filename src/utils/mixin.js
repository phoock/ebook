import { mapGetters, mapActions } from 'vuex'
import { STsetLocationInfo, STgetReadTime } from '@/utils/localStorage.js'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'currentBook',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'cfi',
      'cover',
      'metadata'
    ]),
    getReadTime() {
      let timeCount = STgetReadTime(this.fileName)
      let timeMinutes = Math.ceil(timeCount / 60)
      return this.$t('book.haveRead').replace('$1', timeMinutes)
    },
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setProgress',
      'setBookAvailable',
      'setSection',
      'setCfi',
      'setCover',
      'setMetadata'
    ]),
    getLocationInfo() {
      let locationInfo = {
        cfi:'',
        progress: 0,
        section: 0
      }
      //通过rendition的currentLocation()方法获取当前信息
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start && currentLocation.start.cfi) {
        //设置cfi
        locationInfo.cfi = currentLocation.start.cfi
        //设置progress
        let progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
        locationInfo.progress = Math.floor(progress * 100)
      }
      if (currentLocation && currentLocation.start && currentLocation.start.index) {
        locationInfo.section = currentLocation.start.index
      }
      return locationInfo
    }
  }
}
