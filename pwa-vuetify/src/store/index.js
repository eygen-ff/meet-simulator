import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import BotStore from './BotStore.js';
import UserStore from './UserStore.js';

export default new Vuex.Store({
  modules: {
    BotStore, UserStore
  }
})
