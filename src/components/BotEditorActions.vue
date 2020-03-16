<template>
    <v-content class="py-0">
        <v-row>
            <v-col>
                <v-card v-if="botMessage" class="mx-auto" outlined>
                    <v-card-title>Message editor</v-card-title>
                    <v-card-text>
                        <v-textarea
                            label="Message"
                            no-resize
                            rows="5"
                            v-model="tempText"
                            ></v-textarea>
                    </v-card-text>
                </v-card>
                <v-card v-if="nextItem" class="mx-auto" outlined>
                    <v-card-title>Next message condition</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col class="body-1 pt-1">
                                    Greater than
                                </v-col>
                                <v-col cols="10" class="py-0">
                                    <v-slider
                                        v-model="tempPoints"
                                        color="blue darken-4"
                                        min="0"
                                        max="100"
                                        step="1"
                                        :label="tempPoints.toFixed()"
                                    ></v-slider>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="body-1 pt-5">
                                    Next message
                                </v-col>
                                <v-col cols="10" class="py-0">
                                    <v-autocomplete label="ID" :items="nextItem.items" item-text="name">
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                        
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-bottom-navigation v-if="botMessage">
                    <v-btn @click="onClickApplyBotMessage" class="primary"><span>Apply</span><v-icon>mdi-check</v-icon></v-btn>
                    <v-btn @click="onClickCancelBotMessage" class="secondary"><span>Cancel</span><v-icon>mdi-cancel</v-icon></v-btn>
                </v-bottom-navigation>  

                <v-bottom-navigation v-if="nextItem">
                    <v-btn @click="onClickApplyBotMessage" class="primary"><span>Apply</span><v-icon>mdi-check</v-icon></v-btn>
                    <v-btn @click="onClickCancelBotMessage" class="secondary"><span>Cancel</span><v-icon>mdi-cancel</v-icon></v-btn>
                </v-bottom-navigation>  

                <v-bottom-navigation v-else>

                    <v-btn @click="onClickNewMessage"><span>New</span><v-icon>mdi-beaker-plus-outline</v-icon></v-btn>
                    <v-btn><span>Delete</span><v-icon>mdi-beaker-remove-outline</v-icon></v-btn>
                    <v-btn><span>Add condition</span><v-icon>mdi-help-network-outline</v-icon></v-btn>
                    <v-btn><span>Add case</span><v-icon>mdi-graph</v-icon></v-btn>
                    <v-btn><span>Save</span><v-icon>mdi-cloud-upload</v-icon></v-btn>

                </v-bottom-navigation>  

            </v-col>
        </v-row>

  </v-content>

</template>

<script>
export default {
    props: {
        botMessage: {
            type: String,
            default: () => ''
        },
        nextItem: {
            type: Object,
            default: () => ({
                items: [
                    {id:3, name:'Nextitem1'}
                ]
            })
        }
    },
    data() {
        return {
            tempText: '',
            tempPoints: 0
        }
    },
    methods: {
        onClickApplyBotMessage() {
            const text = this.tempText;
            this.tempText = '';
            this.$emit('apply-bot-message', {
                text: text,
            });
        },
        onClickCancelBotMessage() {
            this.tempText = '';
            this.$emit('cancel-bot-message');
        },
        onClickNewMessage() {
            this.$emit('new-message');
        }
    },
    watch: {
        botMessage(value) {
            console.debug('watch.botMessage', value);
            this.tempText = value;
        }
    }
}
</script>