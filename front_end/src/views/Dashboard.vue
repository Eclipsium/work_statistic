<template>
  <v-content>
    <toolbar></toolbar>
    <v-container>
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-layout

      >
        <v-flex
          lg12
          mt-3
          class="text-center"
          ma-2
        >
          <v-row
            no-gutters
            justify="center"
            cols="12"
          >
            <v-col
              cols="4"
              class="pa-2"
            >
              <h2>Нагрузка за год</h2>
              <v-select
                :items="years"
                v-model="year"
                :disabled="true"
              >
              </v-select>
            </v-col>
          </v-row>
          <barchart
             v-if="!isLoading"
            :chart-data="yearChart"
            :options="options"
          ></barchart>
          <v-simple-table
            class="mt-5 text-left"
          v-if="!isLoading"
          >
            <thead>
            <tr>
              <th>Название</th>
              <th>Количество часов</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in yearData" :key="item.label">
              <td>{{ item.label }}</td>
              <td>{{ item.detail }}</td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    import Toolbar from '../components/Toolbar'
    import BarChart from '../plugins/BarChart'

    export default {
        name: 'Dashboard',
        components: {
            'toolbar': Toolbar,
            'barchart': BarChart
        },

        data: () => ({
            year: '2019',
            years: ['2019', '2020'],
            yearData: [],
            renderedChart: 0,
            yearChart: {},
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }),
        computed: {
            getYearData() {
                return this.$store.getters.getYearData
            },
            isLoading() {
                return this.$store.getters.getAction
            },
            getYearLabel() {
                let data = this.getYearData
                let labels = []
                for (let i in Object.keys(data)) {
                    labels.push(Object.keys(data)[i])
                }
                return labels
            },
            getYearWorkData() {
                let data = this.getYearData
                let response = []
                for (let i in this.getYearLabel) {
                    response.push(data[this.getYearLabel[i]].work_time)
                }
                return response
            },
            getYearPerfectWorkData() {
                let data = this.getYearData
                let response = []
                for (let i in this.getYearLabel) {
                    response.push(data[this.getYearLabel[i]].work_days * 8)
                }
                return response
            },
            getYearOverWorkData() {
                let data = this.getYearData
                let response = []
                for (let i in this.getYearLabel) {
                    let overworked = data[this.getYearLabel[i]].work_time - data[this.getYearLabel[i]].work_days * 8
                    if (overworked < 0) {
                        overworked = 0
                    }
                    response.push(overworked)
                }
                return response
            },
            getOverWorkedAllTime() {
                let response = 0
                let data = this.getYearOverWorkData
                for (let i in data) {
                    response += data[i]
                }
                return response
            }
        },
        methods: {
            setYearChart() {
                this.yearChart = {
                    labels: this.getYearLabel,
                    datasets: [
                        {
                            label: 'Максимальная нагрузка',
                            backgroundColor: 'rgb(75,216,255)',
                            borderColor: 'rgb(75,216,255)',
                            data: this.getYearPerfectWorkData
                        },
                        {
                            label: 'Реальная нагрузка',
                            backgroundColor: 'rgb(96,255,151)',
                            borderColor: 'rgb(96,255,151)',
                            data: this.getYearWorkData
                        },
                        {
                            label: 'Переработка',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: this.getYearOverWorkData
                        }
                    ]
                }
            },
            setYearData() {
                this.yearData.push(
                    {
                        label: 'Переработка за все время',
                        detail: this.getOverWorkedAllTime
                    },
                    {
                        label: 'Средняя переработка в месяц',
                        detail: this.getOverWorkedAllTime / this.getYearLabel.length
                    },
                    {
                        label: 'Количество нереализованых выходных',
                        detail: this.getOverWorkedAllTime / 8
                    })
            },
        },
        mounted() {
            this.$store.dispatch('loadYearData', this.year)
             .then(this.setYearChart)
        },
        watch: {
            year () {
                this.$store.dispatch('loadYearData', this.year)
            }
        }
    }
</script>

<style scoped>

</style>
