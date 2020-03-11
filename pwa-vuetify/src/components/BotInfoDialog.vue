<template>
    <v-dialog v-model="flagShow" fullscreen hide-overlay transition="dialog-top-transition">
      <v-card>
        <v-card-title class="headline">Bot info</v-card-title>

        <v-container>
          <v-row>
            <v-col>
              <v-avatar class="ma-3" size="125" tile>
                <v-img v-if="photo" :src="photo"></v-img>
                <v-icon v-else>mdi-comment-account</v-icon>
              </v-avatar>
            </v-col>

            <v-col>
              <v-card-text>{{info}}</v-card-text>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-progress-linear color="amber" height="20" :value="rate" striped>Рейтинг отношений - {{rate}}</v-progress-linear>
            </v-col>
          </v-row>

          <v-row v-if="gallery.length > 0">
            <v-col sm="4" xs="0"></v-col>
            <v-col sm="4" xs="12">
              <v-carousel v-if="gallery" height="300">
                <v-carousel-item
                  v-for="(item,i) in gallery"
                  :key="i"
                  :src="item"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col sm="4" xs="0"></v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block color="primary" outlined dark text @click="onClickClose">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        flagShow: {
            type: Boolean,
            default: false
        },
        photo: {
            type: String,
            default: ''
        },
        info: {
            type: String,
            default: ''
        },
        rate: {
            type: Number,
            default: 0
        },
        gallery: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onClickClose: function() {
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss">
.v-icon.mdi-comment-account {
    font-size: 8rem;
}
</style>