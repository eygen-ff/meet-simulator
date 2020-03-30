<template>
    <v-card class="mx-auto" outlined>

        <!-- div class="overline mb-4">Фраза #12</div -->
        <v-card-text class="mb-1 px-2 py-1">
          
          <v-container fluid>
            <v-row >
              <v-col class="px-0 py-0 mb-4" cols="9" sm="6" @click="onClickBotMessageEdit">
                <v-label class="mb-2">Bot message</v-label>
                <v-card-text v-if="!isFirst" class="px-1 py-1 green darken-4 elevation-6 message-text">{{message}}</v-card-text>
                <v-card-text v-if="isFirst" class="px-1 py-1 elevation-6">[First message is empty, user starts dialog]</v-card-text>
              </v-col>

              <v-col cols="3" sm="6" class="mt-2">
                <v-btn v-if="!isFirst" class="px-1 message-edit-btn" @click="onClickBotMessageEdit"><v-icon>mdi-comment-edit</v-icon></v-btn>
                <v-btn @click="onClickBotMessageActions" class="message-actions-btn"><v-icon>mdi-message-settings-outline</v-icon></v-btn>
              </v-col>

            </v-row>

            <!-- Next message definition -->
            <v-row>
              <v-col class="px-0 py-0 col-sm-6">
                <v-label class="mb-1">Next message conditions</v-label>

                <v-list class="py-0">

                  <v-list-item class="elevation-1 mb-1 blue-grey darken-3 next-item" v-for="(item,i) in this.next" 
                    :key="i" @click="onClickNextItem(item)">
                    <v-list-item-title> > {{item.points}}</v-list-item-title>
                    <v-list-item-subtitle class="col-4 py-1 my-0">
                      <v-btn v-if="item.goto">{{ isNaN(parseInt(item.goto)) ? item.goto : '#' + item.goto}}</v-btn>
                    </v-list-item-subtitle>
                    <v-list-item-icon class="col-2 py-1 my-0 mt-1 justify-end">
                      <v-btn fab x-small><v-icon dark>mdi-pencil</v-icon></v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                  
                </v-list>
              
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
   
    <!-- answer cases -->
    <v-container fluid class="mt-0 pt-0 pb-0">
    <v-row>
      <v-col class="py-0 pl-2">
        <v-label class="mb-1">User answer cases</v-label>
      </v-col>
    </v-row>
    </v-container>

    <v-card-actions class="px-0 py-0">
      
      <v-list dense class="py-0 px-2 col-sm-8" width="100%">
        <v-list-item class="elevation-1 mb-1 blue-grey darken-4 user-answer-case" v-for="(item,i) in cases" :key="i" @click="onClickCaseItem(item)">
          <v-list-item-content class="">
            <v-list-item-title class="wrap">{{item.text}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="pt-0">
              <v-list-item-action-text>
                <v-chip small label class="mb-1" text-color="white">
                  {{item.points > 0 ? '+' + item.points : (0 > item.points ? '+' + item.points : '0') }}
                </v-chip>
              </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
    props: {
      id: {
        type: Number,
        default: null
      },
      message: {
          type: String,
          default: ''
      },
      next: {
        type: Array,
        default: () => ([])
      },
      cases: {
        type: Array,
        default: () => []
      },
      isFirst: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      
    },
    methods: {
      onClickBotMessageActions() {
        this.$emit('action-message', this.message);
      },
      onClickBotMessageEdit() {
        this.$emit('edit-message', this.message);
      },
      onClickNextItem(item) {
        this.$emit('edit-next-item', item);
      },
      onClickCaseItem(item) {
        this.$emit('edit-case-item', item);
      }
    }
}
</script>