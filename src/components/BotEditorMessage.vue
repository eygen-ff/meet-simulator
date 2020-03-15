<template>
    <v-card class="mx-auto" outlined>

        <!-- div class="overline mb-4">Фраза #12</div -->
        <v-card-text class="mb-1 px-2 py-1">
          
          <v-container>
            <v-row>
              <v-col class="green darken-4" cols="9" @click="onClickBotMessageEdit">
                {{message}}
              </v-col>

              <v-col cols="3">
                <v-btn @click="onClickBotMessageEdit"><v-icon>mdi-comment-edit</v-icon></v-btn>
                <v-btn @click="onClickBotMessageActions"><v-icon>mdi-message-settings-outline</v-icon></v-btn>
              </v-col>

            </v-row>

            <!-- Next message definition -->
            <v-row>
              <v-col class="px-0 py-0">

                <v-list>

                  <v-list-item class="elevation-1 blue-grey darken-3" v-for="(item,i) in getNextItems" :key="i" @click="onClickNextItem(item)">
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-subtitle class="col-3 py-1 my-0">
                      <v-chip small label>#{{item.id}}</v-chip>
                    </v-list-item-subtitle>
                    <v-list-item-icon class="col-2 py-1 my-0 mt-1">
                      <v-btn v-if="!item.any" fab dark x-small @click="onClickNextItem(item)"><v-icon dark>mdi-pencil</v-icon></v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                  
                </v-list>
              
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
   
    <!-- answer cases -->

    <v-card-actions class="px-1 py-1">
      
      <v-list two-line dense class="py-0">
        <v-list-item class="elevation-1 mb-1" v-for="(item,i) in cases" :key="i" @click="onClickCaseItem(item)">
          <v-list-item-content class="grey darken-4">
            <v-list-item-title class="wrap">{{item.text}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
              <v-list-item-action-text>
                <v-chip small label class="mb-1" text-color="white">
                  <v-icon v-if="item.points > 0">mdi-plus</v-icon> 
                  <v-icon v-if="item.points < 0">mdi-minus</v-icon> 
                  {{item.points}}
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
        type: Object,
        default: () => ({
          any: null,
          points: []
        })
      },
      cases: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      getNextItems() {
        let items = [];
        items.push({title: 'Any', id: this.next.any, any:true});
        if (!this.next.points) {
          return items;
        }
        for (let i in this.next.points) {
          items.push({
            title: '>' + i,
            id: this.next.points[i]
          });
        }
        return items;
      }
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