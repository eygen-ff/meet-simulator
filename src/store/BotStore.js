'use strict';

import BotApi from '../services/BotApi.js';


const isReplyInFuture = (lastMessage) => {
    if (!lastMessage) {
        return false;
    }

    if (lastMessage && !lastMessage.reply) {
        return false;
    }
    let replyInFuture = false;
    if (new Date(lastMessage.reply.showAt) > new Date()) {
        replyInFuture = true;
    }
    return replyInFuture;
};

const chatStateHelper = (lastMessage, isSendingCase) => {
    if (!lastMessage) {
        return 'nocases';
    }
    if (lastMessage.reply) {
        if (isReplyInFuture(lastMessage)) {
            return 'replying';
        } else {
            if (!lastMessage.selected) {
                return 'cases';
            } else if (isSendingCase) {
                return 'sending';
            } else {
                return 'nocases';
            }
        }

    } else if (isSendingCase) { // отправка ответа
        return 'sending';

    } else if (lastMessage.selected) {
        return 'noanswer';

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
        chat: null,
        chatState: null,
        lastMessage: null,
        loadingInfo: false,
        myBots: [],
        myOwnBots: [],
        marketBots: [],
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
            return state.chat ? state.chat : [];
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
            return state.chatState;
        },

        /**
         * ответы
         */
        getChatAnswerCases: (state) => {
            if (state.chatState === 'cases' && state.status === 1) {
                return state.lastMessage.cases;
            } else {
                return null;
            }
        },
        isLoadingBotInfo: (state) => {
            return state.loadingInfo;
        },
        getMyBots: (state) => {
            return state.myBots;
        },
        getMyOwnBots: (state) => {
            return state.myOwnBots;
        },
        getMarketBots: (state) => {
            return state.marketBots; /* [
                {
                    id: 5,
                    name: "Kufa Sufa",
                    photo: "demo-photos/girl-01.png",
                    price: 0
                }
            ];*/
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
            state.chat = null;
        },
        toggleLoadingBotInfo: (state, payload) => {
            state.loadingInfo = payload;
        },
        setMessages: (state, chat) => {
            state.messages = chat.messages;
            state.lastMessage = chat.messages ? chat.messages[chat.messages.length - 1] : null;
        },
        toggleSendingCase: (state, flag) => {
            state.isSendingCase = flag;
        },
        setReply: (state, payload) => {
            state.messages[state.messages.length - 1].selected = payload.selected;
            state.messages[state.messages.length - 1].sendAt = new Date().toString();
            state.messages.push({
                id: payload.messageId, 
                reply: payload.reply, 
                cases: payload.cases, 
                selected: null,
                sendAt: null
            });
            state.lastMessage = state.messages[state.messages.length - 1];
        },
        setChat: (state) => {
            if (!state.messages) {
                state.chat = [];
                return;
            }
            let chatMessages = [];
            for (let i in state.messages) {
                 const message = state.messages[i];
                 if (message.reply) {
                     let replyInFuture = false;
                     if (new Date(message.reply.showAt) > new Date()) {
                         replyInFuture = true;
                     }
                     if (!replyInFuture) {
                         chatMessages.push({
                             id: message.id, 
                             text: message.reply.text,
                             flagIsOwner: false, 
                             sendAt: message.reply.showAt
                         });
                     }
                 }
                 if (message.selected) {
                     let caseText = '';
                     for (let i in message.cases) {
                         if (message.cases[i].id === message.selected) {
                             caseText = message.cases[i].text;
                         }
                     }
                     chatMessages.push({
                         id: message.id + ':' + message.selected, 
                         text: caseText,
                         flagIsOwner: true, 
                         sendAt: message.sendAt
                     });
                 }
            }
            state.chat = chatMessages;
        },
        setChatState: (state) => {
            state.chatState = chatStateHelper(state.lastMessage, state.isSendingCase);
        },
        setMyBots: (state, payload) => {
            state.myBots = payload;
        },
        setMyOwnBots: (state, payload) => {
            state.myOwnBots = payload;
        },
        setMarketBots: (state, payload) => {
            state.marketBots = payload;
        }
    },
    actions: {
        loadBot: (state, payload) => {
            console.debug('loadBot');
            return new Promise((resolve, reject) => {
                state.commit('toggleLoadingBotInfo', true);
                BotApi.getBotStatus(state.getters.getToken, state.getters.getUid, payload.id)
                    .then((botInfo) => {
                        state.commit('setBot', botInfo);
                        state.commit('toggleLoadingBotInfo', false);
                        resolve();
                    })
                    .catch((e) => {
                        state.commit('toggleLoadingBotInfo', false);
                        reject(e);
                    });
            });
        },
        resetBot: (state) => {
            state.commit('resetBot');
        },
        toggleLoadingBotInfo: (state, flagToggle) => {
            state.commit('toggleLoadingBotInfo', flagToggle);
        },
        loadMessages: (state, payload) => {
            console.debug('loadMessages');
            return new Promise((resolve) => {
                BotApi.getBotChat(payload.botId, null)
                    .then((botInfo) => {
                        state.commit('setMessages', botInfo);
                        state.commit('setChat');
                        state.commit('setChatState');
                        resolve();
                    })
                    .catch(() => {
                    });
            });
        },
        selectCase: (state, payload) => {
            return new Promise((resolve, reject) => {
                state.commit('toggleSendingCase', true);
                BotApi.sendCase(payload.botId, payload.caseId, null)
                    .then((replyPayload) => {
                        replyPayload.selected = payload.caseId;
                        state.commit('setReply', replyPayload);
                        state.commit('toggleSendingCase', false);
                        state.commit('setChat');
                        state.commit('setChatState');
                        //console.debug('message', state.getters.getChatMessages, state.getters.getAllMessages);
                        //state.gettersgetChatMessages();
                        resolve();
                    })
                    .catch(() => {
                        state.commit('toggleSendingCase', false);
                        reject();
                    });
            });
        },
        renderChat: (state) => {
            state.commit('setChat');
            state.commit('setChatState');
        },

        /**
         * Созданные мной боты
         */
        loadMyBots: (state) => {
            return new Promise((resolve, reject) => {
                BotApi.getMyBots(state.getters.getToken, state.getters.getUid)
                    .then((payload) => {
                        if ( payload.result === false ) {
                            state.commit('setMyBots', []);
                            return reject('Fail to load bot list');
                        }
                        state.commit('setMyBots', payload.bots);
                        resolve();
                    })
                    .catch((e) => {
                        state.commit('setMyBots', []);
                        reject(e);
                    });
            });
        },
        loadMyOwnBots: (state) => {
            return new Promise((resolve, reject) => {
                BotApi.getMyOwnBots(state.getters.getToken, state.getters.getUid)
                    .then((payload) => {
                        if ( payload.result === false ) {
                            state.commit('loadMyOwnBots', []);
                            return reject('Fail to load bot list');
                        }
                        state.commit('setMyOwnBots', payload.bots);
                        resolve();
                    })
                    .catch((e) => {
                        state.commit('setMyOwnBots', []);
                        reject(e);
                    });
            });
        },
        getMyOwnBotMessages: (state, payload) => {
            return new Promise((resolve, reject) => {
                BotApi.getMyOwnBot(state.getters.getToken, state.getters.getUid, payload.botId)
                    .then((payload) => {
                        if ( payload.result === false ) {
                            return reject('Fail to load bot messages');
                        }
                        resolve(payload.bot);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },
        createBot: (state, payload) => {
            return new Promise((resolve, reject) => {
                BotApi.createBot(
                    state.getters.getToken, 
                    state.getters.getUid,
                    payload.name,
                    payload.gender,
                    payload.photo
                ).then((response) => {
                    if (response.result === false) {
                        throw Error(response.error ? response.error : 'Fail to create bot');
                    }
                    resolve(response.bot);
                }).catch((e) => {
                    reject(e);
                });
            });
        },
        updateBot: (state, payload) => {
            console.debug('updateBot', payload);
            return new Promise((resolve, reject) => {
                BotApi.updateBot(
                    state.getters.getToken, 
                    state.getters.getUid,
                    payload.id,
                    payload.name,
                    payload.gender,
                    payload.photo
                ).then((response) => {
                    if (response.result === false) {
                        throw Error(response.error ? response.error : 'Fail to update bot');
                    }
                    resolve(response.bot);
                }).catch((e) => {
                    reject(e);
                });
            });
        },

        saveOwnBotMessages(state, payload) {
            return new Promise((resolve, reject) => {
                BotApi.saveOwnBotMessages(
                    state.getters.getToken, 
                    state.getters.getUid,
                    payload.botId,
                    payload.messages
                )
                    .then(() => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },

        setBotPublishFlag(state, payload) {
            return new Promise((resolve, reject) => {
                BotApi.setBotPublishFlag(
                    state.getters.getToken, 
                    state.getters.getUid,
                    payload.botId,
                    payload.flag
                )
                    .then(() => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },

        loadMarketBots(state) {
            return new Promise((resolve, reject) => {
                BotApi.getMarketBots(
                    state.getters.getToken, 
                    state.getters.getUid
                )
                    .then((response) => {
                        state.commit('setMarketBots', response.bots);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },

        buyMarketBot(state, payload) {
            return new Promise((resolve, reject) => {
                BotApi.buyMarketBot(
                    state.getters.getToken, 
                    state.getters.getUid,
                    payload.id
                )
                    .then(() => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        }

    }
};

export default BotStore;