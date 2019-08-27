<template>
  <v-content>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <v-toolbar-title
      >
        График служебной нагрузки
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items
        flat
      >
        <v-btn
          v-for="(item, i) in menuItems"
          @click="this.$router.push(item.route)"
        >
          <v-icon left
                  medium
          >{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="logout()"
        >
          <v-icon
            left
          >mdi-export
          </v-icon>
          выход
        </v-btn>

    </v-toolbar>
  </v-content>
</template>

<script>
    export default {
        name: 'Toolbar',
        data: () => ({
            drawer: true
        }),
        computed: {
            menuItems() {
                return [
                    {
                        title: 'График нагрузки',
                        icon: 'mdi-calendar',
                        route: '/graphic/',
                        active: true
                    },
                    {
                        title: 'Статистика',
                        icon: 'mdi-view-dashboard',
                        route: '/dashboard/',
                        active: true
                    },
                    {
                        title: 'Автоотчеты',
                        icon: 'mdi-message',
                        route: '/autosend/',
                        active: false
                    },
                    {
                        title: 'Настройки',
                        icon: 'mdi-account-settings',
                        route: '/config/',
                        active: true
                    },
                    {
                        title: 'Выход',
                        icon: 'mdi-export',
                        route: 'logout()',
                        active: true,
                        color: 'error'
                    },
                ]

            }
        },
        methods: {
            logout() {
                this.$store.commit('logout')
            }
        }
    }
</script>

<style scoped>

</style>
