<template>
  <v-content>
    <v-container>
      <div class="custom-header text-center py-5 mb-5">
        <h1 class="white--text">Для кого этот проект?</h1>
      </div>
      <v-banner class="text-center">
        <p>
          Проект был создан для удобного расчета времени переработки для служащих в гос. организациях,
          но сервис так-же подойдет для любой сменной работы, оформленой по ТК РФ.
        </p>

      </v-banner>
      <div class="custom-header text-center py-5 mt-5">
        <h1 class="white--text">Стек технологий:</h1>
      </div>
      <v-row>


        <v-col cols="12" lg="6" sm="12">
          <v-banner
            class="title mt-5 text-center"
            elevation="4"
          >
            Front-end:

            <about-card :items="frontCardItems"></about-card>
          </v-banner>
        </v-col>

        <v-col cols="12" sm="6">
          <v-banner
            class="title mt-5 text-center"
            elevation="4"
          >
            Back-end:

            <about-card :items="backCardItems"></about-card>
          </v-banner>
        </v-col>
      </v-row>
    </v-container>

    <Footer :links="links"></Footer>
  </v-content>
</template>

<script>
    import Footer from "../components/Footer";
    import AboutCard from "../components/AboutCard";

    export default {
        name: "About",
        components: {
            Footer,
            AboutCard
        },
        data: () => ({
            links: [
                {'title': 'Регистрация', 'link': '/reg', 'icon': 'mdi-account-plus'},
                {'title': 'Войти', 'link': '/login', 'icon': 'mdi-login'},
                {'title': 'Главная', 'link': '/', 'icon': 'mdi-home'},
                {'title': 'GitHub', 'link': '/github', 'icon': 'mdi-github-circle'},
                {'title': 'Нашел баг?', 'link': '/bug', 'icon': 'mdi-bug'},
            ],
            frontCardItems: [
                {
                    title: 'Vue.js',
                    subtext: 'Основной фреймворк фронта. Использованы модули vue-router, vuex, vuex-persistedstate',
                    img: 'https://www.peerbits.com/wp-content/uploads/2018/05/Vue.js-cta-main.jpg',
                    link: 'https://vuejs.org/',
                    icon: 'mdi-vuejs',
                },
                {
                    title: 'Vuetify.js',
                    subtext: 'Дизайн компонентов UI, в стиле Material design',
                    img: 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg',
                    link: 'https://vuetifyjs.com/',
                    icon: 'mdi-vuetify',
                },
                {
                    title: 'Chart.js',
                    subtext: 'Дизайн страницы статистики, реализация красивых динамичных графиков',
                    img: 'https://appstore.home.mendix.com/logo/image?id=157173&changeddate=1562076995209',
                    link: 'https://www.chartjs.org/',
                    icon: 'mdi-chart-areaspline-variant',
                },
            ],
            backCardItems: [
                {
                    title: 'Django 2',
                    subtext: 'Основной Back-end фреймворк.',
                    img: 'https://habrastorage.org/webt/el/qa/g5/elqag5gw6uaertgs19r69yb9sui.png',
                    link: 'https://www.djangoproject.com/',
                    icon: 'mdi-language-python',
                },
                {
                    title: 'Django REST Framework',
                    subtext: 'Реализация REST API для связи с Vue.js',
                    img: 'https://vinta-cms.s3.amazonaws.com/media/filer_public/2e/64/2e642aa4-2856-4bba-a2cf-330879eef793/django_rest_framework.png',
                    link: 'https://www.django-rest-framework.org/',
                    icon: 'mdi-api',
                },
                {
                    title: 'Gunicorn + Nginx',
                    subtext: 'Реализация REST API для связи с Vue.js',
                    img: 'https://vinta-cms.s3.amazonaws.com/media/filer_public/2e/64/2e642aa4-2856-4bba-a2cf-330879eef793/django_rest_framework.png',
                    link: 'https://www.django-rest-framework.org/',
                    icon: 'mdi-api',
                },
                {
                    title: 'Celery',
                    subtext: 'Реализация REST API для связи с Vue.js',
                    img: 'https://vinta-cms.s3.amazonaws.com/media/filer_public/2e/64/2e642aa4-2856-4bba-a2cf-330879eef793/django_rest_framework.png',
                    link: 'https://www.django-rest-framework.org/',
                    icon: 'mdi-api',
                },
            ]
        }),
    }
</script>

<style scoped>
  .custom-header {
    background: #168da1;
    border-radius: 10px;
  }

</style>
