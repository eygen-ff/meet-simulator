<template>

<!-- List of own bots -->

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

        <!-- form -->

        <v-row v-if="!flagShowForm">
          <v-col>
            <v-btn @click="onClickBotCreate">Create bot</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <bot-edit-form 
              v-if="flagShowForm" 
              :input-form="form" 
              v-on:submit="onBotEditFormSubmit"
              v-on:delete="onBotDelete"
            ></bot-edit-form>
          </v-col>
        </v-row>

        <!-- ^ form ^ -->

        <!-- my own bot list --> 

        <v-list subheader v-if="$store.getters.getMyOwnBots.length">
            <v-subheader>My Bots</v-subheader>

            <v-list-item v-for="item in $store.getters.getMyOwnBots" :key="item.name">
                <v-list-item-avatar>
                  <v-img v-if="item.photoUrl" :src="item.photoUrl"></v-img>
                </v-list-item-avatar>
                
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-title class="bot-comment">Chat items: {{item.stat.messageCount}}</v-list-item-title>
                  <v-list-item-title class="bot-comment">Dialogs: {{item.stat.dialogsCount}}</v-list-item-title>
                  <v-list-item-title class="bot-comment">Price: {{item.stat.price}}</v-list-item-title>
                  <v-list-item-title class="bot-comment">Median progress: {{item.stat.medianUserProgress}}%</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon class="list-vertical">
                  <v-btn small @click="onClickBotEdit(item)" class="mb-1">
                    <v-icon class="mr-1">mdi-pencil-outline</v-icon> edit
                  </v-btn>
                  <v-btn small @click="onBotConfig(item)" class="mb-1">
                    <v-icon class="mr-1">mdi-graph</v-icon> story
                  </v-btn>
                  <v-btn v-if="!item.flagPublish" small @click="onBotPublish(item)">
                    <v-icon class="mr-1">mdi-timeline-text</v-icon> publish
                  </v-btn>
                  <v-btn v-if="item.flagPublish" color="indigo darken-1" small @click="onBotUnpublish(item)">
                    <v-icon class="mr-1">mdi-timeline-text</v-icon> unpublish
                  </v-btn>
                </v-list-item-icon>
            </v-list-item>
        </v-list>

        <!-- ^ my own bot list ^ --> 

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
        form: null
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
      },
      onClickBotEdit(item) {
        this.form = item;
        this.flagShowForm = true;
      },
      onBotEditFormSubmit(payload) {
        let actionName = 'createBot';
        if (payload.id) {
          actionName = 'updateBot';
        }
        this.$store.dispatch(actionName, payload)
          .then(() => {
            this.flagShowForm = false;
            this.$store.dispatch('loadMyOwnBots');
          })
          .catch(console.error);
      },
      onBotDelete(payload) {
        this.$store.dispatch('deleteBot', payload)
          .then(() => {
            this.flagShowForm = false;
            this.$store.dispatch('loadMyOwnBots');
          })
          .catch(console.error);
      },
      onBotConfig(bot) {
        this.$router.push({name: 'BotStoryConfigurator', params: { bot: bot.id }})
      },
      onBotPublish(bot) {
        this.$store.dispatch('setBotPublishFlag', {
          botId: bot.id,
          flag: true
        })
          .then(() => {
            this.$store.dispatch('loadMyOwnBots');
          })
          .catch(console.error);
      },
      onBotUnpublish(bot) {
        this.$store.dispatch('setBotPublishFlag', {
          botId: bot.id,
          flag: false
        })
          .then(() => {
            this.$store.dispatch('loadMyOwnBots');
          })
          .catch(console.error);
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