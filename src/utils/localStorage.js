import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

//封装工具函数
export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(fileName)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(fileName, book)
}

export function getBookObject(fileName, key) {
  let book = getLocalStorage(fileName)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

//fontFamily相关
export function STsetFontFamily(fileName, fontFamily) {
  // let book = getLocalStorage(fileName)
  // if( !book ) {
  //   book = {}
  // }
  // book['fontFamily'] = fontFamily
  // setLocalStorage(fileName, book)
  setBookObject(fileName, 'fontFamily', fontFamily)
}
export function STgetFontFamily(fileName) {
  // if( getLocalStorage(fileName) ) {
  //   return getLocalStorage(fileName).fontFamily || 'Default'
  // } else {
  //   return 'Default'
  // }
  return getBookObject(fileName, 'fontFamily')
}

//fontSize相关
export function STsetFontSize(fileName, fontSize) {
  // let book = getLocalStorage(fileName)
  // if( !book ) {
  //   book = {}
  // }
  // book['fontSize'] = fontSize
  // setLocalStorage(fileName, book)
  setBookObject(fileName, 'fontSize', fontSize)
}
export function STgetFontSize(fileName) {
  // if( getLocalStorage(fileName) ) {
  //   return getLocalStorage(fileName).fontSize || 16
  // } else {
  //   return 16
  // }
  return getBookObject(fileName, 'fontSize')
}

//locale 国际化相关
export function STgetLocale() {
  return getLocalStorage('locale')
}

export function STsaveLocale(lang) {
  return setLocalStorage('locale', lang)
}

//theme 相关
export function STgetTheme(fileName) {
  return getBookObject(fileName, 'themeName')
}

export function STsetTheme(fileName, themeName) {
  setBookObject(fileName, 'themeName', themeName)
}

//location 阅读进度相关(要记录cfi,progress,section)
export function STsetLocationInfo(fileName, locationInfoObj) {
  setBookObject(fileName, 'cfi', locationInfoObj.cfi)
  setBookObject(fileName, 'progress', locationInfoObj.progress)
  setBookObject(fileName, 'section', locationInfoObj.section)
}
export function STgetLocationInfo(fileName) {
  let locationInfoObj = {}
  locationInfoObj.cfi = getBookObject(fileName, 'cfi')
  locationInfoObj.progress = getBookObject(fileName, 'progress')
  locationInfoObj.section = getBookObject(fileName, 'section')
  return locationInfoObj
}

//readTime 阅读时间
export function STsetReadTime(fileName, readTime) {
  setBookObject(fileName, 'readTime', readTime)
}
export function STgetReadTime(fileName) {
  return getBookObject(fileName, 'readTime')
}
