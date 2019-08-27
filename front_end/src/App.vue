<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data: () => ({
  }),
  beforeUpdate () {
    let token = this.$store.getters.getToken
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = null
    }
  }
}
</script>
