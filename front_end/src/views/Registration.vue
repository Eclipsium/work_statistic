<template>
  <v-content>
    <v-container
      fluid
      fill-height
    >
      <v-layout column align-center justify-center>
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="success"
              dark
              flat
            >
              <v-toolbar-title>Регистрация аккаунта</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation=false
              >
                <v-alert
                  v-if="isAlert"
                  :dismissible="false"
                  :type="isAlert.type"
                  class="mb-4"
                >
                  {{ isAlert.message }}
                </v-alert>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Почта"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="Пароль"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  v-model="passwordRepeat"
                  :rules="[comparePassword, ]"
                  label="Повторите пароль"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="fullName"
                  :rules="fullNameRules"
                  label="Полное имя"
                  required
                ></v-text-field>

                <v-select
                  class="mt-2"
                  v-model="troopType"
                  :items="troopTypes"
                  :rules="troopRules"
                  label="Номер смены"
                  filled
                  required
                ></v-select>

                <v-checkbox
                  v-model="is_agree"
                  :rules="[v => !!v || 'Необходимо принять условия использования!']"
                  required
                >
                  <template v-slot:label>
                    <div>
                      Я согласен с
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            target="_blank"
                            href="http://vuetifyjs.com"
                            @click.stop
                            v-on="on"
                          >
                            условиями использования
                          </a>
                        </template>
                        Прочитать условия использования
                      </v-tooltip>
                    </div>
                  </template>
                  <p>Согласен с условиями пользования?</p>
                </v-checkbox>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="submit"
                  :loading="is_loading"
                >
                  Зарегистрироваться
                </v-btn>
                <v-btn
                  color="info"
                  @click="to_login"
                >
                  Уже есть аккаунт?
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

</template>

<script>
    export default {
        data: () => ({
            valid: true,

            troopTypes: ['1', '2', '3', '4'],
            troopType: null,
            troopRules: [
                v => !!v || 'Номер смены обязателен!'
            ],

            password: '',
            passwordRules: [
                v => !!v || 'Введите пароль',
                v => (v && v.length >= 6) || 'Пароль должен быть больше 6 символов!'
            ],

            passwordRepeat: '',

            email: '',
            emailRules: [
                v => !!v || 'Введите почту!',
                v => /.+@.+\..+/.test(v) || 'Почта введена не правильно!'
            ],

            fullName: '',
            fullNameRules: [
                v => !!v || 'Полное имя обязательно!',
                v => (v && v.length >= 6) || 'Полное имя должно быть больше 6 символов!'
            ],

            is_agree: false
        }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('register', {
                        email: this.email,
                        password: this.password,
                        troopType: this.troopType,
                        fullName: this.fullName
                    })
                }
            },
            to_login() {
                this.$router.push({path: '/login/'})
            }
        },

        computed: {
            isAlert() {
                return this.$store.getters.getAlert
            },
            is_loading() {
                return this.$store.getters.getAction
            },
            comparePassword() {
                return () => (this.password === this.passwordRepeat) || 'Пароли не совпадают!'
            },
        }
    }
</script>

<style scoped>

</style>
