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
          md6
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Войти</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                v-if="isAlert"
                :dismissible="false"
                :type="isAlert.type"
                class="mb-4"
                border="top"
              >
                {{ isAlert.message }}
              </v-alert>

              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation=false
              >
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

                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-4"
                  :loading="is_loading"
                  @click="submit"
                >
                  Войти в кабинет
                </v-btn>
                <v-btn
                  color="success"
                  @click="to_req"
                >
                  Еще нет аккаунта?
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
            password: '',
            passwordRules: [
                v => !!v || 'Введите пароль',
                v => (v && v.length >= 6) || 'Пароль должен быть больше 6 символов!'
            ],
            email: 'abiogenesis70ru@gmail.com',
            emailRules: [
                v => !!v || 'Введите почту!',
                v => /.+@.+\..+/.test(v) || 'Почта введена не правильно!'
            ],
            is_agree: false
        }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('login', {email: this.email, password: this.password})
                }
            },
            to_req() {
                this.$router.push({path: '/reg/'})
            }
        },
        computed: {
            is_loading() {
                return this.$store.getters.getAction
            },
            isAlert() {
                return this.$store.getters.getAlert
            }
        }
    }
</script>

<style scoped>

</style>
