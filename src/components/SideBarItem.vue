<template>
    <v-list-item link>
        <v-list-item-action>
            <v-icon>{{icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content @click="onClick">
            <v-list-item-title>{{text}}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: '?'
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
}
</script>