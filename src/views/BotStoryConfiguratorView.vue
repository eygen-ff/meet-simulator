<template>

<v-app id="configurator">
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
        :current-id="currentMessage ? currentMessage.id : -1"
        :bot-message="actionToolbar.botMessage"
        :next-item="actionToolbar.nextItem"
        :case-item="actionToolbar.caseItem"
        v-on:new-message="onBotActionNewMessage"
        v-on:add-condition="onBotActionAddCondition"
        v-on:add-case="onBotActionAddCase"
        v-on:apply-bot-message="onBotActionApplyBotMessage"
        v-on:cancel-bot-message="onBotActionCancelBotMessage"
        v-on:apply-next-item="onBotActionApplyNextItem"
        v-on:cancel-next-item="onBotActionCancelNextItem"
        v-on:delete-next-item="onBotActionDeleteNextItem"
        v-on:apply-case-item="onBotActionApplyCaseItem"
        v-on:cancel-case-item="onBotActionCancelCaseItem"
        v-on:delete-case-item="onBotActionDeleteCaseItem"
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
            id: '111',
            text: 'Who we are? Angels or demons? Many points of obliviation or changing the respondius mistakes?',
            cases: [
              {
                id: 22,
                text: 'There are no correct answer. I m just following my destiny',
                points: 10
              },
              {
                id: 33,
                text: 'All is true',
                points: 1
              }
            ],
            next: [
              {id:1, points: 0, goto:2},
              {id:2, points: 10, goto:3}
            ]
          }
        ],
        actionToolbar: {
          flagShow: false,
          botMessage: '',
          nextItem: null,
          caseItem: null
        },
        toggledMessage: -1
      }
  },
  computed: {
    currentMessage() {
      return this.toggledMessage > -1 ? this.messages[this.toggledMessage] : null;
    },
    listMessageIds() {
      return this.messages.map(value => '#' + value.id + ' /' + value.text.substr(0,20) + ' ...');
    }
  },
  methods: {
      onClickBotEdit: function() {
          this.$router.push({name: 'BotEditor'})
      },
      onBotMessageAction: function() {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.botMessage = '';
      },
      onEditBotMessage: function() {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.caseItem = null;
        this.actionToolbar.nextItem = null;
        this.actionToolbar.botMessage = this.messages[this.toggledMessage].text;
      },
      onEditNextItem: function(payload) {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.caseItem = null;
        this.actionToolbar.botMessage = '';
        this.actionToolbar.nextItem = {
          id: payload.id,
          points: payload.points,
          goto: payload.goto,
          list: this.listMessageIds
        };
      },
      onEditCaseItem: function(payload) {
        this.actionToolbar.flagShow = true;
        this.actionToolbar.nextItem = null;
        this.actionToolbar.botMessage = '';
        this.actionToolbar.caseItem = {
          id: payload.id,
          points: payload.points,
          text: payload.text
        };
      },
      onBotActionApplyBotMessage: function(payload) {
        this.actionToolbar.botMessage = '';
        this.messages[this.toggledMessage].text = payload.text;
      },
      onBotActionCancelBotMessage: function() {
        this.actionToolbar.botMessage = '';
      },

      onBotActionNewMessage() {
        this.messages.push({
          id: String(new Date().getTime()).substr(-5),
          text: '?',
          cases: [],
          next: [{id: String(new Date().getTime()).substr(-5), points: 0, goto: null}]
        });
        this.toggledMessage = this.messages.length-1;
      },
      onBotActionAddCondition() {
        let maxPoint = 0;
        if (this.messages[this.toggledMessage].next.length >= 6) {
          throw Error('To many conditions');
        }
        for (let i in this.messages[this.toggledMessage].next) {
          if (this.messages[this.toggledMessage].next[i].points > maxPoint) {
            maxPoint = this.messages[this.toggledMessage].next[i].points;
          }
        }
        if (maxPoint >= 100) {
          throw Error('Maximim value of points');
        }
        this.messages[this.toggledMessage].next.push({id: String(new Date().getTime()).substr(-5), points: maxPoint+1, goto: null});
      },
      onBotActionAddCase() {
        if (this.messages[this.toggledMessage].cases.length >= 6) {
          throw Error('To many cases');
        }
        this.messages[this.toggledMessage].cases.push({id: String(new Date().getTime()).substr(-5), points: 0, text: ''});
      },

      onBotActionApplyNextItem(payload) {
        let existedPoints = [];
        for (let i in this.messages[this.toggledMessage].next) {
          if (this.messages[this.toggledMessage].next[i].id === payload.id) {
            continue;
          }
          if (!existedPoints.includes(this.messages[this.toggledMessage].next[i].points)) {
            existedPoints.push(this.messages[this.toggledMessage].next[i].points);
          }
        }
        for (let i in this.messages[this.toggledMessage].next) {
          if (existedPoints.includes(payload.points)) {
            throw Error('Points value already defined in this message');
          }
          if (!payload.goto) {
            throw Error('No target message defined');
          }
          if (this.messages[this.toggledMessage].next[i].id === payload.id) {
            this.$set(this.messages[this.toggledMessage].next, i, payload);
          }
        }
        this.actionToolbar.nextItem = null;
      },
      onBotActionCancelNextItem() {
        this.actionToolbar.nextItem = null;
      },
      onBotActionDeleteNextItem(payload) {
        for (let i in this.messages[this.toggledMessage].next) {
          if (this.messages[this.toggledMessage].next[i].id === payload.id) {
            this.messages[this.toggledMessage].next.splice(i, 1);
          }
        }
        this.actionToolbar.nextItem = null;
      },

      onBotActionApplyCaseItem(payload) {
        this.actionToolbar.caseItem = null;
        for (let i in this.messages[this.toggledMessage].cases) {
          if (this.messages[this.toggledMessage].cases[i].id === payload.id) {
            this.$set(this.messages[this.toggledMessage].cases, i, payload);
          }
        }
      },
      onBotActionCancelCaseItem() {
        this.actionToolbar.caseItem = null;
      },
      onBotActionDeleteCaseItem(payload) {
        for (let i in this.messages[this.toggledMessage].cases) {
          if (this.messages[this.toggledMessage].cases[i].id === payload.id) {
            this.messages[this.toggledMessage].cases.splice(i, 1);
          }
        }
        this.actionToolbar.caseItem = null;
      },
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
#configurator {
  min-width: 300px;
}
</style>