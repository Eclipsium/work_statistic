<template>
  <v-content>
    <v-container
    >
      <v-card
        max-width="600"
        class="mx-auto align-content-center"
      >
        <v-card-title>Ошибка 404</v-card-title>
        <v-card-text>Страница не найдена. Возможно она была перемещена или удалена</v-card-text>
        <v-card-actions
          class="d-flex justify-center"
        >
          <v-btn
            :to="'/'"
            color="success"
            large
          >
            На главную
            <v-icon
              right>mdi-home
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
    import Toolbar from '../components/Toolbar'

    export default {
        name: "NotFound404",
        components: {
            'toolbar': Toolbar,
        }
    }
</script>

<style scoped>

</style>
