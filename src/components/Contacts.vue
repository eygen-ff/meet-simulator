<template>
  <v-list subheader>
    <v-subheader v-if="online.length">Online</v-subheader>
    <v-list-item v-for="item in online" :key="item.name" @click="onContactClick(item)">
        <v-list-item-avatar>
          <v-img v-if="item.photoUrl" :src="item.photoUrl"></v-img>
        </v-list-item-avatar>
        
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="msgColor(item)">chat_bubble</v-icon>
        </v-list-item-icon>
    </v-list-item>

    <v-subheader v-if="offline.length">Offline</v-subheader>
    <v-list-item v-for="item in offline" :key="item.name">
        <v-list-item-avatar>
          <v-img v-if="item.photoUrl" :src="item.photoUrl"></v-img>
        </v-list-item-avatar>
        
        <v-list-item-content>
          <v-list-item-title v-text="item.name" class="blue-grey--text"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          
        </v-list-item-icon>
    </v-list-item>

    <v-list-item v-if="list.length === 0">
      <v-list-item-content>
          <v-list-item-title>Отсутствуют собеседники, посетите </v-list-item-title>
          <v-list-item-title class="mt-2">
            <v-btn block rounded class="bot-market-btn lime lighten-2 black--text" @click="onMarketClick">
              <v-icon>apps</v-icon> 
              BotMarket
            </v-btn>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
    props: {
        list: {
          type: Array,
          default: () => []
        }
    },
    computed: {
      online() {
        let online = [];
        for (let i in this.list) {
          if ([1,3].includes(this.list[i].status)) {
            online.push(this.list[i]);
          }
        }
        return online;
      },
      offline() {
        let offline = [];
        for (let i in this.list) {
          if ([0,2].includes(this.list[i].status)) {
            offline.push(this.list[i]);
          }
        }
        return offline;
      }
    },
    mounted: function() {
      this.$store.dispatch('resetBot');
    },
    methods: {
      onContactClick(item) {
        this.$router.push({ name: 'Chat', params: { bot: item.id } })
      },
      onMarketClick() {
        this.$router.push({ name: 'Market'})
      },
      msgColor(item) {
        let clas = '';
        if (item.status === 1) {
          clas = 'grey';
        }
        if (item.status === 3) {
          clas = 'green';
        }
        return clas;
      }
    }
}
</script>