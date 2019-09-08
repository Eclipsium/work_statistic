const state = {
  user_id: null,
  email: null,
  full_name: null,
  troop_type: null
}
const getters = {
  getProfile(state) {
    return {
      'id': state.user_id,
      'email': state.email,
      'full_name': state.full_name,
      'troop_type': state.troop_type
    }
  }
}
const mutations = {
   setProfile(state, payload) {
    state.user_id = payload.user_id
    state.email = payload.email
    state.full_name = payload.full_name
    state.troop_type = payload.troop_type
  },
}
const actions = {
  async loadProfile(context) {
    context.commit('setAction', true)
    await axios.get(('/users/get/'))
      .catch(function (error) {
        console.log(error)
      })
      .then(function (response) {
        let data = response.data.data[0]
        let payload = data.attributes
        payload.user_id = data.id
        context.commit('setProfile', payload)
      })
      .finally(context.commit('setAction', false))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
