<template>
  <v-content>
    <toolbar></toolbar>
    <v-container>
      <v-toolbar flat color="white">
        <!--Панель управления месяцами-->
        <v-btn
          fab
          outlined
          small
          color="primary"
          @click="$refs.calendar.prev()"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          outlined
          color="primary"
          @click="setFocus">
          Сегодня
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          fab
          outlined
          small
          color="primary"
          @click="$refs.calendar.next()"
        >
          <v-icon
            dark
          >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-toolbar>

      <v-layout wrap>
        <!--Панель управления сменами-->
        <v-flex
          sm12
          lg3
          class="mb-12 controls"
        >

          <v-select
            v-model="type"
            :items="workType"
            label="Тип нагрузки"
            solo
            required
            :error-messages="typeErrors"
            @change="$v.type.$touch()"
            @blur="$v.type.$touch()"
            prepend-icon="mdi-briefcase-download"
          ></v-select>

          <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="dateToChange"
            transition="scale-transition"
            min-width="290px"
            offset-y
            full-width
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateToChange"
                label="Дата для изменения"
                prepend-icon="mdi-timetable"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateToChange"
              no-title
              scrollable
              locale="ru"
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="dateMenu = false"
              >
                Отмена
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dateMenu.save(dateToChange)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-text-field
            v-if="showWorkTimeIfCorrectType"
            label="Количество часов нагрузки"
            placeholder="Введите цифру"
            suffix="часов"
            outlined
            @input="$v.workTime.$touch()"
            @blur="$v.workTime.$touch()"
            :error-messages="workTimeError"
            v-model="workTime"
            prepend-icon="mdi-flash"
          ></v-text-field>

          <v-btn
            v-if="this.eventId"
            absolute
            left
            color="info"
            @click="addDateEvent"
          >
            Обновить
          </v-btn>

          <v-btn
            v-if="!this.eventId"
            absolute
            left
            color="success"
            @click="addDateEvent"
          >
            Добавить
          </v-btn>

          <v-btn
            absolute
            right
            color="error"
            @click="deleteDate"
            :disabled="checkIsHaveType"
          >
            Удалить
          </v-btn>

        </v-flex>
        <v-flex
          sm12
          lg9
          class="pl-4"
        >
          <v-sheet height="700">
            <v-overlay :value="is_loading">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <v-calendar
              v-if="!is_loading"
              ref="calendar"
              locale="ru"
              v-model="focus"
              :now="today"
              :weekdays="[1, 2, 3, 4, 5, 6, 0]"
              :short-months="false"
              :short-weekdays="false"
              color="primary"
              :key="calendarRending"
              @click:day="showEvent"
              @click:date="showEvent"
            >
              <template
                v-slot:day="day"
              >
                <v-layout
                  fill-height
                  class="clickable"
                >
                  <template
                    v-if="events[day.date]"
                  >
                    <v-sheet
                      :color='colors[events[day.date].workType]'
                      width="100%"
                      height="100%"
                      class="white--text pa-1, text-lg-center"
                    >
                      <h4>{{ (events[day.date]).name }} </h4>
                      <h6
                        v-if="events[day.date].workTime">
                        {{ (events[day.date]).workTime }} часов </h6>
                    </v-sheet>
                  </template>
                </v-layout>
              </template>
            </v-calendar>
          </v-sheet>

          <div class="text-center mt-2">
            <v-btn color="primary" dark tile class="ma-1 history_button">День</v-btn>
            <v-btn color="purple" dark tile class="ma-1 history_button">Ночь</v-btn>
            <v-btn color="warning" dark tile class="ma-1 history_button">Отсыпной</v-btn>
            <v-btn color="error" dark tile class="ma-1 history_button">Выходной</v-btn>
            <v-btn color="cyan" dark tile class="ma-1 history_button">Резерв</v-btn>
            <v-btn color="pink" dark tile class="ma-1 history_button">Занятия</v-btn>
            <v-btn color="indigo" dark tile class="ma-1 history_button">Наряд</v-btn>
            <v-btn color="teal" dark tile class="ma-1 history_button">РП</v-btn>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    import Toolbar from '../components/Toolbar'
    import {validationMixin} from 'vuelidate'
    import {between, required, requiredIf} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            workTime: {
                required: requiredIf(function () {
                    return this.type !== 'weekend' && this.type !== 'sleep'
                }),
                between: between(0, 30)
            },
            type: {
                required
            }
        },

        components: {
            'toolbar': Toolbar
        },
        methods: {
            setFocus() {
                this.focus = this.today
            },
            addDateEvent() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    return
                }
                let name = ''
                for (let i in this.workType) {
                    if (this.workType[i].value === this.type) {
                        name = this.workType[i].text
                    }
                }
                if (this.type === 'weekend' || this.type === 'sleep') {
                    this.workTime = 0
                }
                let e = {
                    date: this.dateToChange,
                    workTime: this.workTime,
                    workType: this.type,
                    id: this.eventId,
                    name
                }
                if (!this.eventId) {
                    this.$store.dispatch('pushEvent', e)
                } else {
                    this.$store.dispatch('updateEvent', e)
                }
                this.$store.dispatch('loadYearData', this.year)
                this.renderCalendar()
            },
            renderCalendar() {
                this.calendarRending++
            },
            showEvent(date) {
                this.dateToChange = date.date
                try {
                    this.type = this.events[date.date].workType
                    this.workTime = this.events[date.date].workTime
                    this.eventId = this.events[date.date].id
                } catch (TypeError) {
                    this.type = null
                    this.eventId = null
                    this.workTime = null
                }
            },
            deleteDate() {
                let payload = {
                    id: this.eventId,
                    date: this.dateToChange
                }
                this.$store.dispatch('deleteEvent', payload)
                this.renderCalendar()
            }
        },
        data: () => ({
            workTime: 0,
            calendarRending: 0,
            postType: null,
            focus: null,
            today: null,
            dateToChange: null,
            type: null,
            dateMenu: null,
            showPost: true,
            colors: {
                day: 'primary',
                night: 'purple',
                sleep: 'warning',
                weekend: 'error',
                reserved: 'cyan',
                studying: 'pink',
                order: 'indigo',
                rp: 'teal'
            },
            eventId: null,
            workType: [
                {text: 'День', value: 'day'},
                {text: 'Ночь', value: 'night'},
                {text: 'Отсыпной', value: 'sleep'},
                {text: 'Выходной', value: 'weekend'},
                {text: 'Резерв', value: 'reserved'},
                {text: 'Занятия', value: 'studying'},
                {text: 'Наряд', value: 'order'},
                {text: 'РП', value: 'rp'}]
        }),
        computed: {
            workTimeError() {
                const errors = []
                if (!this.$v.workTime.$dirty) return errors
                !this.$v.workTime.between && errors.push('Введите число от 0 до 30!')
                !this.$v.workTime.required && errors.push('Поле обязательно!')
                return errors
            },
            typeErrors() {
                const errors = []
                if (!this.$v.type.$dirty) return errors
                !this.$v.type.required && errors.push('Поле обязательно!')
                return errors
            },
            events() {
                return this.$store.getters.getEvents
            },
            showWorkTimeIfCorrectType() {
                return this.type !== 'weekend' && this.type !== 'sleep'
            },
            checkIsHaveType() {
                return this.type === null
            },
            is_loading() {
                return this.$store.getters.getAction
            }
        },
        created() {
            this.renderCalendar()
            this.$store.dispatch('loadEvents')
        }
    }
</script>
<style scoped>
  .controls {
    position: relative;
  }

  .clickable {
    cursor: pointer;
  }

  .history_button {
    pointer-events: none
  }
</style>
