// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.

//import * as Kinvey from "kinvey-nativescript-sdk";

/*Kinvey.init({
    appKey: "kid_SyY8LYO8M",
    appSecret: "09282985d7c540f7b076a9c7fd884c77"
});*/

import axios from 'axios';
import UserModel from '../models/UserModel.js';


const User = {
    isLoggedIn: false
};

export default class BackendService {

    constructor() {
        this.user = null;
        this.uuid = null;
    }

    isLoading() {
        return this.loading;
    }

    getHeaders() {
        return {
            'Authorization': 'uuid ' + this.uuid
        }
    }

    isLoggedIn() {
        console.log('isLoggedIn', User.isLoggedIn);
        return User.isLoggedIn;
    }

    checkDeviceAutoLogin(uuid) {
        //this.device.uuid = uuid;
        return new Promise((resolve, reject) => {
            //setTimeout(() => {
                //this.user = new UserModel();
                User.isLoggedIn = true;
                console.log('checkDeviceAutoLogin result');
                resolve({
                    result: true
                });
            //}, 3000);
        });
    }

    login(user) {
        //return Kinvey.User.login(user.email, user.password);
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    logout() {
        //return Kinvey.User.logout();
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    register(user) {
        //return Kinvey.User.signup({ username: user.email, password: user.password });
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    getContacts(user) {
        const uuid = nsUuid.getUUID();
        console.log(`getContacts >> The device UUID is ${uuid}`);

        return new Promise((resolve, reject) => {
            const users = [{
                id: "11",
                text: "Лида",
                src: "https://i.pinimg.com/236x/54/57/28/54572848f27e6e26d955226b1d343305.jpg"
            },
            {
                id: "13",
                text: "Рома",
                src: "https://images.pexels.com/photos/2099225/pexels-photo-2099225.jpeg?auto=compress&cs=tinysrgb&w=200"
            }
            ];
            resolve(users);
        });
    }

    getMessages(user) {
        return new Promise((resolve, reject) => {
            resolve([{
                isOwner: false,
                time: "22.01 11:00",
                delivered: true,
                text: "Hi!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: false,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!",
                img: "https://i.pinimg.com/236x/54/57/28/54572848f27e6e26d955226b1d343305.jpg"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: true,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: false,
                text: "Hello!"
            },
            {
                isOwner: true,
                time: "22.01 11:20",
                delivered: null,
                text: "Hello! Hello!Hello! Hello!Hello! Hello!Hello! Hello! Hello! Hello! Hello! Hello! Hello!"
            }
            ]);
        });
    }

    getCurrentStatus(user) {
        return new Promise((resolve, reject) => {
            resolve({
                online: true,
                responseCases: [
                    { id: 1, text: 'Hello' },
                    { id: 4, text: 'Bye' }
                ]
            });
        });
    }

    selectCase(selectedCase) {
        return new Promise((resolve, reject) => {
            console.log('selectCase', selectedCase);
            resolve();
        });
    }
}

