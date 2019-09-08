<template>
  <v-row class="fill-height" align="top" justify="left">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        lg="6"
        sm="12"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 12 : 2"
            class="my-4 mx-auto">
            <v-img
              class="white--text"
              height="300"
              width="500"
              :src="item.img"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out success darken-3 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <v-btn
                    large
                    @click="redirect(item.link)"
                  >
                    <v-icon
                      left
                      large
                    >
                      {{ item.icon}}
                    </v-icon>
                    Перейти на сайт
                  </v-btn>
                </div>
              </v-expand-transition>

              <v-card-title class="align-end fill-height">
                {{ item.title }}
              </v-card-title>
            </v-img>
            <v-card-text> {{ item.subtext }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
  </v-row>
</template>

<script>
    export default {
        name: "AboutCard",
        props: ['items',],
        methods: {
            redirect(link) {
                window.open(link, '_blank');
            }
        }
    }
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>
