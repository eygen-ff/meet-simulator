<template>
    <v-row no-gutters align="start" justify="center" :id="flagIsLast ? 'lastMsg' : 'msg' + id" class="msg-row">
        <template v-if="flagIsOwner"> <!-- from me -->
            <v-col cols="2"></v-col>
            <v-col cols="10" class="text-left">
                <v-card dark color="green darken-2" class="msg-my">
                    <v-card-subtitle class="msg-item">
                        {{text}}
                        <div class="black--text text-right dt">
                            {{formatDate}}
                        </div>
                    </v-card-subtitle>
                </v-card>
            </v-col>  
        </template>
        <template v-else> <!-- from bot -->
            <v-row no-gutters align="start" justify="center" class="msg-bot">
                <v-col cols="10" class="text-left">
                    <v-card dark>
                    <v-card-subtitle class="msg-item">
                        {{text}}
                        <v-img v-if="photo" :src="photo"></v-img>
                        <div v-if="photo" class="text-right dt">Photo added to gallery - {{formatDate}}</div>
                        <div v-if="!photo" class="text-right dt">{{formatDate}}</div>
                    </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </template>
        
    </v-row>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: (Math.random(1,99999)*100000).toString()
        },
        text: {
            type: String,
            default: ''
        },
        photo: {
            type: String,
            default: ''
        },
        sendAt: {
            type: Date,
            default: () => new Date()
        },
        flagIsOwner: {
            type: Boolean,
            default: false
        },
        flagIsLast: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        formatDate: function() {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric'
            };
            const today = new Date();
            if (today.getDate() === this.sendAt.getDate() && today.getMonth() ===  this.sendAt.getMonth() && today.getFullYear() ===  this.sendAt.getFullYear()) {
                delete options['day'];
            }
            if (today.getMonth() ===  this.sendAt.getMonth() && today.getFullYear() ===  this.sendAt.getFullYear()) {
                delete options['month'];
            }
            if (today.getFullYear() ===  this.sendAt.getFullYear()) {
                delete options['year'];
            }
            return this.sendAt.toLocaleString("ru", options);
        }
    }
}
</script>

<style lang="scss">
.msg-row {
    .msg-item {
        padding: 0.3rem;
        margin: 0.2rem;
        .dt {
            font-size: 0.7rem;
            line-height: 0.7rem;
        }
    }
}
</style>