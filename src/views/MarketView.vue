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

            <v-list-item v-for="item in girls" :key="item.name">
                <v-list-item-avatar>
                  <v-img v-if="item.photo" :src="item.photo"></v-img>
                </v-list-item-avatar>
                
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-title class="price green--text"> {{item.price ? item.price : 'Free'}} </v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn color="teal darken-4 ml-2">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-list-item-icon>
            </v-list-item>

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
export default {
    props: {
    },
    computed: {
      girls() {
        let list = [];
        for (let i in this.$store.getters.getMarketBots) {
          //if ([1,3].includes(this.list[i].status)) {
            list.push(this.$store.getters.getMarketBots[i]);
          //}
        }
        return list;
      }
    },
    methods: {
        onClickHome: function() {
            this.$router.push({name: 'Home'})
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