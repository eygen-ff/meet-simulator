'use strict';

import BotApi from '../services/BotApi.js';

const UserStore = {
    state: {
        isConnected: null,
        authData: null,
        permissions: null,
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
        isAllowBotList: (state) => {
            return state.permissions && state.permissions.includes(21);
        },
        isAllowBotChat: (state) => {
            return state.permissions && state.permissions.includes(22);
        },
        isAllowBotAdd: (state) => {
            return state.permissions && state.permissions.includes(23);
        },
        isAllowBotCreate: (state) => {
            return state.permissions && state.permissions.includes(24);
        },
        getToken: (state) => {
            return state.token;
        },
        getUid: (state) => {
            return state.uid;
        },
        getEmail: (state) => {
            return state.email;
        },
        getPermissions: (state) => {
            return state.permissions;
        }
    },
    mutations: {
        toggleConnection: (state, flag) => {
            state.isConnected = flag;
        },
        setAuthData: (state, payload) => {
            state.authData = payload;
            if (payload && payload.id) {
                state.uid = payload.id;
                state.email = payload.email;
                state.permissions = payload.permissions;
                if (payload.token) {
                    state.token = payload.token;
                }
            } else {
                state.uid = null;
                state.email = '';
                state.token = null;
                state.permissions = null;
            }
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
                        console.error('a.checkConnection err', err);
                        state.commit('toggleConnection', false);
                        reject();
                    });
            });
        },
        checkAuth: (state) => {
            return new Promise( (resolve, reject) => {
                BotApi.checkAuth(state.getters.getToken, state.getters.getUid)
                    .then((payload) => {
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
        logout: (state) => {
            return new Promise((resolve) => {
                state.commit('setAuthData', false);
                resolve();
            });
        }
    }
}

export default UserStore;