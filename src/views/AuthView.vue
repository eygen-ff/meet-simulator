<template>
<v-app id="inspire">

    <v-app-bar
      app
      dark
    >
      <v-toolbar-title>Auth - Dating simulator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid ref="container">
        <LoginForm :stored-email="$store.getters.getEmail" v-on:register="onSubmitRegister" v-on:login="onSubmitLogin"></LoginForm>
      </v-container>
    </v-content>

    <v-snackbar
      v-model="flagShowErrorMessage"
      color="red darken-1"
      :timeout="5000"
    >
      {{ errorMessage }}

      <v-btn
        color="black"
        text
        @click="flagShowErrorMessage = false"
      >
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>
    </v-snackbar>

  </v-app>

</template>

<script>

import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      flagShowErrorMessage: false,
      errorMessage: ''
    }
  },
  async mounted() {
  },
  methods: {
    async onSubmitRegister(form) {
      try {
        await this.$store.dispatch('register', form);
        this.$router.push({ name: 'Home' });
      } catch (e) {
        console.error('onSubmitRegister', e);
        this.flagShowErrorMessage = true;
        this.errorMessage = e;
      }
    },
    async onSubmitLogin(form) {
      try {
        await this.$store.dispatch('login', form);
        this.$router.push({ name: 'Home' });
      } catch (e) {
        console.error('onSubmitLogin', e);
        this.flagShowErrorMessage = true;
        this.errorMessage = e;
      }
    }
  },
}

</script>