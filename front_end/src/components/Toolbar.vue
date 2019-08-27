<template>
  <v-content>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      app
    >
      <v-list shaped>
        <v-list-item
          v-for="(item) in menuItems"
          :to="item.route"
          :disabled="!item.active"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4">
          <v-btn
            color="error"
            block
            @click="logout"
          >Выйти</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-toolbar>
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click="drawer=!drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
      >
        График служебной нагрузки
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items
        text
        class="hidden-md-and-down"
      >
        <v-btn
          v-for="(item) in menuItems"
          :key="item.title"
          :disabled="!item.active"
          :to="item.route"
        >
          <v-icon left
                  medium
          >{{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items
        text
        class="hidden-md-and-down"
      >
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
      </v-toolbar-items>
    </v-toolbar>
  </v-content>
</template>

<script>
    export default {
        name: 'Toolbar',
        data: () => ({
            drawer: false
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
                    }
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
