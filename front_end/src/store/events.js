import axios from 'axios'

const state = {
  events: {}
}
const getters = {
  getEvents(state) {
    return state.events
  }
}
const mutations = {
  addEvent(state, payload) {
    state.events[payload.date] = {
      'id': payload.id,
      'workTime': payload.workTime,
      'workType': payload.workType,
      'name': payload.name
    }
  },
  delEvent(state, payload) {
    state.events[payload.date] = null
  }
}
const actions = {
  async loadEvents(context, payload) {
    context.commit('setAction', true)
    await axios.get('/events/list/')
      .then(function (response) {
        for (let i in response.data.data) {
          context.commit('addEvent', response.data.data[i])
        }
      })
      .catch(function (error) {
        if (error.request) {
          console.log(error.request)
        }
      })
      .finally(
      context.commit('setAction', false)
      )
  },
  async pushEvent(context, payload) {
    context.commit('setAction', true)
    const params = new URLSearchParams()
    params.append('date', payload.date)
    params.append('workType', payload.workType)
    params.append('workTime', payload.workTime)
    params.append('name', payload.name)
    await axios.post('/events/create/', params)
      .then(function (response) {
        let result = {}
        result.id = response.data.data.id
        result.date = response.data.data.attributes.date
        result.name = response.data.data.attributes.name
        result.workTime = response.data.data.attributes.workTime
        result.workType = response.data.data.attributes.workType
        context.commit('addEvent', result)
        state.dispatch('loadYearData')
      })
      .catch(function (error) {
        if (error.request) {
          console.log(error.request)
        }
      })
      .finally(
        context.commit('setAction', false)
      )
  },
  async updateEvent(context, payload) {
    context.commit('setAction', true)
    const params = new URLSearchParams()
    params.append('date', payload.date)
    params.append('workType', payload.workType)
    params.append('workTime', payload.workTime)
    params.append('name', payload.name)
    await axios.put('/events/' + payload.id + '/', params)
      .then(function (response) {
        let result = {}
        result.id = response.data.data.id
        result.date = response.data.data.attributes.date
        result.name = response.data.data.attributes.name
        result.workTime = response.data.data.attributes.workTime
        result.workType = response.data.data.attributes.workType
        context.commit('addEvent', result)
      })
      .catch(function (error) {
        if (error.request) {
          console.log(error.request)
        }
      })
      .finally(
        context.commit('setAction', false)
      )
  },
  async deleteEvent(context, payload) {
    context.commit('setAction', true)
    await axios.delete('/events/' + payload.id + '/')
      .then(function (response) {
        context.commit('delEvent', payload)
      })
      .catch(function (error) {
        if (error.request) {
          console.log(error.request)
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
