<template>

<v-app id="inspire">
    <v-app-bar
      app
      dark
    >
      <v-btn icon @click="onClickHome">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-toolbar-title> Create Bot</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>

<form>
    <v-text-field 
      v-model="form.name"
      :error-messages="errors.name"
      :counter="maxLength.name"
      label="Name"
      required
    ></v-text-field>
    <v-text-field 
      v-model="form.photo"
      :error-messages="errors.photo"
      label="Photo URL"
      required
    ></v-text-field>
    <v-combobox
      v-model="form.gender"
      label="Gender"
      :items="['Female','Male']"
      required  
    ></v-combobox>
    
    <v-row>
      <v-col>
        <v-btn class="primary">Create</v-btn>
      </v-col>
    </v-row>
  
  </form>

      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span class="white--text">&copy; effus labs</span>
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
        onClickHome: function() {
            this.$router.push({name: 'Home'})
        }
    },
};
</script>

<style>

</style>