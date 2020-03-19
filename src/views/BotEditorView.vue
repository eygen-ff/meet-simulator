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

        <v-row v-if="!flagShowForm">
          <v-col>
            <v-btn @click="onClickBotCreate">Create bot</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <bot-edit-form v-if="flagShowForm" v-on:submit="onBotEditFormSubmit"></bot-edit-form>
          </v-col>
        </v-row>

        <v-list subheader v-if="$store.getters.getMyOwnBots.length">
            <v-subheader>My Bots</v-subheader>

            <v-list-item v-for="item in $store.getters.getMyOwnBots" :key="item.name">
                <v-list-item-avatar>
                  <v-img v-if="item.photo" :src="item.photo"></v-img>
                </v-list-item-avatar>
                
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-title class="bot-comment">Chat items: {{item.chatItemsCount}}</v-list-item-title>
                  <v-list-item-title class="bot-comment">Dialogs: {{item.dialogsCount}}</v-list-item-title>
                  <v-list-item-title class="bot-comment">Price: {{item.price}}</v-list-item-title>
                  <v-list-item-title class="bot-comment">Median progress: {{item.medianProgress}}%</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon class="list-vertical">
                  <v-btn small @click="onClickBotCreate" class="mb-1">
                    <v-icon class="mr-1">mdi-pencil-outline</v-icon> edit
                  </v-btn>
                  <v-btn small @click="onBotConfig(item)" class="mb-1">
                    <v-icon class="mr-1">mdi-graph</v-icon> story
                  </v-btn>
                  <v-btn small>
                    <v-icon class="mr-1">mdi-timeline-text</v-icon> publish
                  </v-btn>
                </v-list-item-icon>
            </v-list-item>
        </v-list>



      </v-container>
    </v-content>
    
  </v-app>        
    
</template>

<script>
import BotEditForm from '../components/BotEditForm.vue';
export default {
  components: {
    BotEditForm
  },
  props: {},
  data() {
      return {
        flagShowForm: false,
        //bots: [
          //{id: 1, name: 'My bot 1', chatItemsCount: 56, dialogsCount: 0, price: 0, medianProgress: 78}
        //]
      }
  },
  computed: {},
  mounted() {
    this.$store.dispatch('loadMyOwnBots');
  },
  methods: {
      onClickHome() {
        this.$router.push({name: 'Home'})
      },
      onClickBotCreate() {
        this.flagShowForm = true;
        //this.$router.push({name: 'BotConfig'})

      },
      onBotEditFormSubmit(payload) {
        this.$store.dispatch('createBot', payload)
          .then(() => {
            this.flagShowForm = false;
            this.$store.dispatch('loadMyOwnBots');
          })
          .catch(console.error);
      },
      onBotConfig(bot) {
        this.$router.push({name: 'BotStoryConfigurator', params: { bot: bot.id }})
      }
  }
};
</script>

<style lang="scss">
.bot-comment {
  font-size: 0.8rem;
}
.list-vertical {
  flex-direction: column;
}
</style>