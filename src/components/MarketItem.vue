<template>
    <div>
    <v-list-item v-for="item in list" :key="item.name">

        <v-list-item-avatar>
            <v-img v-if="item.photoUrl" :src="item.photoUrl"></v-img>
        </v-list-item-avatar>
        
        <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-title class="price green--text"> {{item.stat.price ? item.stat.price : 'Free'}} credits </v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
            <v-btn color="teal darken-4 ml-2" @click="onClickAdd(item)">
            <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-list-item-icon>
    </v-list-item>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onClickAdd(item) {
            this.$emit('add', item);
        }
    }
}
</script>