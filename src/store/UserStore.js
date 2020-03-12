'use strict';

import BotApi from '../services/BotApi.js';

const UserStore = {
    state: {
        isConnected: null,
        authData: null,
        token: null,
        uid: null,
        email: ''
    },
    getters: {
        isConnected: (state) => {
            return state.isConnected;
        },
        isAuthorized: (state) => {
            return state.authData !== false;
        },
        getToken: (state) => {
            return state.token;
        },
        getUid: (state) => {
            return state.uid;
        },
        getEmail: (state) => {
            return state.email;
        }
    },
    mutations: {
        toggleConnection: (state, flag) => {
            state.isConnected = flag;
        },
        setAuthData: (state, payload) => {
            state.authData = payload;
            state.uid = payload.id;
            state.email = payload.email;
            state.token = payload.token;
        }
    },
    actions: {
        checkConnection: (state) => {
            return new Promise((resolve, reject) => {
                    BotApi.checkConnection()
                        .then((result) => {
                            if (result === false) {
                                throw Error('Connection test failed');
                            }
                            state.commit('toggleConnection', true);
                            resolve();
                        })
                        .catch((err) => {
                            console.debug('a.checkConnection err', err);
                            state.commit('toggleConnection', false);
                            reject();
                        });
            });
        },
        checkAuth: (state) => {
            return new Promise( (resolve, reject) => {
                BotApi.checkAuth(state.getters.getToken, state.getters.getUid)
                    .then((payload) => {
                        console.debug('checkAuth', payload);
                        if ( !payload || payload.result === false ) {
                            state.commit('setAuthData', false);
                            return reject('Unauthorized');
                        }
                        state.commit('setAuthData', payload.user);
                        resolve();
                    })
                    .catch(() => {
                        state.commit('setAuthData', false);
                        reject();
                    });
            });
        },
        register: (state, payload) => {
            return new Promise((resolve, reject) => {
                BotApi.register(payload)
                    .then((response) => {
                        console.debug('register', response);
                        state.commit('setAuthData', response);
                        resolve();
                    })
                    .catch(reject);
            });
        },
        login: (state, payload) => {
            return new Promise((resolve, reject) => {
                BotApi.login(payload)
                    .then((response) => {
                        console.debug('login', response);
                        state.commit('setAuthData', response);
                        resolve();
                    })
                    .catch(reject);
            });
        }
    }
}

export default UserStore;