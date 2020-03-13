<template>
  <v-list subheader>
    <v-subheader v-if="list.length">Online</v-subheader>
    <v-list-item
        v-for="item in list"
        :key="item.name"
        @click="onContactClick(item)"
      >
        <v-list-item-avatar>
          <v-img v-if="item.photo" :src="item.photo"></v-img>
        </v-list-item-avatar>
        
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
        </v-list-item-icon>
    </v-list-item>

    <v-list-item v-if="list.length === 0">
      <v-list-item-content>
          <v-list-item-title>Отсутствуют собеседники, посетите <router-link to="Market">BotMarket</router-link> </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
    props: {
        list: {
          type: Array,
          default: () => [
              /*{
                  id: 1,
                  name: "Lia Okusawa",
                  photo: "demo-photos/girl-01.png"
              },
              {
                  id: 2,
                  name: "Kira Novotskaya",
                  photo: "demo-photos/girl-02.jpg"
              }*/
          ]
        }
    },
    mounted: function() {
      this.$store.dispatch('resetBot');
    },
    methods: {
      onContactClick: function(item) {
        this.$router.push({ name: 'Chat', params: { bot: item.id } })
      }
    }
}
</script>