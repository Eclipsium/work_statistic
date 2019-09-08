<template>
  <v-content>
    <toolbar></toolbar>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container v-if="!isLoading">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card raised>
            <v-card-title>Данные пользователя</v-card-title>
            <v-container>
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation=false
              >
                <v-text-field
                  label="Почта"
                  outlined
                  :rules="emailRules"
                  v-model="email"
                  required
                ></v-text-field>

                <v-text-field
                  label="Полное имя"
                  outlined
                  :rules="fullNameRules"
                  v-model="fullName"
                  required
                ></v-text-field>

                <v-select
                  v-model="troop_type"
                  :items="troop_types"
                  :rules="troopRules"
                  outlined
                  label="Номер смены"
                  required
                >
                </v-select>

                <v-btn
                  color="success"
                  :disabled="!valid"
                >
                  Обновить
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          cols="12" sm="6" md="4"
        >
          <v-card raised>
            <v-card-title>Управление календарем</v-card-title>
            <v-container>
              <v-dialog
                v-model="deteleCalendarDialog"
                width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="error"
                    block
                    class="mb-3"
                    v-on="on"
                  >
                    Удалить календарь
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Подвердите действие
                  </v-card-title>

                  <v-card-text
                    class="mt-2">
                    Удаление календаря приведет к его полной очистке. Восстановить его после данного действия
                    невозможно!
                    Вы ТОЧНО уверены, что хотите удалить календарь?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="error"
                      text
                      @click="deteleCalendarDialog = false"
                    >
                      Удалить календарь
                    </v-btn>

                    <v-btn
                      color="success"
                      text
                      @click="deteleCalendarDialog = false"
                    >
                      Отмена
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="fillCalendarDialog"
                width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="warning"
                    block
                    class="mb-3"
                    v-on="on"
                  >
                    Заполнить календарь
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Подвердите действие
                  </v-card-title>

                  <v-card-text
                    class="mt-2">
                    Это действие заполняет календарь за текущий месяц на основании вашей смены. Если у Вас уже
                    заполненый
                    календарь, данное действие ПЕРЕЗАПИШЕТ Ваши данные. Вы ТОЧНО хотите заполнить календарь?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="error"
                      text
                      @click="fillCalendarDialog = false"
                    >
                      Заполнить календарь
                    </v-btn>

                    <v-btn
                      color="success"
                      text
                      @click="fillCalendarDialog = false"
                    >
                      Отмена
                    </v-btn>
                  </v-card-actions>

                </v-card>

              </v-dialog>

            </v-container>

          </v-card>
        </v-col>

        <v-col
          cols="12" sm="6" md="4"
        >
          <v-card raised>
            <v-card-title>Управление аккаунтом</v-card-title>
            <v-container>
              <v-dialog
                v-model="deleteAccountDialog"
                width="500"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="error"
                    block
                    class="mb-3"
                    v-on="on"
                  >
                    Удалить Аккаунт
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Подвердите действие
                  </v-card-title>

                  <v-card-text
                    class="mt-2">
                    Удаление аккаунта невозможно отменить. Вы ТОЧНО хотите удалить свой аккаунт?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="error"
                      text
                      @click="deleteAccountDialog = false"
                    >
                      Удалить календарь
                    </v-btn>

                    <v-btn
                      color="success"
                      text
                      @click="deleteAccountDialog = false"
                    >
                      Отмена
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
    import Toolbar from '../components/Toolbar'

    export default {
        components: {
            'toolbar': Toolbar
        },
        name: 'Config',
        data: () => ({
            email: null,
            emailRules: [
                v => !!v || 'Введите почту!',
                v => /.+@.+\..+/.test(v) || 'Почта введена не правильно!'
            ],

            fullName: null,
            fullNameRules: [
                v => !!v || 'Полное имя обязательно!',
                v => (v && v.length >= 6) || 'Полное имя должно быть больше 6 символов!'
            ],

            troop_type: null,
            troopRules: [
                v => !!v || 'Номер смены обязателен!'
            ],
            troop_types: ['1', '2', '3', '4'],
            deteleCalendarDialog: null,
            fillCalendarDialog: null,
            deleteAccountDialog: null,


            valid: true,


        }),
        methods: {
            setUserProfile() {
                this.email = this.userProfile.email
                this.fullName = this.userProfile.full_name
                this.troop_type = this.userProfile.troop_type
            }
        },
        computed: {
            userProfile() {
                return this.$store.getters.getProfile
            },
            isLoading() {
                return this.$store.getters.getAction
            }
        },
        mounted() {
            this.$store.dispatch('loadProfile')
                .then(this.setUserProfile)


        }
    }
</script>

<style scoped>

</style>
