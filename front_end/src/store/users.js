import axios from 'axios'
import router from '../router'

const state = {
  user_token: null,
  auth: false
};
const getters = {
  getToken(state) {
    return state.user_token
  },
  getAuth(state) {
    return state.auth
  }

};
const mutations = {
  setToken(state, payload) {
    state.user_token = payload
  },
  setAuth(state) {
    state.auth = true
  },
  logout(state) {
    state.auth = false
    state.user_token = null
    router.push('/login/')
  }
}
const actions = {
  login(context, payload) {
    context.commit('setAction', true)
    context.commit('clearAlert')
    const params = new URLSearchParams()
    params.append('email', payload.email)
    params.append('password', payload.password)
    axios.post('auth/token/login/', params)
      .then(function (response) {
        if (!context.getters.getAlert) {
          context.commit('setToken', response.data.data.id)
          context.commit('setAuth')
          context.commit('setAlert', {
            message: 'Вы успешно вошли!',
            type: 'success'
          })
          setTimeout(() => router.push('/graphic/'), 500)
        }
      })
      .catch(function (error) {
        if (error.request) {
          context.commit('setAlert', {
            message: error.response.data.errors[0].detail,
            type: 'error'
          })
        }
      })
    context.commit('setAction', false)
  },
  register(context, payload) {
    context.commit('setAction', true)
    context.commit('clearAlert')
    const params = new URLSearchParams()
    params.append('email', payload.email)
    params.append('password', payload.password)
    params.append('full_name', payload.fullName)
    params.append('troop_type', payload.troopType)
    axios.post('users/create/', params)
      .catch(function (error) {
        if (error.request) {
          context.commit('setAlert', {
            message: error.response.data.errors[0].detail,
            type: 'error'
          })
        }
      })
      .then(function (response) {
        if (!context.getters.getAlert) {
          router.push('/login/')
        }
      })
    context.commit('setAction', false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
