import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book
  },
  getters,
  actions
})
