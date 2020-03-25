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
        const timeStr = dt.getFullYear() + dt.getMonth() + dt.getDate() + dt.getHours();
        const token = hashSomething('SecureService.resetDb' + timeStr);
        const httpClient = this.getAxiosAuth(token);
        console.debug('resetDb', url + 'datesimapi/1.0.0/secure/resetDb', token);    
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
}

module.exports = new UsualScenarios;
