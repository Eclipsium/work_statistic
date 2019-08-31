<template>
  <v-app>
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',
        data: () => ({}),
        watch: {
        $route(to, from) {
            document.title = to.meta.title
        },
    },
        beforeUpdate() {
            let token = this.$store.getters.getToken
            if (token) {
                axios.defaults.headers.common['Authorization'] = 'Token ' + token
            } else {
                axios.defaults.headers.common['Authorization'] = null
            }
        },
    }

</script>
<style>

</style>
