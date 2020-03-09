<template>
  <v-list subheader>
     <v-subheader>Online</v-subheader>
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
  </v-list>
</template>

<script>
export default {
    props: {
        list: {
          type: Array,
          default: () => [
              {
                  id: 1,
                  name: "Lia Okusawa",
                  photo: "demo-photos/girl-01.png"
              },
              {
                  id: 2,
                  name: "Kira Novotskaya",
                  photo: "demo-photos/girl-02.jpg"
              }
          ]
        }
    },
    methods: {
      onContactClick: function(item) {
        console.debug('item', item);
        this.$router.push({ name: 'Chat', params: { bot: '123' } })
      }
    }
}
</script>