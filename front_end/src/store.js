import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import events from './store/events'
import statistic from './store/statistic'
import users from './store/users'
import status from './store/status'
import profile from "./store/profile";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    events,
    statistic,
    users,
    status,
    profile
  },
  plugins: [createPersistedState({
    key: 'users',
    paths: ['users']
  })],
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
