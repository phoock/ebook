import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import { STgetLocale, STsaveLocale } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en,
  cn
}

//取缓存里的locale信息,如果没有则新建一个
let locale = STgetLocale()
if (!locale) {
  locale = 'cn'
  STsaveLocale(locale)
}

const i18n = new VueI18N({
  locale,
  messages
})

export default i18n
