<template>
    <v-footer
      color="primary lighten-1"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link.title"
          color="white"
          :to="link.link"
          text
          rounded
          class="my-2"
        >
          <v-icon left
         >{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Eclipsium</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",

        props: ['links']
    }
</script>

<style scoped>

</style>
