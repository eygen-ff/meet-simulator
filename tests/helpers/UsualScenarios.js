'use strict';

//const chalk = require('chalk');
//const ContentHelper = require('./ContentHelper.js');
//const TestHelper = require('./TestHelper.js');
//const locators = require('../locators.json');

//const {ScenarioParamVo} = require('./ScenarioParamVo.js');

const axios = require('axios');
const crypto = require('crypto');

const hashSomething = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
}

class UsualScenarios {

    getAxiosAuth(token) {
        return axios.create({
            timeout: 5000,
            headers: {'Authorization': 'token ' + token}
        });
    }

    
    /**
     * сбрасывает базу
     * @param {ScenarioParamVo} scenarioParam 
     */
    async resetDb(scenarioParam) {
        const url = scenarioParam.scenario.scenarios[scenarioParam.index].params.url;
        const dt = new Date();
        const timeStr = String(dt.getFullYear()) + dt.getMonth() + dt.getDate();
        const token = hashSomething('SecureService.resetDb' + timeStr);
        const httpClient = this.getAxiosAuth(token);
        console.debug('resetDb', url + 'datesimapi/1.0.0/secure/resetDb', timeStr, token);    
        await httpClient.delete(url + 'datesimapi/1.0.0/secure/resetDb');
    }

    /**
     * Открытие страницы логина
     * @param {ScenarioParamVo} scenarioParam 
     */
    async openLogin(scenarioParam) {
        const url = scenarioParam.scenario.scenarios[scenarioParam.index].params.url;
        await scenarioParam.page.goto(url);
        const locator = "#inspire form button.primary";
        await scenarioParam.page.waitForSelector(locator, {timeout: 5000});
    }

    /**
     * Нажатие кнопки Регистрации 
     * @param {*} scenarioParam 
     */
    async clickRegisterBtn(scenarioParam) {
        const locator = "#inspire form button:nth-child(2)";
        await scenarioParam.page.waitForSelector(locator, {timeout: 10000});
        await scenarioParam.page.click(locator);
    }

    /**
     * Регистрация пользователя
     * @param {*} scenarioParam 
     */
    async submitRegisterForm(scenarioParam) {
        const params = scenarioParam.scenario.scenarios[scenarioParam.index].params;
        const locatorName = '#inspire form .v-input:nth-child(1) input';
        const locatorEmail = '#inspire form .v-input:nth-child(2) input';
        const locatorPassword = '#inspire form .v-input:nth-child(3) input';
        const locatorSubmitBtn = "#inspire form button.primary";
        await scenarioParam.page.waitForSelector(locatorName, {timeout: 5000});
        let element = await scenarioParam.page.$(locatorName);
        await element.type(params.name, {delay: 100});
        await scenarioParam.page.waitForSelector(locatorEmail, {timeout: 5000});
        element = await scenarioParam.page.$(locatorEmail);
        await element.type(params.email, {delay: 100});
        element = await scenarioParam.page.$(locatorPassword);
        await element.type(params.password, {delay: 100});
        await scenarioParam.page.click(locatorSubmitBtn);
    }

    /**
     * Авторизация юзера
     * @param {*} scenarioParam 
     */
    async submitLogin(scenarioParam) {
        const params = scenarioParam.scenario.scenarios[scenarioParam.index].params;
        const locatorEmail = '#inspire form .v-input:nth-child(1) input';
        const locatorPassword = '#inspire form .v-input:nth-child(2) input';
        const locatorSubmitBtn = "#inspire form button.primary";
        await scenarioParam.page.waitForSelector(locatorEmail, {timeout: 5000});
        let element = await scenarioParam.page.$(locatorEmail);
        await element.type(params.email, {delay: 100});
        element = await scenarioParam.page.$(locatorPassword);
        await element.type(params.password, {delay: 100});
        await scenarioParam.page.click(locatorSubmitBtn);
    }

    /**
     * Выбор пункта меню "Редактор ботов"
     * @param {*} scenarioParam 
     */
    async selectMenuBotEditor(scenarioParam) {
        const locatorMenuBtn = '#inspire header button';
        const menuItem = '#inspire div.v-navigation-drawer__content div.v-list-item:nth-child(2)';
        await scenarioParam.page.waitForSelector(locatorMenuBtn, {timeout: 5000});
        await scenarioParam.page.click(locatorMenuBtn);
        await scenarioParam.page.waitForSelector(menuItem, {timeout: 5000});
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(menuItem);
    }

    async createBot(scenarioParam) {
        const params = scenarioParam.scenario.scenarios[scenarioParam.index].params;
        const createBtnLocator = '#inspire main button.v-btn';
        const botNameLocator = '#inspire main div.v-input:nth-child(1) input';
        const botPhotoLocator = '#inspire main div.v-input:nth-child(2) input';
        const botGenderSelectLocator = '#inspire main div.v-input:nth-child(3) input';
        const botGenderSelectListLocator = '.v-menu__content .v-list-item:nth-child(' + params.genderIndex + ')';
        const locatorSubmitBtn = "#inspire form button.primary";
        await scenarioParam.page.waitForSelector(createBtnLocator, {timeout: 5000});
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(createBtnLocator);
        await scenarioParam.page.waitForSelector(botNameLocator, {timeout: 5000});
        await scenarioParam.page.waitFor(1000);
        let element = await scenarioParam.page.$(botNameLocator);
        await element.type(params.name, {delay: 100});
        element = await scenarioParam.page.$(botPhotoLocator);
        await element.type(params.photo, {delay: 100});
        await scenarioParam.page.click(botGenderSelectLocator);
        await scenarioParam.page.waitForSelector(botGenderSelectListLocator, {timeout: 5000});
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(botGenderSelectListLocator);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(locatorSubmitBtn);
        await scenarioParam.page.waitFor(1000);
    }
}

module.exports = new UsualScenarios;
