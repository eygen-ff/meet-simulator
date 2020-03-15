<template>
    <v-content class="py-0">
        <v-row v-if="text !== null">
            <v-col>

                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-card-title>{{mode}}</v-card-title>
                    <v-card-text>
                        <v-textarea
                            label="Message"
                            no-resize
                            rows="5"
                            v-model="tempText"
                            ></v-textarea>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-bottom-navigation v-if="mode=='actions'">

                    <v-btn @click="onClickNewMessage"><span>New</span><v-icon>mdi-beaker-plus-outline</v-icon></v-btn>
                    <v-btn><span>Delete</span><v-icon>mdi-beaker-remove-outline</v-icon></v-btn>
                    <v-btn><span>Add condition</span><v-icon>mdi-help-network-outline</v-icon></v-btn>
                    <v-btn><span>Add case</span><v-icon>mdi-graph</v-icon></v-btn>

                </v-bottom-navigation>  

                <v-bottom-navigation v-if="mode=='messageEdit'">

                    <v-btn @click="onClickApplyMessage"><span>Apply</span><v-icon>mdi-check</v-icon></v-btn>

                </v-bottom-navigation>  


            </v-col>
        </v-row>

  </v-content>

</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            default: () => 'actions'
        },
        message: {
            type: Object,
            default: () => {}
        },
        text: {
            type: String,
            default: () => null
        }
    },
    data() {
        return {
            tempText: ''
        }
    },
    methods: {
        onClickApplyMessage() {
            this.$emit('apply-message', {
                mode: this.mode,
                text: this.tempText,
                message: this.message
            });
            this.tempText = '';
        },
        onClickNewMessage() {
            this.$emit('new-message');
        }
    },
    watch: {
        text(value) {
            console.debug('watch.text', value);
            this.tempText = value;
        }
    }
}
</script>