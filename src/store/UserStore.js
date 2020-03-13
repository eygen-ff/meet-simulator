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
            console.debug('mutations.setAuthData', payload);
            state.authData = payload;
            if (payload && payload.id) {
                state.uid = payload.id;
                state.email = payload.email;
                if (payload.token) {
                    state.token = payload.token;
                }
            }
        }
    },
    actions: {
        checkConnection: (state) => {
            return new Promise((resolve, reject) => {
                BotApi.checkConnection()
                    .then((result) => {
                        console.debug('checkConnection.response', result);
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
                console.debug('store.checkAuth', state);
                BotApi.checkAuth(state.getters.getToken, state.getters.getUid)
                    .then((payload) => {
                        console.debug('checkAuth.response', payload);
                        if ( payload.result === false ) {
                            state.commit('setAuthData', false);
                            return reject('Unauthorized');
                        }
                        state.commit('setAuthData', payload.user);
                        resolve();
                    })
                    .catch((e) => {
                        state.commit('setAuthData', false);
                        reject(e);
                    });
            });
        },
        register: (state, payload) => {
            return new Promise((resolve, reject) => {
                BotApi.register(payload)
                    .then((response) => {
                        console.debug('register.response', response);
                        state.commit('setAuthData', response.user);
                        if (response.result && response.user.id) {
                            resolve();
                        } else if (response.error) {
                            reject(response.message);
                        } else {
                            reject('Ошибка протокола');
                        }
                    })
                    .catch(reject);
            });
        },
        login: (state, payload) => {
            return new Promise((resolve, reject) => {
                BotApi.login(payload)
                    .then((response) => {
                        console.debug('login.response', response);
                        state.commit('setAuthData', response.user);
                        if (response.result && response.user.id) {
                            resolve();
                        } else if (response.error) {
                            reject(response.message);
                        } else {
                            reject('Ошибка протокола');
                        }
                    })
                    .catch(reject);
            });
        }
    }
}

export default UserStore;