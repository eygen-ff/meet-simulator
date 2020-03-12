'use strict';

import BotApi from '../services/BotApi.js';

const UserStore = {
    state: {
        isConnected: null,
        authData: null
    },
    getters: {
        isConnected: (state) => {
            return state.isConnected;
        },
        isAuthorized: (state) => {
            return state.authData !== false;
        }
    },
    mutations: {
        toggleConnection: (state, flag) => {
            state.isConnected = flag;
        },
        setAuthData: (state, payload) => {
            state.authData = payload;
        }
    },
    actions: {
        checkConnection: (state) => {
            return new Promise((resolve, reject) => {
                    BotApi.checkConnection()
                        .then(() => {
                            state.commit('toggleConnection', true);
                            resolve();
                        })
                        .catch(() => {
                            state.commit('toggleConnection', false);
                            reject();
                        });
            });
        },
        checkAuth: (state) => {
            return new Promise((resolve, reject) => {
                BotApi.checkAuth()
                    .then((payload) => {
                        state.commit('setAuthData', payload);
                        resolve();
                    })
                    .catch(() => {
                        state.commit('setAuthData', false);
                        reject();
                    });
            });
        }
    }
}

export default UserStore;