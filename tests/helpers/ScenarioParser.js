'use strict';

const UsualScenarios = require('./UsualScenarios.js');
const chalk = require('chalk');
//const TestHelper = require('./TestHelper.js');
const {ScenarioParamVo} = require('./ScenarioParamVo.js');

class ScenarioParser {

    /**
     * 
     * @param {{
     *  locators: String,
     *  screenshots: {},
     *  ignoreConsoleMessages: {},
     *  scenarios: Array
     * }} scenario 
     * @param {*} page 
     */
    async execute(scenario, page) {
        for (let i in scenario.scenarios) {
            console.debug(chalk.blue('ScenarioParser.execute >> ', scenario.scenarios[i].method));
            const scenarioParamVo = new ScenarioParamVo(i, scenario, page);
            await UsualScenarios[scenario.scenarios[i].method](scenarioParamVo);
            console.debug(chalk.green('ScenarioParser.execute >> scenario [' + scenario.scenarios[i].method + '] complete'));
            /*if (params.scenario && params.scenario.make_screenshot) {
                await TestHelper.screenThis(page, scenario, scenario.scenarios[i].method);
            }*/
        }
        console.debug(chalk.green('ScenarioParser.execute >> all done'));
    }
}

module.exports = new ScenarioParser;
