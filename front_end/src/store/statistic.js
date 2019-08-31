import axios from "axios";

const state = {
  yearData: null
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
  async loadYearData(context, payload) {
    context.commit('setAction', true)
    context.commit('clearAlert')
    await axios.get('/stats/year/', {
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
          context.commit('setYearData', response.data.data)
        }
      })
      .finally(
        context.commit('setAction', false)
      )
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
