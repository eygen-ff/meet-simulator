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
      }
    },
    async onSubmitLogin(form) {
      try {
        await this.$store.dispatch('login', form);
        this.$router.push({ name: 'Home' });
      } catch (e) {
        console.error('onSubmitLogin', e);
      }
    }
  },
}

</script>