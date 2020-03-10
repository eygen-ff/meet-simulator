'use strict';

class BotApi {
    async getBotStatus(botId, userData) {
        return {
            id: botId,
            name: "Lia Okusawa",
            photo: "demo-photos/girl-01.png",
            status: 0,
            rate: 5.4,
            gallery: [
                "demo-photos/girl-01.png",
                "demo-photos/girl-02.jpg"
            ],
            userData
        }
    }
}

export default new BotApi;