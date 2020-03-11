<template>
  <v-app id="inspire">
    <v-app-bar app dark dense>
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
      <v-toolbar-title>Dating simulator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid id="messages" ref="messagesContainer">

        <Message text="first from me" :flag-is-owner="true" :send-at="new Date()"></Message>
        <Message text="reply from bot" :send-at="new Date()"></Message>
        <Message text="second from me" :flag-is-owner="true" :send-at="new Date()" :flag-is-last="true"></Message>

      </v-container>
      
    </v-content>
    <v-footer app>
      <answer-panel :cases="answers" v-on:select="onSelectAnswerCase"></answer-panel>
    </v-footer>

    <bot-info-dialog :flag-show="flagShowBotInfo" v-on:close="onCloseBotInfoDialog"></bot-info-dialog>
    
  </v-app>
</template>

<script>
import Message from "../components/Message.vue";
import BotInfoDialog from "../components/BotInfoDialog.vue";
import AnswerPanel from "../components/AnswerPanel.vue";

export default {
  components: {
    Message, BotInfoDialog, AnswerPanel
  },
  data: () => ({
    flagShowBotInfo: false,
    answers: [
      {id: 1, text: 'Case 1'},
      {id: 2, text: 'Case 2'},
      {id: 3, text: 'Case 3'},
    ],
    messages: []
  }),
  mounted: function() {
    this.$store
      .dispatch("loadBot", { id: this.$router.currentRoute.params.id })
      .then(() => {
        setTimeout(() => {
          this.$vuetify.goTo("#lastMsg");
        }, 100);
      });
  },
  methods: {
    onClickHome: function() {
      this.$router.push({ name: "Home" });
    },
    onClickBotInfo: function() {
      this.flagShowBotInfo = true;
    },
    onCloseBotInfoDialog: function() {
      this.flagShowBotInfo = false;
    },
    onSelectAnswerCase: function(answerCase) {
      console.log('onSelectAnswerCase', answerCase);
    }
  },
  computed: {
    getBotStatusIcon: function() {
      const statuses = {
        0: "phonelink_erase",
        1: "chat_bubble_outline",
        2: "chat_bubble_outline",
        3: "textsms"
      };
      const status = this.$store.getters.getBotStatus;
      return status !== null ? statuses[status] : statuses[0];
    },
    getBotStatusIconColor: function() {
      const statuses = {
        0: "blue-grey--text",
        1: "green--text accent-4",
        2: "blue-grey--text darken-1",
        3: "green--text"
      };
      const status = this.$store.getters.getBotStatus;
      return status !== null ? statuses[status] : statuses[0];
    }
  }
};
</script>

<style lang="scss">
.answer-btn {
  text-transform: none;
  font-weight: 100;
  text-align: left;
  justify-content: left;
  height: auto !important;
  padding: 1rem !important;
  .v-btn__content {
    white-space: normal;
    width: 100%;
  }
}
</style>