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
                <v-card v-if="nextItem" class="mx-auto py-0" outlined>
                    <v-card-title>Next message condition</v-card-title>
                    <v-card-text>
                        <v-container class="py-0">
                            <v-row>
                                <v-col class="body-1 pt-1 pb-0">
                                    Greater than
                                </v-col>
                                <v-col cols="10" class="py-0">
                                    <v-slider
                                        dense
                                        :disabled="flagFreezePoints"
                                        v-model="tempPoints"
                                        color="blue darken-4"
                                        min="0"
                                        max="100"
                                        step="1"
                                        :label="String(tempPoints)"
                                    ></v-slider>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="body-1 pt-2 pb-0">
                                    Next message
                                </v-col>
                                <v-col cols="10" class="py-0">
                                    <v-combobox label="ID" v-model="tempComboId" :items="comboMessageList"></v-combobox>
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
                    <v-btn @click="onClickApplyNextItem" class="primary"><span>Apply</span><v-icon>mdi-check</v-icon></v-btn>
                    <v-btn @click="onClickCancelNextItem" class="secondary"><span>Cancel</span><v-icon>mdi-cancel</v-icon></v-btn>
                </v-bottom-navigation>  

                <v-bottom-navigation v-else>

                    <v-btn class="px-0" @click="onClickNewMessage"><span>New</span><v-icon>mdi-beaker-plus-outline</v-icon></v-btn>
                    <v-btn class="px-0" @click="onClickDeleteMessage"><span>Delete</span><v-icon>mdi-beaker-remove-outline</v-icon></v-btn>
                    <v-btn class="px-0" @click="onClickAddCondition"><span>Add condition</span><v-icon>mdi-help-network-outline</v-icon></v-btn>
                    <v-btn class="px-0"><span>Add case</span><v-icon>mdi-graph</v-icon></v-btn>
                    <v-btn class="px-0"><span>Save</span><v-icon>mdi-cloud-upload</v-icon></v-btn>

                </v-bottom-navigation>  

            </v-col>
        </v-row>

  </v-content>

</template>

<script>
export default {
    props: {
        currentId: {
            type: Number,
            default: -1
        },
        botMessage: {
            type: String,
            default: () => ''
        },
        nextItem: {
            type: Object,
            default: () => ({
                id: -1,
                gt: 0,
                any: false,
                list: []
            })
        }
    },
    data() {
        return {
            tempText: '',
            tempPoints: 0,
            flagFreezePoints: false,
            tempComboId: null
        }
    },
    methods: {
        // default actions
        onClickNewMessage() {
            this.$emit('new-message');
        },
        onClickDeleteMessage() {
            this.$emit('delete-message');
        },
        onClickAddCondition() {
            this.$emit('add-condition');
        },
        // bot message actions
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
        // next item actions
        onClickApplyNextItem() {
            this.$emit('apply-next-item', {
                gt: this.tempPoints,
                id: this.tempComboId[0]
            });
        },
        onClickCancelNextItem() {
            this.$emit('cancel-next-item');
        }
    },
    watch: {
        botMessage(value) {
            this.tempText = value;
        },
        "nextItem.id": function(value) {
            if (value) {
                console.debug('nextItem.id', value);
                this.tempPoints = this.nextItem.gt;
                this.tempComboId = ['#' + this.nextItem.id];
                this.flagFreezePoints = this.nextItem.any ? this.nextItem.any : false;
            } else {
                this.tempPoints = 0;
                this.tempComboId = null;
                this.flagFreezePoints = true;
            }
        }
    },
    computed: {
        comboMessageList() {
            const list = this.nextItem.list.filter(value => {
                if (value !== '#' + this.currentId) {
                    return true;
                }
            });
            return list;
        }
    }
}
</script>

<style lang="scss">
.v-bottom-navigation {
    .v-btn__content {
        white-space: normal;
        width: 100%;
    }

}
</style>