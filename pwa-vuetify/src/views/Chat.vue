<template>

<v-app id="inspire">
    <v-app-bar
      app
      dark
      dense
    >
      <v-btn icon @click="onClickHome">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-btn icon @click="onClickBotInfo">
        <v-img v-if="$store.getters.getBotPhoto" :src="$store.getters.getBotPhoto" max-width="30"></v-img>
      </v-btn>
      <v-toolbar-title v-if="$store.getters.getBotName">{{$store.getters.getBotName}}</v-toolbar-title>
      <v-btn icon>
        <v-icon :class="getBotStatusIconColor">{{getBotStatusIcon}}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title> Dating simulator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid id="messages" ref="messagesContainer">
      
        <v-row no-gutters align="start" justify="center">
          <v-col cols="10" class="text-left">
            <v-card dark>
            <v-card-subtitle>
                Listen to your favorite artists and albums whenever and wherever, online and offline.
                <div class="blue-grey--text text-right">
                    12.13 12:12
                </div>
            </v-card-subtitle>
          </v-card>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>

        <v-row no-gutters align="start" justify="center">
          <v-col cols="10" class="text-left">
            <v-card dark>
            <v-card-subtitle>
                Listen to your favorite artists and albums whenever and wherever, online and offline.
                <div class="blue-grey--text text-right">
                    12.13 12:12
                </div>
            </v-card-subtitle>
          </v-card>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>

        <v-row no-gutters align="start" justify="center">
          <v-col cols="2"></v-col>
          <v-col cols="10" class="text-left">
            <v-card dark color="green darken-2">
            <v-card-subtitle>
                Listen to your favorite artists and albums whenever and wherever, online and offline.
                <div class="black--text text-right">
                    12.13 12:12
                </div>
            </v-card-subtitle>
          </v-card>
          </v-col>  
        </v-row>

        <v-row no-gutters align="start" justify="center">
          <v-col cols="10" class="text-left">
            <v-card dark>
                <v-card-subtitle>
                    <v-img v-if="$store.getters.getBotPhoto" :src="$store.getters.getBotPhoto"></v-img>
                    <div class="text-right">
                        Photo added to gallery - 12.13 12:12
                    </div>
                </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>

        <v-row no-gutters align="start" justify="center" id="lastMsg">
          <v-col cols="2"></v-col>
          <v-col cols="10" class="text-left">
            <v-card dark color="green darken-2">
            <v-card-subtitle>
                Listen to your favorite artists and albums whenever and wherever, online and offline.
                <div class="black--text text-right">
                    12.13 12:12
                </div>
            </v-card-subtitle>
          </v-card>
          </v-col>  
        </v-row>

      </v-container>
    </v-content>
    <v-footer app>
      <span class="white--text">&copy; effus labs</span>
    </v-footer>

    <v-dialog
      v-model="flagShowBotInfo" 
      fullscreen hide-overlay transition="dialog-top-transition"
    >
      <v-card>
        <v-card-title class="headline">Bot info</v-card-title>

    <v-container>
        
        <v-row>
            <v-col>
                <v-avatar
                    class="ma-3"
                    size="125"
                    tile
                >
                    <v-img :src="$store.getters.getBotPhoto"></v-img>
                </v-avatar>
            </v-col>

            <v-col>
                <v-card-text>
                    Some bot information for user
                </v-card-text>
            </v-col>

        </v-row>
            
        <v-row>
         <v-col>
            <v-progress-linear
                color="amber"
                height="20"
                value="10"
                striped
            >
                Рейтинг отношений
            </v-progress-linear>    
            </v-col>
        </v-row>

        <v-row>
            <v-col sm="4" xs="0"></v-col>
            <v-col sm="4" xs="12">
                <v-carousel v-if="$store.getters.getBotGallery" height="300">
                    <v-carousel-item v-for="(item,i) in $store.getters.getBotGallery" :key="i" :src="item"></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col sm="4" xs="0"></v-col>
        </v-row>
        
    </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="flagShowBotInfo = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>        
    
</template>

<script>
export default {
    data: () => ({
        flagShowBotInfo: false
    }),
    mounted: function() {
        this.$store.dispatch('loadBot', {id:this.$router.currentRoute.params.id}).then(() => {
            setTimeout(() => {
                this.$vuetify.goTo('#lastMsg');
            }, 100);
            
        });
    },
    methods: {
        onClickHome: function() {
            this.$router.push({name: 'Home'})
        },
        onClickBotInfo: function() {
            this.flagShowBotInfo = true;
        }
    },
    computed: {
        getBotStatusIcon: function() {
            const statuses = {
                0: 'phonelink_erase',
                1: 'chat_bubble_outline',
                2: 'chat_bubble_outline',
                3: 'textsms'
            };
            const status = this.$store.getters.getBotStatus;
            return status !== null ? statuses[status] : statuses[0];
        },
        getBotStatusIconColor: function() {
            const statuses = {
                0: 'blue-grey--text',
                1: 'green--text accent-4',
                2: 'blue-grey--text darken-1',
                3: 'green--text'
            };
            const status = this.$store.getters.getBotStatus;
            return status !== null ? statuses[status] : statuses[0];
        }
    },
};
</script>