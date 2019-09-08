<template>
  <v-content>
      <v-toolbar
      >
        <v-toolbar-title>График служебной нагрузки</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            color="success"
            :to="'/login'"
          >
            <v-icon left>mdi-login</v-icon>
            Войти
          </v-btn>

          <v-btn
            color="info"
             :to="'/reg'"
          >
            <v-icon left>mdi-account-plus</v-icon>
            Регистрация
          </v-btn>

        </v-toolbar-items>
      </v-toolbar>
      <v-parallax
        class="mt-2"
        height="600"
        dark
        src="http://www.rabstol.net/uploads/gallery/main/360/rabstol_net_quotes_05.jpg"
      >
        <v-row
          align="center"
          justify="center"
          class="mt-5"
        >
          <h1 class="display-3 font-weight-thin mb-4">Служебная нагрузка </h1>
          <h4 class="subheading">Расчитывать переработку теперь легко!</h4>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-btn
            color="info"
            large
            min-width="250"
             :to="'/reg'"
          >Регистрация
          </v-btn>
        </v-row>
      </v-parallax>
      <v-container>

        <div class="custom-header text-center pa-5 mt-5">
          <h1 class="white--text">Как это работает?</h1>
        </div>

        <timeline></timeline>

        <div class="custom-header text-center pa-5 mt-5 mb-5">
          <h1 class="white--text">Как это выглядит?</h1>
        </div>

        <carousel></carousel>

      </v-container>
      <Footer :links="links"></Footer>
  </v-content>
</template>

<script>
    import Timeline from "../components/Timeline";
    import Carousel from "../components/Carousel";
    import Footer from "../components/Footer";

    export default {
        components: {
            Timeline,
            Carousel,
            Footer
        },
        data: () => ({
            links: [
                {'title': 'Регистрация', 'link': '/reg', 'icon': 'mdi-account-plus'},
                {'title': 'Войти', 'link': '/login', 'icon': 'mdi-login'},
                {'title': 'О проекте', 'link': '/about', 'icon': 'mdi-arm-flex'},
                {'title': 'GitHub', 'link': '/github', 'icon': 'mdi-github-circle'},
                {'title': 'Нашел баг?', 'link': '/bug', 'icon': 'mdi-bug'},
            ],
        }),
        name: "Home",

    }
</script>

<style scoped>
  .custom-header {
    background: #168da1;
    border-radius: 10px;
  }
</style>
