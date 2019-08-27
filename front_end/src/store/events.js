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
  loadEvents(context) {
    context.commit('setAction', true)
    axios.get('/events/list/')
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
        setTimeout(() => (context.commit('setAction', false)), 500)
      )
  },
  pushEvent(context, payload) {
    context.commit('setAction', true)
    const params = new URLSearchParams()
    params.append('date', payload.date)
    params.append('workType', payload.workType)
    params.append('workTime', payload.workTime)
    params.append('name', payload.name)
    axios.post('/events/create/', params)
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
        setTimeout(() => (context.commit('setAction', false)), 500)
      )
  },
  updateEvent(context, payload) {
    context.commit('setAction', true)
    const params = new URLSearchParams()
    params.append('date', payload.date)
    params.append('workType', payload.workType)
    params.append('workTime', payload.workTime)
    params.append('name', payload.name)
    axios.put('/events/' + payload.id + '/', params)
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
        setTimeout(() => (context.commit('setAction', false)), 500)
      )
  },
  deleteEvent(context, payload) {
    context.commit('setAction', true)
    axios.delete('/events/' + payload.id + '/')
      .then(function (response) {
        context.commit('delEvent', payload)
      })
      .catch(function (error) {
        if (error.request) {
          console.log(error.request)
        }
      })
      .finally(
        setTimeout(() => (context.commit('setAction', false)), 500)
      )
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
