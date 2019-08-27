import axios from "axios";

const state = {
  yearData: {

  }
}

const getters = {
  getYearData(state) {
    return state.yearData
  }
}

const mutations = {
  setYearData(state, payload) {
    state.yearData = payload
  }
}

const actions = {
  loadYearData(context, payload) {
    context.commit('setAction', true)
    context.commit('clearAlert')
    axios.get('/stats/year/', {
      params: {
        year: 2019
      }
    })
      .catch(function (error) {
        if (error.request) {
          context.commit('setAlert', {
            message: error.response.data.errors[0].detail,
            type: 'error'
          })
          console.log(error.request)
        }
      })
      .then(function (response) {
        if (!context.getters.getAlert) {
          console.log(response.data.data)
          context.commit('setYearData', response.data.data)
        }
      })
    setTimeout(() => context.commit('setAction', false), 1000)

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
