'use strict';

import axios from 'axios';
import crypto from 'crypto';

const axiosConfig = {
    headers: {'Access-Control-Allow-Origin': '*'}
};
const AppSettings = require('../../app-settings.json');

const hashSomething = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
}

class BotApi {

    constructor() {
        if (process.env.NODE_ENV && process.env.NODE_ENV==='development') {
            this.url = AppSettings.api_dev;
        } else {
            this.url = AppSettings.api;
        }
        axios.defaults.baseURL = this.url;
        console.debug('BotApi.url', this.url);
    }

    /**
     * @param {Number} botId 
     * @param {*} userData 
     */
    async getBotStatus(botId, userData) {
        console.debug('BotApi.getBotStatus', botId);
        return {
            id: botId,
            name: "Lia Okusawa",
            info: "Some bot info",
            photo: "demo-photos/girl-01.png",
            status: 1,
            rate: 5.4,
            gallery: [
                "demo-photos/girl-01.png",
                "demo-photos/girl-02.jpg"
            ],
            userData
        }
    }

    /**
     * @param {Number} botId 
     * @param {*} userData 
     */
    async getBotChat(botId, userData) {
        console.debug('BotApi.getBotChat', botId);
        return {
            id: botId,
            userData,
            messages: [
                //{id: 1, text: 'My first message', flagIsOwner: true, sendAt: '2020.01.01 11:33:22'},
                //{id: 2, text: 'Bot reply message', flagIsOwner: false, sendAt: '2020.01.01 11:35:22'},
                //{id: 3, text: 'My second message', flagIsOwner: true, sendAt: '2020.01.01 12:33:22'},
                //{id: 4, text: '', photo: 'demo-photos/girl-01.png', flagIsOwner: false, sendAt: '2020.01.01 12:43:22'},
                //{id: 5, text: 'My last message', flagIsOwner: true, sendAt: '2020.01.01 13:33:22'},

                { // первое сообщение (как-бы ответ на пустое сообщение бота, возвращается если не было других сообщений)
                    id: 1, 
                    reply: null, 
                    cases: [
                        {id: 3, text: 'First case'},
                        {id: 4, text: 'Second case'},
                    ], 
                    selected: 3,
                    sendAt: "2020.01.01 12:33:22"
                },
                { // мое второе сообщение на ответ бота, должно быть вместе со следующим сообщением бота, чтобы не было безвариантной ситуации
                    id: 2, 
                    reply: {
                        text: "bot reply 1",
                        showAt: "2020.01.01 12:35:22"
                    }, 
                    cases: [
                        {id: 5, text: 'Reply case 1'},
                        {id: 6, text: 'Reply case 2'},
                    ], 
                    selected: null,
                    sendAt: null
                },
                /*{ // ответ бота в будущем (не отображается, бот думает, последнее сообщение в чате - мой ответ из предыдущей секции)
                    id: 3, 
                    reply: {
                        text: "bot reply 2",
                        showAt: "2020.03.20 12:33:22"
                    }, 
                    cases: [
                        {id: 5, text: 'Reply case 3'},
                        {id: 6, text: 'Reply case 4'},
                    ], 
                    selected: null,
                    sendAt: null
                },*/
                /*
                { // ответ бота отобразился, моего ответа нет, последнее сообщение в чате - от бота
                    id: 4, 
                    reply: {
                        text: "bot reply 3",
                        showAt: "2020.03.11 12:33:22"
                    }, 
                    cases: [
                        {id: 5, text: 'Reply case 5'},
                        {id: 6, text: 'Reply case 6'},
                    ], 
                    selected: null,
                    sendAt: null
                },
                */
            ]
        }
    }

    async sendCase(botId, caseId, userData) {
        let showTime = new Date();
        //showTime.setMinutes(showTime.getMinutes() + 1);
        showTime.setSeconds(showTime.getSeconds() + 10);
        console.debug('set showtime', showTime.toString());
        return {
            botId,
            caseId,
            userData,
            messageId: 33,
            reply: {
                text: "Immediate reply text",
                showAt: showTime.toString()
            },
            cases: [
                {id: 15, text: 'Immediate Reply case A'},
                {id: 16, text: 'Immediate Reply case B'},
            ], 
        };
    }

    getAuthToken(token, uid) {
        const timestamp = new Date().getTime();
        return uid + ':' + timestamp + ':' + hashSomething(timestamp + token);
    }

    getAxiosAuth(token, uid) {
        return axios.create({
            baseURL: this.url,
            timeout: 5000,
            headers: {'Authorization': 'token ' + this.getAuthToken(token, uid)}
        });
    }

    async checkConnection() {
        const response = await axios.get('/', axiosConfig);
        return response.data ? response.data.result : false;
    }

    async checkAuth(token, uid) {
        console.debug('BotApi.checkAuth', token, uid);
        if (!token || !uid) {
            throw Error('Unauthorized');
        }
        const response = await this.getAxiosAuth(token, uid).get('/user/me', axiosConfig);
        console.debug('checkAuth', response);
        if (response && response.data && response.data.result) {
            return response.data;
        } else {
            throw Error(response && response.data && response.data.message ? response.data.message : 'API result is false');
        }
    }

    async register(form) {
        if (!form.email || !form.name || !form.password) {
            throw Error('Some form fields is empty');
        }
        const response = await axios.put('/user/register', form);
        if (!response.data || response.data.result === false) {
            throw Error(response.data.message ? response.data.message : 'API result is false');
        }
        return response.data;
    }

    async login(form) {
        if (!form.email || !form.password) {
            throw Error('Some form fields is empty');
        }
        const response = await axios.post('/user/login', form);
        if (!response.data || response.data.result === false) {
            throw Error(response.data.message ? response.data.message : 'API result is false');
        }
        return response.data;
    }

    /**
     * @param {*} token 
     * @param {*} uid 
     * @param {*} botId 
     * @param {*} messages 
     */
    async saveBotMessagesConfig(token, uid, botId, messages) {
        if (!token || !uid) {
            throw Error('Unauthorized');
        }
        const response = await this.getAxiosAuth(token, uid).post('/bot/config/messages', {
            id: botId,
            messages: messages
        });
        return response;
    }
}

export default new BotApi;