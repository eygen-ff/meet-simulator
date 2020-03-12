<template>
    <v-container fluid>
        <v-row class="screen-center">
          <v-col class="text-center">
            <v-icon class="logo-icon">{{randomIcon1}}</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-icon class="logo-icon red--text">{{randomIcon2}} mdi-spin</v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">{{statusMessage}}</v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
    props: {
        statusMessage: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
          icons: [
            'mdi-fan',
            'mdi-face-woman',
            'mdi-face',
            'mdi-rotate-orbit',
            'mdi-robot',
            'mdi-robber',
            'mdi-emoticon-kiss-outline',
            'mdi-emoticon-wink-outline',
            'mdi-bowling'
          ]
        }
    },
    computed: {
      randomIcon1: function() {
        const min = 0;
        const max = this.icons.length - 1;
        const random = Math.floor(Math.random() * (+max - +min)) + +min;
        return this.icons[random];
      },
      randomIcon2: function() {
        const max = this.icons.length - 1;
        const random = Math.floor(Math.random() * (+max - +0)) + +0;
        return this.icons[random];
      }
    },
    mounted() {
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
.v-icon.logo-icon {
  font-size: 5rem;
}
.screen-center {
  margin-top: 10rem;
}
</style>