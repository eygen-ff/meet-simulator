<template>
<v-app id="inspire">

    <v-app-bar
      app
      dark
    >
      <v-toolbar-title>Dating simulator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <LoadingScreen :status-message="loadingStatusMessage"></LoadingScreen>
    </v-content>

  </v-app>

</template>

<script>

import LoadingScreen from '../components/LoadingScreen.vue';

export default {
  components: {
    LoadingScreen
  },
  data() {
    return {
      
    }
  },
  async mounted() {
    Promise.all([
      this.$store.dispatch('checkConnection'),
      this.$store.dispatch('checkAuth')
    ]).then(() => {
      this.$router.push({ name: 'Contacts' });
    }).catch(() => {
      this.$router.push({ name: 'Auth' });
    });
  },
  methods: {
      
  },
  computed: {
    loadingStatusMessage: function() {
      if (this.$store.getters.isConnected === false) {
        return 'Ошибка соединения';
      } else if (this.$store.getters.isAuthorized === false) {
        return 'Ошибка авторизации';
      } else if (this.$store.getters.isAuthorized === null) {
        return 'Авторизация';
      }
      return 'Загрузка';
    }
  },
}
</script>