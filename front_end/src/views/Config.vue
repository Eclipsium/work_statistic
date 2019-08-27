<template>
  <v-content>
    <toolbar></toolbar>
    Config page
  </v-content>
</template>

<script>
    import Toolbar from '../components/Toolbar'

    export default {
        components: {
            'toolbar': Toolbar
        },
        name: 'Config'
    }
</script>

<style scoped>

</style>
