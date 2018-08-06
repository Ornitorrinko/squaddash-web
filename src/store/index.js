import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  modules,
  actions,
  state,
  mutations
})

export default store
