<template>
<v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>

        <side-bar-item icon="apps" text="Bot Market" v-on:click="onClickMarket"></side-bar-item>
        <side-bar-item icon="mdi-plus-one" text="Create Bot" v-on:click="onClickCreateBot"></side-bar-item>
        <side-bar-item icon="lock" text="Logout" v-on:click="onClickLogout"></side-bar-item>
        
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
            <contacts :list="$store.getters.getMyBots"></contacts>     
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
  import SideBarItem from '../components/SideBarItem.vue';
  import 'material-design-icons-iconfont/dist/material-design-icons.css';

  export default {
    components: {
        Contacts, SideBarItem
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
      onClickMarket() {
        this.$router.push({ name: 'Market' })
      },
      onClickLogout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push({ name: 'Home' })
        }).catch(console.error);
      },
      onClickCreateBot() {
        this.$router.push({ name: 'CreateBot' })
      }
    }
  }
</script>