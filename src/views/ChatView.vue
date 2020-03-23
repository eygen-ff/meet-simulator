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

        <template v-for="item in $store.getters.getChatMessages">
          <Message 
            :key="item.id" 
            :text="item.text" 
            :send-at="new Date(item.sendAt)" 
            :photo="item.photoUrl"
            :flag-is-owner="item.flagIsOwner" 
            :flag-is-last="item.id === $store.getters.getChatLastMessage.id"
            ></Message>
        </template>

      </v-container>
      
    </v-content>
    <v-footer app v-if="$store.getters.getChatAnswerCases">
      <answer-panel :cases="$store.getters.getChatAnswerCases" v-on:select="onSelectAnswerCase"></answer-panel>
    </v-footer>

    <bot-info-dialog 
      :flag-show="flagShowBotInfo" 
      :photo="$store.getters.getBotPhoto"
      :info="$store.getters.getBotInfo"
      :rate="$store.getters.getBotRate"
      :gallery="$store.getters.getBotGallery"
      v-on:close="onCloseBotInfoDialog"></bot-info-dialog>

    <v-snackbar
      top
      color="red darken-4"
      v-model="error.flag"
      :timeout="5000"
    >
      {{ error.message }}
    </v-snackbar>
    
  </v-app>
</template>

<script>
import Message from "../components/Message.vue";
import BotInfoDialog from "../components/BotInfoDialog.vue";
import AnswerPanel from "../components/AnswerPanel.vue";
import {mixin as VueTimers} from 'vue-timers';

export default {
  components: {
    Message, BotInfoDialog, AnswerPanel
  },
  mixins: [VueTimers],
  timers: {
    renderMessages: { time: 12000, //autostart: true, //repeat: true 
    },
    onClickHome: {time: 5000, autostart: false}
  },
  data: () => ({
    botId: null,
    flagShowBotInfo: false,
    error: {
      flag: false,
      message: ''
    }
  }),
  mounted: function() {
    this.botId = this.$router.currentRoute.params.bot;
    Promise.all([
      this.$store.dispatch("loadBot", { id: this.botId }),
      this.$store.dispatch("loadMessages", { botId: this.botId })
    ]).then(() => {
      if (document.querySelector("#lastMsg")) {
        setTimeout(() => {
          this.$vuetify.goTo("#lastMsg");
        }, 100);
      }
    }).catch((e) => {
      console.error('Chat.error', e);
      this.showError(e ? e.message : 'Произошла ошибка при загрузке данных');
    });
      
  },
  methods: {
    showError(errorMessage) {
      this.error.message = errorMessage;
      this.error.flag = true;
      this.$timer.start('onClickHome');
    },
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
      this.$store.dispatch('selectCase', {
        botId: this.botId,
        caseId: answerCase.id
      }).then(() => {
        //this.$store.getChatMessages();
        this.$timer.start('renderMessages');
      });
    },
    renderMessages: function() {
      console.log('render messages');
      this.$store.dispatch('renderChat');
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