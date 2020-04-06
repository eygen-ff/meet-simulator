<template>

<v-app id="inspire">
    <v-app-bar
      app
      dark
    >
      <v-btn icon @click="onClickHome">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-toolbar-title> Bot Market</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
      
        <v-row align="start" justify="center">
          <v-col cols="12" class="text-left">

          <v-list subheader>
            <v-subheader v-if="girls.length">Girls</v-subheader>
            <market-item :list="girls" v-on:add="onBotAdd"></market-item>

            <v-subheader v-if="boys.length">Boys</v-subheader>
            <market-item :list="boys" v-on:add="onBotAdd"></market-item>

          </v-list>  
          
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
import MarketItem from '../components/MarketItem.vue';

export default {
    props: {
    },
    components: {
      MarketItem
    },
    computed: {
      girls() {
        let list = [];
        for (let i in this.$store.getters.getMarketBots) {
          if (this.$store.getters.getMarketBots[i].gender === 'Female') {
            list.push(this.$store.getters.getMarketBots[i]);
          }
        }
        return list;
      },
      boys() {
        let list = [];
        for (let i in this.$store.getters.getMarketBots) {
          if (this.$store.getters.getMarketBots[i].gender === 'Male') {
            list.push(this.$store.getters.getMarketBots[i]);
          }
        }
        return list;
      }
    },
    mounted() {
      this.$store.dispatch('loadMarketBots');
    },
    methods: {
        onClickHome: function() {
            this.$router.push({name: 'Home'})
        },
        onBotAdd(bot) {
          this.$store.dispatch('buyMarketBot', bot)
            .then(() => {
              this.$store.dispatch('loadMarketBots');
            })
            .catch(console.error);
        }
    },
};
</script>

<style>
.price {
  font-size: 0.8rem;
  text-align: right;
}
</style>