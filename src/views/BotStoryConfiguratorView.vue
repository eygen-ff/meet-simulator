<template>

<v-app id="inspire">
    <v-app-bar
      app
      dark
    >
      <v-btn icon @click="onClickBotEdit">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-toolbar-title> Bot Story Configurator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>

        <v-row justify="center">
          <v-expansion-panels accordion v-model="toggledMessage">
            <v-expansion-panel
              v-for="(item,i) in messages"
              :key="i"
            >
              <v-expansion-panel-header># {{item.id}}</v-expansion-panel-header>
              <v-expansion-panel-content class="bot-answer-item">
                
                <bot-editor-message 
                  :id="item.id" 
                  :message="item.text" 
                  :next="item.next" 
                  :cases="item.cases"
                  v-on:edit-message="onEditBotMessage"
                  v-on:action-message="onBotMessageAction"
                  v-on:edit-next-item="onEditNextItem"
                  v-on:edit-case-item="onEditCaseItem"
                >
                </bot-editor-message>

              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>

      </v-container>

  
    </v-content>

    <v-footer app  class="panel-open" v-if="actionToolbar.flagShow">
      <bot-editor-actions 
        :mode="actionToolbar.mode" 
        :message="currentMessage" 
        :text="actionToolbar.text"
        v-on:new-message="onBotActionNewMessage"
        v-on:apply-message="onBotActionApplyMessage"
      ></bot-editor-actions>
    </v-footer>
  </v-app>        
    
</template>

<script>
import BotEditorMessage from '../components/BotEditorMessage.vue';
import BotEditorActions from '../components/BotEditorActions.vue';

export default {
  components: {BotEditorMessage, BotEditorActions},
  props: {
  },
  data() {
      return {
        messages: [
          {
            id: 1,
            text: 'Who we are? Angels or demons? Many points of obliviation or changing the respondius mistakes?',
            cases: [
              {
                text: 'There are no correct answer. I m just following my destiny',
                points: 10
              },
              {
                text: 'All is true',
                points: 1
              }
            ],
            next: {
              any: 2,
              points: {
                10: 3,
                15: 4
              }
            }
          }
        ],
        actionToolbar: {
          flagShow: false,
          mode: null,
          text: null
        },
        toggledMessage: -1
      }
  },
  computed: {
    currentMessage() {
      return this.toggledMessage > -1 ? this.messages[this.toggledMessage] : null;
    }
  },
  methods: {
      onClickBotEdit: function() {
          this.$router.push({name: 'BotEditor'})
      },
      onBotMessageAction: function() {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.mode = 'actions';
        this.actionToolbar.text = null;
      },
      onEditBotMessage: function() {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.mode = 'messageEdit';
        this.actionToolbar.text = this.messages[this.toggledMessage].text;
      },
      onEditNextItem: function() {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.mode = 'nextEdit';
      },
      onEditCaseItem: function() {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.mode = 'caseEdit';
      },
      onBotActionApplyMessage: function(payload) {
        console.debug('onBotActionApplyMessage', payload);
        this.actionToolbar.mode = null;
        this.actionToolbar.text = null;
        this.$nextTick(() => {this.actionToolbar.flagShow = false;});
        this.messages[this.toggledMessage].text = payload.text;
      },
      onBotActionNewMessage() {
        this.messages.push({
          id: new Date().getTime(),
          text: '',
          cases: [],
          next: {
            any: null,
            points: []
          }
        });
        this.toggledMessage = this.messages.length-1;
      }
  },
  watch: {
    toggledMessage(value) {
      if (value > -1) {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.mode = 'actions';
      } else {
        this.actionToolbar.flagShow = false;
      }
    }
  }
};
</script>

<style lang="scss">
.panel-open {
  max-height: 50%;
}
.v-list-item__title.wrap {
  white-space: normal;
}
.bot-answer-item {
  .v-expansion-panel-content__wrap {
    padding: 0.5rem;
  }
}
</style>