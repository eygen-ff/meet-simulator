'use strict';

//const chalk = require('chalk');
//const ContentHelper = require('./ContentHelper.js');
//const TestHelper = require('./TestHelper.js');
//const locators = require('../locators.json');

//const {ScenarioParamVo} = require('./ScenarioParamVo.js');

const axios = require('axios');
const TestHelper = require('./TestHelper.js');

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
        const token = TestHelper.generateSecureToken('SecureService.resetDb');
        const httpClient = this.getAxiosAuth(token);
        console.debug('resetDb', url + 'datesimapi/1.0.0/secure/resetDb');
        await httpClient.delete(url + 'datesimapi/1.0.0/secure/resetDb');
    }
    

    async resetBots(scenarioParam) {
        const url = scenarioParam.scenario.scenarios[scenarioParam.index].params.url;
        const token = TestHelper.generateSecureToken('SecureService.resetBots');
        const httpClient = this.getAxiosAuth(token);
        console.debug('resetBots', url + 'datesimapi/1.0.0/secure/resetBots');    
        await httpClient.delete(url + 'datesimapi/1.0.0/secure/resetBots');
    }

    async resetChats(scenarioParam) {
        const url = scenarioParam.scenario.scenarios[scenarioParam.index].params.url;
        const token = TestHelper.generateSecureToken('SecureService.resetChats');
        const httpClient = this.getAxiosAuth(token);
        console.debug('resetChats', url + 'datesimapi/1.0.0/secure/resetChats');
        await httpClient.delete(url + 'datesimapi/1.0.0/secure/resetChats');
    }

    async resetDialogs(scenarioParam) {
        const url = scenarioParam.scenario.scenarios[scenarioParam.index].params.url;
        const token = TestHelper.generateSecureToken('SecureService.resetDialogs');
        const httpClient = this.getAxiosAuth(token);
        console.debug('resetDialogs', url + 'datesimapi/1.0.0/secure/resetDialogs');
        await httpClient.delete(url + 'datesimapi/1.0.0/secure/resetDialogs');
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

    async editBotStory(scenarioParam) {
        const params = scenarioParam.scenario.scenarios[scenarioParam.index].params;
        const botStoryBtnLocator = '#inspire main div.v-list div.v-list-item:nth-child('+ (params.botIndex + 1) +') .v-list-item__icon button:nth-child(2)';
        await scenarioParam.page.waitForSelector(botStoryBtnLocator, {timeout: 5000});
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(botStoryBtnLocator);
        await scenarioParam.page.waitFor(1000);
    }

    async addNewMessagesToStory(scenarioParam) {
        const params = scenarioParam.scenario.scenarios[scenarioParam.index].params;
        const newBtnLocator = '#configurator footer main .v-bottom-navigation button:nth-child(1)';
        const newAnswerCaseBtnLocator = '#configurator footer main .v-bottom-navigation button:nth-child(3)';
        const userAnswerCaseLocator = '#configurator main div.v-item--active div.user-answer-case:nth-child(1)';
        const userAnswerCaseLocator2 = '#configurator main div.v-item--active div.user-answer-case:nth-child(2)';
        const answerPointSlider = '#configurator div.points-slider-container div.v-input__slot div.v-slider__thumb-container';
        const answerTextAreaLocator = '.answer-text-container textarea';
        const actionApplyBtn = '#configurator .v-bottom-navigation button.primary';
        const botMessageEditBtn = '.v-item--active button.message-edit-btn';
        const botMessageArea = '#configurator footer .bot-message-container textarea';
        const accordeonFirstSlide = '#configurator main div.v-expansion-panel:nth-child(1)';
        const editNextConditionLocator = '#configurator main div.v-item--active .bot-answer-item .next-item:nth-child(1)';
        const editNextConditionLocator2 = '#configurator main div.v-item--active .bot-answer-item .next-item:nth-child(2)';
        const nextCombobox = '#configurator footer .next-combobox-container .v-select';
        const nextComboboxItem2 = '.v-select-list .v-list-item:nth-child(2)';
        const nextComboboxItem3 = '.v-select-list .v-list-item:nth-child(3)';
        const nextComboboxItem4 = '.v-select-list .v-list-item:nth-child(4)';
        const newNextConditionBtnLocator = '#configurator footer main .v-bottom-navigation button:nth-child(2)';
        const nextConditionDeleteBtn = '#configurator .v-bottom-navigation button.secondary:nth-child(2)';
        const nextPointSlider = '#configurator .next-slider-container div.v-input__slot div.v-slider__thumb-container';
        const saveBtn = '#configurator .save-btn';

        await scenarioParam.page.waitForSelector(newBtnLocator, {timeout: 5000});
        await scenarioParam.page.click(newBtnLocator);
        await scenarioParam.page.waitFor(1000);
        // первый кейс ответа
        await scenarioParam.page.click(newAnswerCaseBtnLocator);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(userAnswerCaseLocator);
        await scenarioParam.page.waitFor(1000);
        let element = await scenarioParam.page.$(answerTextAreaLocator);
        await element.type(params.firstUserAnswer, {delay: 100});
        element = await scenarioParam.page.$(answerPointSlider);
        let sliderBox = await element.boundingBox();
        await scenarioParam.page.mouse.move(sliderBox.x + 5, sliderBox.y+5);
        await scenarioParam.page.mouse.down();
        await scenarioParam.page.mouse.move(sliderBox.x + 30, sliderBox.y+5);
        await scenarioParam.page.mouse.up();
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(1000);
        // второе сообщение бота
        await scenarioParam.page.click(newBtnLocator);
        await scenarioParam.page.waitFor(3000);
        await scenarioParam.page.click(botMessageEditBtn);
        await scenarioParam.page.waitFor(500);
        await scenarioParam.page.click(botMessageArea);
        await scenarioParam.page.keyboard.press('Backspace');
        element = await scenarioParam.page.$(botMessageArea);
        await element.type(params.botSecondMessage, {delay: 100});
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(2000);
        await scenarioParam.page.click(editNextConditionLocator);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextCombobox);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextComboboxItem3);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(2000);
        // переход на первое сообщение
        await scenarioParam.page.click(accordeonFirstSlide);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(editNextConditionLocator);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextCombobox);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextComboboxItem2);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(2000);
        // второй кейс первого сообщения
        await scenarioParam.page.click(newAnswerCaseBtnLocator);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(userAnswerCaseLocator2);
        await scenarioParam.page.waitFor(1000);
        element = await scenarioParam.page.$(answerTextAreaLocator);
        await element.type(params.secondUserAnswer, {delay: 100});
        element = await scenarioParam.page.$(answerPointSlider);
        sliderBox = await element.boundingBox();
        await scenarioParam.page.mouse.move(sliderBox.x + 5, sliderBox.y+5);
        await scenarioParam.page.mouse.down();
        await scenarioParam.page.mouse.move(sliderBox.x + 60, sliderBox.y+5, {steps: 5});
        await scenarioParam.page.mouse.up();
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(1000);
        // третье сообщение
        await scenarioParam.page.click(newBtnLocator);
        await scenarioParam.page.waitFor(3000);
        await scenarioParam.page.click(botMessageEditBtn);
        await scenarioParam.page.waitFor(500);
        await scenarioParam.page.click(botMessageArea);
        await scenarioParam.page.keyboard.press('Backspace');
        element = await scenarioParam.page.$(botMessageArea);
        await element.type(params.botThirdMessage, {delay: 100});
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(1500);
        await scenarioParam.page.click(editNextConditionLocator);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextCombobox);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextComboboxItem4);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(2000);
        // переход на первое
        await scenarioParam.page.click(accordeonFirstSlide);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(newNextConditionBtnLocator);
        //await scenarioParam.page.click(newNextConditionBtnLocator);
        await scenarioParam.page.waitFor(500);
        // удаление 2 условия
        /*await scenarioParam.page.click(editNextConditionLocator2);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextConditionDeleteBtn);
        await scenarioParam.page.waitFor(1000);*/
        // условие на последнее сообщение
        await scenarioParam.page.click(editNextConditionLocator2);
        await scenarioParam.page.waitFor(1000);
        element = await scenarioParam.page.$(nextPointSlider);
        sliderBox = await element.boundingBox();
        await scenarioParam.page.mouse.move(sliderBox.x + 5, sliderBox.y+5);
        await scenarioParam.page.mouse.down();
        await scenarioParam.page.mouse.move(sliderBox.x + 10, sliderBox.y+5);
        await scenarioParam.page.mouse.up();
        await scenarioParam.page.waitFor(2000);
        await scenarioParam.page.click(nextCombobox);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(nextComboboxItem3);
        await scenarioParam.page.waitFor(1000);
        await scenarioParam.page.click(actionApplyBtn);
        await scenarioParam.page.waitFor(2000);
        // сохр
        await scenarioParam.page.click(saveBtn);
        await scenarioParam.page.waitFor(3000);
    }
}

module.exports = new UsualScenarios;
