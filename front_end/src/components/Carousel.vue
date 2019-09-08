<template>
  <v-carousel
    height="800"
    cycle
    interval="3000"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(image, i) in images"
      :key="image"

    >
      <v-sheet
        color="primary"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-img :src="require('@/assets/img/carousel/' + image)"/>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
    export default {
        name: "carousel",
        computed: {
            images() {
                return [
                    'Screenshot_3.png',
                    'Screenshot_1.png',
                    'Screenshot_2.png',
                ]
            }
        }
    }
</script>

<style scoped>

</style>
