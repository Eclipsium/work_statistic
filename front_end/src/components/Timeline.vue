<template>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      color="purple lighten-2"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon
            dark
            size="42"
            class="mr-4"
          >
            mdi-account-multiple-plus
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">
           Создаете аккаунт
          </h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              Регистрация занимает не больше 2х минут.
              <br>
              Указываете номер смены, имя и почту
            </v-col>
            <v-col
              class="hidden-sm-and-down text-right"
              md="2"
            >
              <v-icon size="40">mdi-account-tie</v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="amber lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="display-1 mr-4 white--text font-weight-light">
            Создаются смены
          </h2>
          <v-icon
            dark
            size="42"
          >mdi-creation</v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="hidden-sm-and-down text-left"
              md="2"
            >
              <v-icon size="40">mdi-auto-fix</v-icon>
            </v-col>

            <v-col cols="12" md="10">
              Сервис автоматически сгенерирует Ваш график на основании указаной смены
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon
            class="mr-4"
            dark
            size="42"
          >
            mdi-calendar-edit
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">Изменяете график</h2>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" md="10">
              Редактируете свои выходные дни, наряды и дежурства
              <br>
              Нагрузка автоматически пересчитывается
            </v-col>
            <v-col
              class="hidden-sm-and-down text-right"
              md="2"
            >
              <v-icon size="40">mdi-calendar-check</v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-4 white--text font-weight-light">
            Получаете статистику
          </h2>
          <v-icon
            dark
            size="42"
          >
            mdi-calendar-clock
          </v-icon>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col class="hidden-sm-and-down" md="2">
              <v-icon size="40">mdi-calendar-heart</v-icon>
            </v-col>
            <v-col cols="12" md="10">
              Получаете детальную статистику о переработке, служебной нагрузке и нереализованых выходных
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
    export default {
        name: "Timeline"
    }
</script>

<style scoped>

</style>
