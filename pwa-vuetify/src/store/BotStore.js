'use strict';

import BotApi from '../services/BotApi.js';

const BotStore = {
    state: {
        id: null,
        name: null,
        photo: null,
        status: null,
        rate: 0,
        gallery: null
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
        getBotStatus: (state) => {
            return state.status;
        },
        getBotGallery: (state) => {
            return state.gallery;
        }
    },
    mutations: {
        setBot: (state, bot) => {
            state.id = bot.id;
            state.name = bot.name;
            state.photo = bot.photo;
            state.status = bot.status;
            state.rate = bot.rate;
            state.gallery = bot.gallery;
        }
    },
    actions: {
        loadBot: (state, payload) => {
            return new Promise((resolve) => {
                BotApi.getBotStatus(payload.id, null)
                    .then((botInfo) => {
                        state.commit('setBot', botInfo);
                        resolve();
                    });
            });
        }
    }
};

export default BotStore;