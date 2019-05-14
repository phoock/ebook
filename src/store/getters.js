const getters = {
  fileName: state => state.book.fileName,
  menuVisible: state => state.book.menuVisible,
  settingVisible: state => state.book.settingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  currentBook: state => state.book.currentBook,
  defaultFontFamily: state => state.book.defaultFontFamily,
  fontFamilyVisible: state => state.book.fontFamilyVisible,
  defaultTheme: state => state.book.defaultTheme,
  progress: state=> state.book.progress,
  bookAvailable: state => state.book.bookAvailable,
  section: state => state.book.section,
  cfi: state => state.book.cfi,
  readTime: state => state.book.readTime,
  cover: state => state.book.cover,
  metadata: state => state.book.metadata
}

export default getters
