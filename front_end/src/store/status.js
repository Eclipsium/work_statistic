const state = {
  on_action: false,
  message: null
}
const getters = {
  getAlert(state) {
    return state.message
  },
  getAction(state) {
    return state.on_action
  }
}
const mutations = {
  setAlert(state, payload) {
    state.message = payload
  },
  clearAlert(state) {
    state.message = null
  },
  setAction(state, payload) {
    state.on_action = payload
  }
}
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
