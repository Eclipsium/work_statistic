const state = {
  on_action: false,
  alert: null
}
const getters = {
  getAlert() {
    return state.alert
  },
  getAction() {
    return state.on_action
  }
}
const mutations = {
  setAlert(state, payload) {
    state.alert = payload
  },
  clearAlert(state) {
    state.alert = null
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
