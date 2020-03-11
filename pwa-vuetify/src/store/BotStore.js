'use strict';

import BotApi from '../services/BotApi.js';

const chatStateHelper = (lastMessage, isSendingCase) => {
    if (!lastMessage) {
        return 'nocases';
    }
    if (lastMessage.reply) {
        let replyInFuture = false;
        if (new Date(lastMessage.reply.showAt) > new Date()) {
            replyInFuture = true;
        }
        if (!replyInFuture && lastMessage.selected) {
            return 'replying';
        } else if (!lastMessage.selected) {
            return 'cases';
        } else {
            return 'nocases'; // безвариантная ситуация, диалог не может быть продолжен
        }

    } else if (isSendingCase) { // отправка ответа
        return 'sending';

    } else { // пустой чат, не было ответов бота, "приветствие"
        return 'cases';
    }
}

const BotStore = {
    state: {
        id: null,
        name: null,
        info: null,
        photo: null,
        status: null,
        rate: 0,
        gallery: null,
        messages: null,
        lastMessage: null,
        loadingInfo: false,
        isSendingCase: false
    },
    getters: {
        getBotId: (state) => {
            return state.id;
        },
        getBotName: (state) => {
            return state.name;
        },
        getBotPhoto: (state) => {
            return state.photo;
        },
        getBotInfo: (state) => {
            return state.info;
        },
        /**
         * 0 - бот недоступен
         * 1 - бот онлайн
         * 2 - бот оффлайн
         * 3 - бот пишет сообщение
         */
        getBotStatus: (state) => {
            return state.status;
        },
        getBotRate: (state) => {
            return state.rate;
        },
        getBotGallery: (state) => {
            return state.gallery ? state.gallery : null;
        },
        getAllMessages: (state) => { // все сообщения, в т.ч. не отображаемые
            return state.messages ? state.messages : []
        },
        getChatMessages: (state) => { // отображаемые сообщения
           if (!state.messages) {
               return [];
           }
           let chatMessages = [];
           for (let i in state.messages) {
                const message = state.messages[i];
                let replyInFuture = false;
                if (new Date(message.reply.showAt) > new Date()) {
                    replyInFuture = true;
                }
                if (message.reply && !replyInFuture) {
                    chatMessages.push({
                        id: message.id, 
                        text: message.reply.text,
                        flagIsOwner: false, 
                        sendAt: message.reply.showAt
                    });
                }
                if (!replyInFuture && message.selected) {
                    chatMessages.push({
                        id: message.id + ':' + message.selected, 
                        text: message.cases[message.selected],
                        flagIsOwner: true, 
                        sendAt: message.sendAt
                    });
                }
           }
           return chatMessages;
        },

        getChatLastMessage: (state) => {
            return state.lastMessage;
        },

        /**
         * состояния чата 
         *  'replying' - сообщение от бота "не доставлено", показ моего последнего сообщения
         *  'cases' - сообщение от бота доставлено, показ кейсов и сообщения от бота
         *  'nocases' - диалог окончен
         */
        getChatState: (state) => { 
            return chatStateHelper(state.lastMessage, state.isSendingCase);
        },

        /**
         * ответы
         */
        getChatAnswerCases: (state) => {
            const chatState = chatStateHelper(state.lastMessage, state.isSendingCase);
            console.debug('getChatAnswerCases',chatState);
            if (chatState === 'cases' && state.status === 1) {
                return state.lastMessage.cases;
            } else {
                return null;
            }
        },
        isLoadingBotInfo: (state) => {
            return state.loadingInfo;
        }
    },
    mutations: {
        setBot: (state, bot) => {
            state.id = bot.id;
            state.name = bot.name;
            state.info = bot.info;
            state.photo = bot.photo;
            state.status = bot.status;
            state.rate = bot.rate;
            state.gallery = bot.gallery;
        },
        resetBot: (state) => {
            state.id = null;
            state.name = null;
            state.info = null;
            state.photo = null;
            state.status = null;
            state.rate = 0;
            state.gallery = null;
            state.messages = null;
            state.lastMessage = null;
        },
        toggleLoadingBotInfo: (state, payload) => {
            state.loadingInfo = payload;
        },
        setChat: (state, chat) => {
            state.messages = chat.messages;
            state.lastMessage = chat.messages ? chat.messages[chat.messages.length - 1] : null;
        },
        toggleSendingCase: (state, flag) => {
            state.isSendingCase = flag;
        },
        setReply: (state, payload) => {
            state.messages[state.messages.length - 1].selected = payload.selected;
            state.messages[state.messages.length - 1].sendAt = new Date();
            state.messages.push({
                id: payload.messageId, 
                reply: payload.reply, 
                cases: payload.cases, 
                selected: null,
                sendAt: null
            });
            state.lastMessage = state.messages[state.messages.length - 1];
        }
    },
    actions: {
        loadBot: (state, payload) => {
            return new Promise((resolve) => {
                state.commit('toggleLoadingBotInfo', true);
                BotApi.getBotStatus(payload.id, null)
                    .then((botInfo) => {
                        state.commit('setBot', botInfo);
                        state.commit('toggleLoadingBotInfo', false);
                        resolve();
                    })
                    .catch(() => {
                        state.commit('toggleLoadingBotInfo', false);
                    });
            });
        },
        resetBot: (state) => {
            state.commit('resetBot');
        },
        toggleLoadingBotInfo: (state, flagToggle) => {
            state.commit('toggleLoadingBotInfo', flagToggle);
        },
        loadChat: (state, payload) => {
            return new Promise((resolve) => {
                BotApi.getBotChat(payload.botId, null)
                    .then((botInfo) => {
                        state.commit('setChat', botInfo);
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        selectCase: (state, payload) => {
            return new Promise((resolve) => {
                state.commit('toggleSendingCase', true);
                BotApi.sendCase(payload.botId, payload.caseId, null)
                    .then((replyPayload) => {
                        replyPayload.selected = payload.caseId;
                        console.debug('selectCase', replyPayload);
                        state.commit('setReply', replyPayload);
                        state.commit('toggleSendingCase', false);
                        resolve();
                    })
                    .catch(() => {
                        state.commit('toggleSendingCase', false);
                    });
            });
        }
    }
};

export default BotStore;