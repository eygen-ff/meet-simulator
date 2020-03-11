<template>
    <v-container fluid>
          <v-btn v-for="(caseItem, i) in cases" :key="i" block tile class="mb-1 answer-btn" outlined @click="onClickCase(caseItem)">
            <v-icon class="mr-2">mdi-message-text-outline</v-icon>
            {{caseItem.text}}
          </v-btn>
         
      </v-container>
</template>

<script>
export default {
    props: {
        cases: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onClickCase: function(caseItem) {
            this.$emit('select', caseItem);
        }
    }
}
</script>