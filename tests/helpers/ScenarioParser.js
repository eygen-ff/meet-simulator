'use strict';

const UsualScenarios = require('./UsualScenarios.js');
const chalk = require('chalk');
const TestHelper = require('./TestHelper.js');

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
            const params = {
                index: i,
                scenario: scenario,
                page
            };
            await UsualScenarios[scenario.scenarios[i].method](params);
            console.debug(chalk.green('ScenarioParser.execute >> scenario [' + scenario.scenarios[i].method + '] complete'));
            if (params.scenario && params.scenario.make_screenshot) {
                await TestHelper.screenThis(page, scenario, scenario.scenarios[i].method);
            }
        }
        console.debug(chalk.green('ScenarioParser.execute >> all done'));
    }
}

module.exports = new ScenarioParser;
