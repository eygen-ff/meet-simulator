'use strict';

class BotApi {

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
                /*{ // мое второе сообщение на ответ бота, должно быть вместе со следующим сообщением бота, чтобы не было безвариантной ситуации
                    id: 2, 
                    reply: {
                        text: "bot reply 1",
                        showAt: "2020.01.01 12:33:22"
                    }, 
                    cases: [
                        {id: 5, text: 'Reply case 1'},
                        {id: 6, text: 'Reply case 2'},
                    ], 
                    selected: 6,
                    sendAt: "234"
                },
                { // ответ бота в будущем (не отображается, бот думает, последнее сообщение в чате - мой ответ из предыдущей секции)
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
        return {
            botId,
            caseId,
            userData,
            messageId: 33,
            reply: {
                text: "Immediate reply text",
                showAt: showTime.setMinutes(showTime.getMinutes() + 1)
            },
            cases: [
                {id: 15, text: 'Immediate Reply case A'},
                {id: 16, text: 'Immediate Reply case B'},
            ], 
        };
    }
}

export default new BotApi;