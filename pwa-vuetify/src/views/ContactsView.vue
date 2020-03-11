<template>
<v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>apps</v-icon>
          </v-list-item-action>
          <v-list-item-content @click="onClickMarket">
            <v-list-item-title>Bot Market</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Dating simulator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
      
        <v-row align="start" justify="center">
          <v-col cols="12" class="text-left">
            <contacts></contacts>     
          </v-col>
        </v-row>
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
  import Contacts from "../components/Contacts.vue"; 
  import 'material-design-icons-iconfont/dist/material-design-icons.css';

  export default {
    components: {
        Contacts
    },

    props: {
    },

    data: () => ({
      drawer: null
    }),

    mounted: function() {
      this.drawer = null;
    },

    methods: {
      onClickMarket: function() {
        this.$router.push({ name: 'Market' })
      }
    }
  }
</script>