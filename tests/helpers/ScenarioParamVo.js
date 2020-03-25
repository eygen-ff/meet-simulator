'use strict';

class ScenarioParamVo {

    /**
     * @param page {*}
     * @param scenario {*}
     * @param test {*}
     */
    constructor(page, scenario, test) {
        this.page = page;
        this.scenario = scenario;
        this.test = test;
    }

}

module.exports = new ScenarioParamVo;
