<template>

<v-app id="inspire">
    <v-app-bar
      app
      dark
    >
      <v-btn icon @click="onClickBotEdit">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-toolbar-title> Bot Story Configurator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>

        <v-row justify="center">
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(item,i) in 15"
              :key="i"
            >
              <v-expansion-panel-header>4 - Bot answer</v-expansion-panel-header>
              <v-expansion-panel-content>
                

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>

      </v-container>

  
    </v-content>

    <v-footer app>

  <v-bottom-navigation>
    <v-btn value="recent">
      <span>Recent</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
  
    </v-footer>
  </v-app>        
    
</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            form: {
                name: '',
                photo: '',
                gender: ''
            },
            errors: {
                name: '',
                photo: ''
            },
            maxLength: {
                name: 50
            }
        }
    },
    computed: {},
    methods: {
        onClickBotEdit: function() {
            this.$router.push({name: 'Home'})
        }
    },
};
</script>

<style>

</style>